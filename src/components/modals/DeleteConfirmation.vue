<template>
  <Modal
    :isOpen="isOpen"
    :title="title"
    @close="$emit('close')"
    @submit="$emit('submit')"
  >
    <p class="text-center text-red-500 font-semibold">
      Czy jesteś pewien, że chcesz to zrobić?
    </p>
  </Modal>
</template>

<script>
import { defineComponent } from 'vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'DeleteConfirmation',
  components: { Modal },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['close', 'submit'],
});
</script>
