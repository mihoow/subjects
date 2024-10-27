<template>
  <Modal
    :isOpen="isOpen"
    title="Edytuj Tematy"
    @close="closeModal"
    @submit="handleSubmit"
  >
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center mb-2"
      >
        <input
          v-model="item.text"
          class="flex-grow p-2 bg-gray-700 text-white rounded mr-2"
        />
        <button
          type="button"
          @click="removeItem(index)"
          class="p-1 bg-red-500 text-white rounded"
        >
          <TrashIcon class="h-5 w-5" />
        </button>
      </li>
    </ul>
    <button
      type="button"
      @click="addItem"
      class="mt-4 p-2 bg-green-500 text-white rounded"
    >
      Add Item
    </button>
  </Modal>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import Modal from '@/components/Modal.vue';
import { TrashIcon } from '@heroicons/vue/24/solid';

export default defineComponent({
  name: 'EditChecklistSectionModal',
  components: { Modal, TrashIcon },
  props: {
    isOpen: Boolean,
    section: Object,
  },
  setup(props, { emit }) {
    const items = ref([]);

    watch(
      () => props.section,
      (newSection) => {
        if (newSection) {
          items.value = [...newSection.items];
        }
      },
      { immediate: true }
    );

    const addItem = () => {
      items.value.push({ text: '', checked: false });
    };

    const removeItem = (index) => {
      if (props.section.id === 'topics' && items.value.length <= 1) {
        alert('At least one topic is required.');
        return;
      }
      items.value.splice(index, 1);
    };

    const closeModal = () => {
      emit('close');
    };

    const handleSubmit = () => {
      emit('submit', { ...props.section, items: items.value });
    };

    return { items, addItem, removeItem, closeModal, handleSubmit };
  },
});
</script>
