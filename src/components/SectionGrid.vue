<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div
      v-for="section in sections"
      :key="section.id"
      class="bg-gray-750 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4 text-blue-400">{{ section.title }}</h2>
        <div class="prose prose-invert max-w-none">
          <Markdown
            :source="section.content"
            :plugins="plugins"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Markdown from 'vue3-markdown-it';
import Sub from 'markdown-it-sub';
import Sup from 'markdown-it-sup';
import Footnote from 'markdown-it-footnote';
import Deflist from 'markdown-it-deflist';
import Abbr from 'markdown-it-abbr';
import Ins from 'markdown-it-ins';
import Mark from 'markdown-it-mark';
import Anchor from 'markdown-it-anchor';
import Toc from 'markdown-it-toc-done-right';
import Tasklists from 'markdown-it-task-lists';
import Katex from 'markdown-it-katex';
import Highlightjs from 'markdown-it-highlightjs';

export default defineComponent({
  name: 'SectionGrid',
  components: {
    Markdown,
  },
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      plugins: [
        { plugin: Sub },
        { plugin: Sup },
        { plugin: Footnote },
        { plugin: Deflist },
        { plugin: Abbr },
        { plugin: Ins },
        { plugin: Mark },
        { plugin: Anchor },
        { plugin: Toc },
        { plugin: Tasklists },
        { plugin: Katex },
        { plugin: Highlightjs, options: { inline: true } },
      ],
    };
  },
});
</script>

<style scoped>
.bg-gray-750 {
  background-color: #2d3748; /* This is a custom color between gray-700 and gray-800 */
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
