<template>
  <div class="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700 flex flex-col relative group">
    <div class="p-6 flex-grow overflow-hidden">
      <h2 class="text-xl font-semibold text-gray-100 mb-4">{{ title }}</h2>

      <div class="prose prose-invert prose-sm max-h-48 overflow-y-auto custom-scrollbar mb-4">
        <Markdown
          :source="resources"
          :plugins="plugins"
        />
      </div>
    </div>

    <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        @click="editSubject"
        class="p-1 bg-blue-500 text-white rounded mr-2"
      >
        <PencilIcon class="h-5 w-5" />
      </button>
      <button
        @click="repositionSubject"
        class="p-1 bg-yellow-500 text-white rounded mr-2"
      >
        <ArrowsPointingOutIcon class="h-5 w-5" />
      </button>
      <button
        @click="deleteSubject"
        class="p-1 bg-red-500 text-white rounded"
      >
        <TrashIcon class="h-5 w-5" />
      </button>
    </div>

    <router-link
      :to="{ name: 'Subject', params: { subjectId: id } }"
      class="block w-full bg-gray-700 text-gray-300 py-2 px-4 hover:bg-gray-600 transition-colors duration-200 text-center mt-auto"
    >
      More
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Markdown from 'vue3-markdown-it';
import { markdownPlugins } from '@/utils/markdownPlugins';
import { PencilIcon, TrashIcon, ArrowsPointingOutIcon } from '@heroicons/vue/24/solid';

export default defineComponent({
  name: 'SubjectCard',
  components: {
    Markdown,
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
    resources: {
      type: String,
      default: '',
    },
  },

  setup(props, { emit }) {
    const plugins = markdownPlugins;

    const editSubject = () => {
      emit('edit', props.id);
    };

    const repositionSubject = () => {
      emit('reposition', props.id);
    };

    const deleteSubject = () => {
      emit('delete', props.id);
    };

    return {
      plugins,
      editSubject,
      repositionSubject,
      deleteSubject,
    };
  },
});
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.5) rgba(45, 55, 72, 0.3);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(45, 55, 72, 0.3);
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, rgba(59, 130, 246, 0.5), rgba(37, 99, 235, 0.6));
  border-radius: 8px;
}

</style>
