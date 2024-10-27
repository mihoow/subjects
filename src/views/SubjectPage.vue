<template>
  <div class="text-white">
    <div v-if="subject">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-4xl font-bold">{{ subject.name }}</h1>
        <button
          @click="openModal"
          class="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600 transition-colors duration-200"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Dodaj sekcję
        </button>
      </div>

      <div v-if="loading">Ładowanie sekcji...</div>
      <SectionGrid
        v-else
        :sections="allSections"
        :specialSections="['topics', 'mainBody']"
        @edit="openEditModal"
        @delete="openDeleteModal"
        @toggle-item="handleToggleItem"
        @reposition="openRepositionModal"
      />

      <button
        @click="$router.push('/')"
        class="mt-8 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Powrót do listy przedmiotów
      </button>

      <Modal
        :isOpen="showSectionModal"
        title="Add New Section"
        submitButtonText="Add"
        @close="cancelAddSection"
        @submit="confirmAddSection"
      >
        <input
          v-model="newSectionTitle"
          type="text"
          placeholder="Enter section title"
          class="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white placeholder-gray-400"
        />
        <textarea
          v-model="newSectionContent"
          placeholder="Enter markdown content"
          rows="10"
          class="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white placeholder-gray-400"
        ></textarea>
      </Modal>

      <EditMarkdownSectionModal
        v-if="showMarkdownEditModal"
        :isOpen="showMarkdownEditModal"
        :section="currentSection"
        @close="closeEditModal"
        @submit="updateSection"
      />

      <EditChecklistSectionModal
        v-if="showChecklistEditModal"
        :isOpen="showChecklistEditModal"
        :section="currentSection"
        @close="closeEditModal"
        @submit="updateSection"
      />

      <DeleteSectionModal
        v-if="showDeleteModal"
        :isOpen="showDeleteModal"
        :section="currentSection"
        @close="closeDeleteModal"
        @submit="confirmDeleteSection"
      />

      <RepositionSectionModal
        v-if="showRepositionModal"
        :isOpen="showRepositionModal"
        :section="currentSection"
        :currentPosition="getCurrentSectionPosition"
        :totalSections="allSections.length"
        @close="closeRepositionModal"
        @submit="handleReposition"
      />
    </div>
    <div
      v-else-if="loading"
      class="text-center"
    >
      <p class="text-2xl">Ładowanie przedmiotu...</p>
    </div>
    <div
      v-else
      class="text-center"
    >
      <p class="text-2xl">Nie znaleziono przedmiotu</p>
      <button
        @click="$router.push('/')"
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Powrót do listy przedmiotów
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { useSubjects } from '@/providers/SubjectProvider';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/firebase';
import SectionGrid from '@/components/SectionGrid.vue';
import Modal from '@/components/Modal.vue';
import EditMarkdownSectionModal from '@/components/modals/EditMarkdownSectionModal.vue';
import EditChecklistSectionModal from '@/components/modals/EditChecklistSectionModal.vue';
import DeleteSectionModal from '@/components/modals/DeleteSectionModal.vue';
import RepositionSectionModal from '@/components/modals/RepositionSectionModal.vue';

