<template>
  <div
    class="bg-gray-750 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group min-h-[500px]"
  >
    <div class="p-6 h-full flex flex-col">
      <h3 class="text-2xl font-bold mb-4 text-blue-400">{{ title }}</h3>
      <div class="flex-1 overflow-y-auto pr-2">
        <MarkdownView :content="content" />
      </div>
    </div>

    <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        @click="$emit('edit', id)"
        class="p-1 bg-blue-500 text-white rounded mr-2"
      >
        <PencilIcon class="h-5 w-5" />
      </button>
      <button
        @click="$emit('reposition', id)"
        class="p-1 bg-yellow-500 text-white rounded mr-2"
      >
        <ArrowsPointingOutIcon class="h-5 w-5" />
      </button>
      <button
        @click="$emit('delete', id)"
        class="p-1 bg-red-500 text-white rounded"
      >
        <TrashIcon class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { PencilIcon, TrashIcon, ArrowsPointingOutIcon } from '@heroicons/vue/24/solid';
import MarkdownView from './MarkdownView.vue';

export default defineComponent({
  name: 'SectionCard',
  components: {
    MarkdownView,
    PencilIcon,
    TrashIcon,
    ArrowsPointingOutIcon,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  emits: ['edit', 'delete', 'reposition'],
  mounted() {
    console.log('>>', this.content);
  },
});
</script>

<style scoped></style>
