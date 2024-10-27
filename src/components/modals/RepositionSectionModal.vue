<template>
  <Modal :isOpen="isOpen" title="Zmień pozycję sekcji" @close="closeModal" @submit="handleSubmit">
    <div class="flex flex-col space-y-4">
      <p class="text-gray-300 mb-4">
        Wybierz nową pozycję dla sekcji "{{ section?.title }}"
      </p>

      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="position in availablePositions"
          :key="position"
          @click="selectedPosition = position"
          class="bg-gray-750 rounded-lg p-4 cursor-pointer transition-all duration-200 relative"
          :class="[
            selectedPosition === position 
              ? 'border-2 border-blue-500 shadow-lg shadow-blue-500/20' 
              : 'border-2 border-gray-600 hover:border-blue-400'
          ]"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-lg font-semibold text-blue-400">
              Pozycja {{ position + 1 }}
            </span>
            <div 
              class="w-4 h-4 rounded-full"
              :class="[
                selectedPosition === position 
                  ? 'bg-blue-500' 
                  : 'bg-gray-600'
              ]"
            ></div>
          </div>
          <div class="text-sm text-gray-400">
            {{ position === props.currentPosition 
              ? 'Aktualna pozycja' 
              : `Przenieś na pozycję ${position + 1}` 
            }}
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'RepositionSectionModal',
  components: { Modal },
  props: {
    isOpen: Boolean,
    section: Object,
    totalSections: {
      type: Number,
      required: true
    },
    currentPosition: {
      type: Number,
      required: true
    },
  },

  setup(props, { emit }) {
    const selectedPosition = ref(props.currentPosition);

    const availablePositions = computed(() => {
      const positions = [];
      for (let i = 0; i < props.totalSections; i++) {
        positions.push(i);
      }
      return positions;
    });

    watch(
      () => props.currentPosition,
      (newPosition) => {
        selectedPosition.value = newPosition;
      },
      { immediate: true }
    );

    const closeModal = () => {
      emit('close');
    };

    const handleSubmit = () => {
      if (!props.section) return;
      
      emit('submit', {
        sectionId: props.section.id,
        newPosition: selectedPosition.value
      });
    };

    return {
      selectedPosition,
      availablePositions,
      closeModal,
      handleSubmit,
      props // Expose props to the template
    };
  },
});
</script>

<style scoped>
.bg-gray-750 {
  background-color: #2d3748;
}
</style>
