<template>
  <Modal
    :isOpen="isOpen"
    :title="modalTitle"
    @close="$emit('close')"
    @submit="$emit('submit', subjectData)"
  >
    <form
      @submit.prevent="$emit('submit', subjectData)"
      class="flex flex-col space-y-4"
    >
      <div>
        <label
          for="name"
          class="block text-sm font-medium text-gray-300"
          >Nazwa przedmiotu</label
        >
        <input
          v-model="subjectData.name"
          type="text"
          id="name"
          class="mt-1 block w-full p-2 bg-gray-700 text-white rounded"
          required
        />
      </div>

      <div>
        <label
          for="usosLink"
          class="block text-sm font-medium text-gray-300"
          >Link USOS (opcjonalny)</label
        >
        <input
          v-model="subjectData.usosLink"
          type="url"
          id="usosLink"
          class="mt-1 block w-full p-2 bg-gray-700 text-white rounded"
        />
      </div>
    </form>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'SubjectModal',
  components: { Modal },
  props: {
    isOpen: Boolean,
    mode: {
      type: String,
      required: true,
      validator: (value) => ['create', 'update'].includes(value),
    },
    subject: {
      type: Object,
      default: () => ({ name: '', usosLink: '' }),
    },
  },
  data() {
    return {
      subjectData: { ...this.subject },
    };
  },
  computed: {
    modalTitle() {
      return this.mode === 'create' ? 'Dodaj Przedmiot' : 'Edytuj Przedmiot';
    },
  },
  emits: ['close', 'submit'],
};
</script>
