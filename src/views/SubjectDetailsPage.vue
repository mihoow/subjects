<template>
  <Box customClass="w-full h-full flex flex-col">
    <header class="relative w-full px-4 py-2 flex items-center justify-between border-b border-gray-200">
      <div class="flex items-center space-x-4">
        <button type="button">
          <PencilIcon class="h-5 w-5" />
        </button>
        <h1 class="text-3xl font-bold text-center text-green-500">{{ name || 'Nieznana nazwa' }}</h1>
      </div>
      <button
        class="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600 transition-colors duration-200"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Dodaj sekcję
      </button>
    </header>

    <Box
      v-if="sections.length > 0"
      scrollable
      customClass="flex-grow w-full grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <SectionCard
        v-for="{ id, title, content } in sections"
        :key="id"
        :id="id"
        :title="title"
        :content="content"
      />
    </Box>
  </Box>
</template>

<script>
import Box from '@/components/Box.vue';
import { PlusIcon, PencilIcon } from '@heroicons/vue/24/outline';
import SectionCard from '@/components/SectionCard.vue';
import { fetchSubject, fetchSections } from '@/services/subjects';

export default {
  name: 'SubjectDetailsPage',
  components: {
    Box,
    PlusIcon,
    PencilIcon,
    SectionCard,
  },
  data() {
    return {
      name: history.state.name || '',
      usosLink: history.state.usosLink || '',
      sections: [],
      modalType: null,
      selectedSection: null,
    };
  },
  methods: {
    openModal(type, sectionId) {
      this.modalType = type;
      this.selectedSection = this.sections.find((section) => section.id === sectionId);
    },
    closeModal() {
      this.modalType = null;
      this.selectedSection = null;
    },
  },
  async mounted() {
    const { subjectId } = this.$route.params;

    const promises = [
      fetchSections(subjectId),
    ]

    if (!this.name) {
      promises.push(fetchSubject(subjectId));
    }

    const [sections, subject] = await Promise.all(promises);

    console.log('>>', sections)

    this.sections = sections;

    if (subject) {
      this.name = subject.name;
      this.usosLink = subject.usosLink;
    }
  },
};
</script>

<style scoped></style>
