<template>
  <div :class="[
    transparent ? 'h-full p-6 bg-gray-800/50 lg:rounded-2xl' : 'px-4 lg:px-6 py-2 lg:py-4 bg-gray-800 lg:rounded-lg',
    scrollable && 'max-h-full overflow-y-auto custom-scrollbar',
    customClass
  ]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BoxContainer',
  props: {
    transparent: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    }
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
