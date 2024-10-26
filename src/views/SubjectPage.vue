<template>
  <div class="text-white">
    <div v-if="subject">
      <h1 class="text-4xl font-bold mb-6">{{ subject.title }}</h1>

      <div class="flex justify-end mb-4">
        <button
          @click="addSection"
          class="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600 transition-colors duration-200"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add Section
        </button>
      </div>
      <div v-if="loading">Loading sections...</div>
      <SectionGrid
        v-else
        :sections="allSections"
      />

      <button
        @click="$router.push('/')"
        class="mt-8 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Back to Subjects
      </button>

      <!-- Add Section Modal -->
      <div
        v-if="showSectionModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        @click="handleOutsideSectionClick"
      >
        <div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 class="text-2xl font-bold mb-4">Add New Section</h2>
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
          <div class="flex justify-end">
            <button
              @click="cancelAddSection"
              class="mr-2 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              @click="confirmAddSection"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="loading" class="text-center">
      <p class="text-2xl">Loading subject...</p>
    </div>
    <div v-else class="text-center">
      <p class="text-2xl">Subject not found</p>
      <button
        @click="$router.push('/')"
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Back to Subjects
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { useSubjects } from '@/providers/SubjectProvider';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import SectionGrid from '@/components/SectionGrid.vue';

export default {
  name: 'SubjectPage',

  components: {
    PlusIcon,
    SectionGrid,
  },

  setup() {
    const route = useRoute();
    const { subjects } = useSubjects();
    const sections = ref([]);
    const loading = ref(true);
    const showSectionModal = ref(false);
    const newSectionTitle = ref('');
    const newSectionContent = ref('');

    const subject = computed(() => {
      return subjects.value.find((s) => s.id === route.params.subjectId);
    });

    const allSections = computed(() => {
      if (subject.value && subject.value.topics) {
        const topicsSection = {
          id: 'topics',
          title: 'Topics',
          content: subject.value.topics.map(topic => `- ${topic}`).join('\n')
        };
        return [topicsSection, ...sections.value];
      }
      return sections.value;
    });

    const fetchSections = async (subjectId) => {
      try {
        const sectionsRef = collection(db, 'subjects', subjectId, 'sections');
        const sectionsSnap = await getDocs(sectionsRef);
        const fetchedSections = sectionsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          content: doc.data().content || '',
        }));
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

    const addSection = () => {
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
          const newSection = {
            title: newSectionTitle.value.trim(),
            content: newSectionContent.value.trim(),
          };
          const docRef = await addDoc(sectionsRef, newSection);
          sections.value.push({ id: docRef.id, ...newSection });
          cancelAddSection();
        } catch (error) {
          console.error('Error adding section:', error);
        }
      }
    };

    const handleOutsideSectionClick = (event) => {
      if (event.target === event.currentTarget) {
        cancelAddSection();
      }
    };

    return {
      subject,
      allSections,
      loading,
      showSectionModal,
      newSectionTitle,
      newSectionContent,
      addSection,
      cancelAddSection,
      confirmAddSection,
      handleOutsideSectionClick,
    };
  },
};
</script>
