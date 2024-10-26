<template>
  <div class="checklist">
    <ul>
      <li
        v-for="(item, index) in section.items"
        :key="index"
        class="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0"
      >
        <span class="flex-grow">{{ item.text }}</span>
        <div class="relative">
          <input
            type="checkbox"
            :id="'item-' + index"
            :checked="item.checked"
            class="sr-only peer"
            @change="toggleItem(index)"
          />
          <button
            type="button"
            :class="[
              'relative w-11 h-6 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 after:content-[\'\'] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 cursor-pointer',
              item.checked ? 'bg-blue-600 after:translate-x-full after:border-white' : 'bg-gray-600'
            ]"
            @click="toggleItem(index)"
          ></button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChecklistSection',
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleItem(index) {
      this.$emit('toggle-item', { sectionId: this.section.id, itemIndex: index });
    },
  },
});
</script>

<style scoped>
.checklist ul {
  list-style-type: none;
  padding: 0;
}

.checklist li {
  margin-bottom: 0.5rem;
}
</style>
