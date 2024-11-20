<template>
  <Box
    transparent
    customClass="max-h-full"
  >
    <div class="mx-auto w-[500px] max-h-full flex flex-col items-center gap-5">
      <Box customClass="w-full flex items-center justify-between">
        <h1 class="text-3xl font-bold text-center text-green-500">Przedmioty</h1>

        <button
          @click="() => openModal('create')"
          class="p-2 bg-blue-500 text-white rounded"
        >
          Dodaj przedmiot
        </button>
      </Box>

      <Box
        v-if="subjects.length > 0"
        scrollable
        customClass="w-full !p-0"
      >
        <ul class="w-full bg-gray-800 text-white rounded-lg">
          <li
            v-for="{ id, name, usosLink } in subjects"
            :key="id"
          >
            <router-link
              :to="{
                path: `/subjects/${id}`,
                state: {
                  name,
                  usosLink,
                },
              }"
              class="px-4 py-2 flex items-center justify-between hover:bg-gray-700 transition-colors"
            >
              <span>{{ name }}</span>
              <div class="flex items-center gap-2">
                <a
                  v-if="usosLink"
                  :href="usosLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click.stop="() => {}"
                  class="p-4 rounded-md hover:bg-gray-900 transition-colors"
                >
                  <LinkIcon class="h-5 w-5" />
                </a>

                <button
                  @click.stop.prevent="() => openModal('delete', id)"
                  class="p-4 rounded-md hover:bg-gray-900 transition-colors"
                >
                  <TrashIcon class="h-5 w-5 text-red-500" />
                </button>
              </div>
            </router-link>
          </li>
        </ul>
      </Box>
    </div>

    <SubjectModal
      :isOpen="openModalType === 'create'"
      mode="create"
      @close="closeModal"
      @submit="handleAddSubject"
    />

    <DeleteConfirmation
      :isOpen="!!selectedSubject && openModalType === 'delete'"
      :title="`Usunąć przedmiot: ${selectedSubject?.name}?`"
      @close="closeModal"
      @submit="handleDeleteSubject"
    />
  </Box>
</template>

<script>
import { defineComponent } from 'vue';
import Box from '@/components/Box.vue';
import SubjectModal from '@/components/modals/SubjectModal.vue';
import DeleteConfirmation from '@/components/modals/DeleteConfirmation.vue';
import { fetchSubjects, deleteSubject, addSubject } from '@/services/subjects';
import { LinkIcon, TrashIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  name: 'SubjectsPage',
  components: {
    Box,
    LinkIcon,
    TrashIcon,
    SubjectModal,
    DeleteConfirmation,
  },
  data() {
    return {
      subjects: [],
      openModalType: null,
      selectedSubjectId: null,
    };
  },
  computed: {
    selectedSubject() {
      return this.subjects.find((subject) => subject.id === this.selectedSubjectId);
    },
  },
  methods: {
    openModal(type, subjectId = null) {
      this.openModalType = type;
      this.selectedSubjectId = subjectId;
    },
    closeModal() {
      this.openModalType = null;
      this.selectedSubjectId = null;
    },
    async handleDeleteSubject() {
      try {
        await deleteSubject(this.selectedSubjectId);

        this.subjects = this.subjects.filter((subject) => subject.id !== this.selectedSubjectId);
        this.closeModal();
      } catch (error) {
        console.error('Error deleting subject', error);
      }
    },
    async handleAddSubject({ name, usosLink }) {
      try {
        const newSubject = await addSubject({ name, usosLink });

        this.subjects.push(newSubject);
        this.closeModal();
      } catch (error) {
        console.error('Error adding subject', error);
      }
    },
  },
  async mounted() {
    this.subjects = await fetchSubjects();
  },
});
</script>
