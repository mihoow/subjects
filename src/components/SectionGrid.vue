<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 h-full custom-scrollbar">
    <div
      v-for="section in sections"
      :key="section.id"
      class="bg-gray-750 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group min-h-[500px]"
    >
      <div class="p-6 h-full flex flex-col">
        <h2 class="text-2xl font-bold mb-4 text-blue-400">{{ section.title }}</h2>
        <div class="flex-1 overflow-y-auto pr-2">
          <component
            :is="getSectionComponent(section.type)"
            :section="section"
            @toggle-item="handleToggleItem"
          />
        </div>
      </div>
      <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          @click="editSection(section)"
          class="p-1 bg-blue-500 text-white rounded mr-2"
        >
          <PencilIcon class="h-5 w-5" />
        </button>
        <button
          @click="repositionSection(section)"
          class="p-1 bg-yellow-500 text-white rounded mr-2"
        >
          <ArrowsPointingOutIcon class="h-5 w-5" />
        </button>
        <button
          v-if="!section.required"
          @click="deleteSection(section)"
          class="p-1 bg-red-500 text-white rounded"
        >
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
  background-color: #2d3748;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Custom Scrollbar Styling */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.5) rgba(45, 55, 72, 0.3);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(45, 55, 72, 0.3);
  border-radius: 8px;
  margin: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(
    to bottom,
    rgba(59, 130, 246, 0.5),
    rgba(37, 99, 235, 0.6)
  );
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 
    inset 0 0 6px rgba(0, 0, 0, 0.2),
    0 0 4px rgba(59, 130, 246, 0.3);
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    to bottom,
    rgba(59, 130, 246, 0.7),
    rgba(37, 99, 235, 0.8)
  );
}

/* Add smooth scrolling to the container */
.overflow-y-auto {
  scroll-behavior: smooth;
}
</style>
