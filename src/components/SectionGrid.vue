<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div
      v-for="section in sections"
      :key="section.id"
      class="bg-gray-750 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group"
    >
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4 text-blue-400">{{ section.title }}</h2>
        <component :is="getSectionComponent(section.type)" :section="section" @toggle-item="handleToggleItem" />
      </div>
      <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button @click="editSection(section)" class="p-1 bg-blue-500 text-white rounded mr-2">
          <PencilIcon class="h-5 w-5" />
        </button>
        <button @click="repositionSection(section)" class="p-1 bg-yellow-500 text-white rounded mr-2">
          <ArrowsPointingOutIcon class="h-5 w-5" />
        </button>
        <button v-if="!section.required" @click="deleteSection(section)" class="p-1 bg-red-500 text-white rounded">
          <TrashIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { PencilIcon, TrashIcon, ArrowsPointingOutIcon } from '@heroicons/vue/24/solid';
import MarkdownSection from './sections/MarkdownSection.vue';
import ChecklistSection from './sections/ChecklistSection.vue';

export default defineComponent({
  name: 'SectionGrid',
  components: {
    MarkdownSection,
    ChecklistSection,
    PencilIcon,
    TrashIcon,
    ArrowsPointingOutIcon,
  },
  props: {
    sections: {
      type: Array,
      required: true,
    },
    specialSections: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['edit', 'delete', 'reposition', 'toggle-item'],
  methods: {
    getSectionComponent(type) {
      const componentMap = {
        markdown: MarkdownSection,
        checklist: ChecklistSection,
      };
      return componentMap[type || 'markdown'] || MarkdownSection;
    },

    editSection(section) {
      this.$emit('edit', section);
    },

    deleteSection(section) {
      this.$emit('delete', section);
    },

    isSpecialSection(sectionId) {
      return this.specialSections.includes(sectionId);
    },

    handleToggleItem(payload) {
      this.$emit('toggle-item', payload);
    },

    repositionSection(section) {
      this.$emit('reposition', section);
    },
  },
});
</script>

<style scoped>
.bg-gray-750 {
  background-color: #2d3748; /* This is a custom color between gray-700 and gray-800 */
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
