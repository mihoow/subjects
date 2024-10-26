<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="handleOutsideClick"
  >
    <div :class="[
      'bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col',
      isBig ? 'w-[70vw] h-[70vh]' : 'w-full max-w-2xl'
    ]">
      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
      <form @submit.prevent="handleSubmit" class="flex flex-col flex-1">
        <div :class="[isBig ? 'overflow-y-auto flex-1' : '']">
          <slot></slot>
        </div>
        <div class="flex justify-end mt-4">
          <button
            @click="closeModal"
            type="button"
            class="mr-2 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors duration-200"
          >
            Anuluj
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
          >
            {{ submitButtonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    submitButtonText: {
      type: String,
      default: 'Zatwierdź',
    },
    isBig: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'submit'],
  methods: {
    handleOutsideClick(event) {
      if (event.target === event.currentTarget) {
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit('close');
    },
    handleSubmit() {
      this.$emit('submit');
    },
  },
});
</script>
