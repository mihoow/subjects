<template>
  <Modal :isOpen="isOpen" title="Usuń sekcję" @close="closeModal" @submit="handleSubmit">
    <p>Czy na pewno chcesz usunąć sekcję "{{ section?.title }}"?</p>
  </Modal>
</template>

<script>
import { defineComponent } from 'vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'DeleteSectionModal',
  components: { Modal },
  props: {
    isOpen: Boolean,
    section: Object,
  },
  setup(_, { emit }) {
    const closeModal = () => {
      emit('close');
    };

    const handleSubmit = () => {
      emit('submit');
    };

    return { closeModal, handleSubmit };
  },
});
</script>