export default {
  name: 'SubjectPage',

  components: {
    PlusIcon,
    SectionGrid,
    Modal,
    EditMarkdownSectionModal,
    EditChecklistSectionModal,
    DeleteSectionModal,
    RepositionSectionModal,
  },

  setup() {
    const route = useRoute();
    const { subjects } = useSubjects();
    const sections = ref([]);
    const loading = ref(true);
    const showSectionModal = ref(false);
    const newSectionTitle = ref('');
    const newSectionContent = ref('');
    const showMarkdownEditModal = ref(false);
    const showChecklistEditModal = ref(false);
    const showDeleteModal = ref(false);
    const currentSection = ref(null);
    const showRepositionModal = ref(false);

    const subject = computed(() => {
      return subjects.value.find((s) => s.id === route.params.subjectId);
    });

    const allSections = computed(() => {
      return [...sections.value].sort((a, b) => {
        // If either position is null/undefined, treat it as max value
        if (a.position === null || a.position === undefined) return 1;
        if (b.position === null || b.position === undefined) return -1;
        return a.position - b.position;
      });
    });

    const fetchSections = async (subjectId) => {
      try {
        const sectionsRef = collection(db, 'subjects', subjectId, 'sections');
        const sectionsSnap = await getDocs(sectionsRef);
        const fetchedSections = sectionsSnap.docs.map((doc) => {
          const { title, type = 'markdown', content, items, position = null } = doc.data();

          return {
            id: doc.id,
            title,
            type,
            content: type === 'markdown' ? content : undefined,
            items: type === 'checklist' ? items : undefined,
            position: position,
          };
        });

        sections.value = fetchedSections;
      } catch (error) {
        console.error('Error fetching sections:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      if (route.params.subjectId) {
        await fetchSections(route.params.subjectId);
      } else {
        loading.value = false;
      }
    });

    const openModal = () => {
      showSectionModal.value = true;
    };

    const cancelAddSection = () => {
      showSectionModal.value = false;
      newSectionTitle.value = '';
      newSectionContent.value = '';
    };

    const confirmAddSection = async () => {
      if (newSectionTitle.value.trim() && newSectionContent.value.trim() && subject.value) {
        try {
          const sectionsRef = collection(db, 'subjects', subject.value.id, 'sections');
          const newPosition = sections.value.length;
          const newSection = {
            title: newSectionTitle.value.trim(),
            type: 'markdown',
            content: newSectionContent.value.trim(),
            position: newPosition,
          };
          const docRef = await addDoc(sectionsRef, newSection);
          sections.value.push({ id: docRef.id, ...newSection });
          cancelAddSection();
        } catch (error) {
          console.error('Error adding section:', error);
        }
      }
    };

    const openEditModal = (section) => {
      currentSection.value = section;
      if (section.type === 'markdown') {
        showMarkdownEditModal.value = true;
      } else if (section.type === 'checklist') {
        showChecklistEditModal.value = true;
      }
    };

    const closeEditModal = () => {
      showMarkdownEditModal.value = false;
      showChecklistEditModal.value = false;
      currentSection.value = null;
      nextTick(() => {
        // Ensure the modal is fully closed before resetting currentSection
        currentSection.value = null;
      });
    };

    const updateSection = async (updatedSection) => {
      try {
        const sectionData = {
          title: updatedSection.title,
          type: updatedSection.type,
        };

        if (updatedSection.type === 'markdown') {
          sectionData.content = updatedSection.content;
        } else if (updatedSection.type === 'checklist') {
          sectionData.items = updatedSection.items;
        }

        await updateDoc(doc(db, 'subjects', subject.value.id, 'sections', updatedSection.id), sectionData);
        const { id: sectionId } = updatedSection;
        const index = sections.value.findIndex((s) => s.id === sectionId);
        if (index !== -1) {
          sections.value[index] = updatedSection;
        }
        closeEditModal();
      } catch (error) {
        console.error('Error updating section:', error);
      }
    };

    const openDeleteModal = (section) => {
      currentSection.value = section;
      showDeleteModal.value = true;
    };

    const closeDeleteModal = () => {
      showDeleteModal.value = false;
      currentSection.value = null;
    };

    const confirmDeleteSection = async () => {
      try {
        // Delete the section from Firestore
        await deleteDoc(doc(db, 'subjects', subject.value.id, 'sections', currentSection.value.id));
        // Update the local state
        sections.value = sections.value.filter((s) => s.id !== currentSection.value.id);
        closeDeleteModal();
      } catch (error) {
        console.error('Error deleting section:', error);
      }
    };

    const handleToggleItem = async ({ sectionId, itemIndex }) => {
      try {
        if (sectionId === 'topics') {
          const updatedTopics = [...subject.value.topics];
          updatedTopics[itemIndex].checked = !updatedTopics[itemIndex].checked;
          await updateDoc(doc(db, 'subjects', subject.value.id), {
            topics: updatedTopics,
          });
          subject.value.topics = updatedTopics;
        } else {
          const sectionRef = doc(db, 'subjects', subject.value.id, 'sections', sectionId);
          const sectionDoc = await getDoc(sectionRef);
          if (sectionDoc.exists()) {
            const sectionData = sectionDoc.data();
            const updatedItems = [...sectionData.items];
            updatedItems[itemIndex].checked = !updatedItems[itemIndex].checked;
            await updateDoc(sectionRef, { items: updatedItems });
            const index = sections.value.findIndex((s) => s.id === sectionId);
            if (index !== -1) {
              sections.value[index].items = updatedItems;
            }
          }
        }
      } catch (error) {
        console.error('Error toggling item:', error);
      }
    };

    const getCurrentSectionPosition = computed(() => {
      if (!currentSection.value) return 0;
      return currentSection.value.position;
    });

    const openRepositionModal = (section) => {
      currentSection.value = section;
      showRepositionModal.value = true;
    };

    const closeRepositionModal = () => {
      showRepositionModal.value = false;
      currentSection.value = null;
    };

    const handleReposition = async ({ sectionId, newPosition } = {}) => {
      if (!sectionId || newPosition === undefined) {
        closeRepositionModal();
        return;
      }

      try {
        const batch = writeBatch(db);
        const sectionsRef = collection(db, 'subjects', subject.value.id, 'sections');
        const currentSection = sections.value.find(s => s.id === sectionId);
        const oldPosition = currentSection.position;

        // Moving section down
        if (newPosition > oldPosition) {
          sections.value
            .filter(s => s.position > oldPosition && s.position <= newPosition)
            .forEach(section => {
              const sectionRef = doc(sectionsRef, section.id);
              batch.update(sectionRef, {
                position: section.position - 1
              });
            });
        }
        // Moving section up
        else if (newPosition < oldPosition) {
          sections.value
            .filter(s => s.position >= newPosition && s.position < oldPosition)
            .forEach(section => {
              const sectionRef = doc(sectionsRef, section.id);
              batch.update(sectionRef, {
                position: section.position + 1
              });
            });
        }

        // Update the moved section
        const movedSectionRef = doc(sectionsRef, sectionId);
        batch.update(movedSectionRef, { position: newPosition });

        await batch.commit();

        // Update local state
        await fetchSections(subject.value.id);
        closeRepositionModal();
      } catch (error) {
        console.error('Error repositioning section:', error);
      }
    };

    return {
      subject,
      allSections,
      loading,
      showSectionModal,
      newSectionTitle,
      newSectionContent,
      openModal,
      cancelAddSection,
      confirmAddSection,
      showMarkdownEditModal,
      showChecklistEditModal,
      showDeleteModal,
      currentSection,
      openEditModal,
      closeEditModal,
      updateSection,
      openDeleteModal,
      closeDeleteModal,
      confirmDeleteSection,
      handleToggleItem,
      showRepositionModal,
      openRepositionModal,
      closeRepositionModal,
      handleReposition,
      getCurrentSectionPosition,
    };
  },
};
</script>

