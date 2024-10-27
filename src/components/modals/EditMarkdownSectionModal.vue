<template>
  <Modal
    :isOpen="isOpen"
    :title="modalTitle"
    isBig
    @close="closeModal"
    @submit="handleSubmit"
  >
    <div class="h-full flex flex-1 space-x-4">
      <div class="h-full w-1/2">
        <textarea
          v-model="editedContent"
          class="w-full h-full p-2 bg-gray-700 text-white rounded"
          placeholder="Miejsce na markdown..."
        ></textarea>
      </div>
      <Markdown
        :source="editedContent"
        :plugins="plugins"
        class="h-full w-1/2 prose prose-invert max-w-none markdown-preview"
      />
    </div>
  </Modal>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import Modal from '@/components/Modal.vue';
import Markdown from 'vue3-markdown-it';
import { markdownPlugins } from '@/utils/markdownPlugins';

export default defineComponent({
  name: 'EditMarkdownSectionModal',
  components: { Modal, Markdown },
  props: {
    isOpen: Boolean,
    section: Object,
  },
  setup(props, { emit }) {
    const editedContent = ref('');
    const plugins = markdownPlugins;

    const modalTitle = computed(() => {
      return props.section?.id === 'resources' ? 'Edytuj Zasoby' : 'Edytuj Sekcję';
    });

    watch(
      () => props.section,
      (newSection) => {
        if (newSection) {
          editedContent.value = newSection.content;
        }
      },
      { immediate: true }
    );

    const closeModal = () => {
      emit('close');
    };

    const handleSubmit = () => {
      const updatedSection = {
        id: props.section.id,
        type: 'markdown',
        title: props.section.title,
        content: editedContent.value
      };
      emit('submit', updatedSection);
    };

    return { editedContent, plugins, closeModal, handleSubmit, modalTitle };
  },
});
</script>

<style>
.markdown-preview.prose > :first-child {
  margin-top: 0;
}
</style>
