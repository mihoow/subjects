<template>
  <div>
    <router-link
      v-if="variant === 'internal'"
      :to="to"
      :class="[
        'flex items-center space-x-2 p-4',
        'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white rounded-lg shadow-lg',
        'hover:scale-105 transform transition-transform duration-300',
        customClass,
      ]"
      exact-active-class="bg-blue-800"
    >
      <component
        v-if="icon"
        :is="icon"
        class="w-6 h-6"
      />

      <span
        v-if="label"
        class="text-sm font-semibold"
      >{{ label }}</span>
    </router-link>

    <a
      v-else
      :href="to"
      target="_blank"
      rel="noopener noreferrer"
      :class="[
        'flex items-center space-x-2 p-4 relative group',
        'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 text-white rounded-lg shadow-lg',
        'hover:scale-105 transform transition-transform duration-300',
        customClass,
      ]"
    >
      <component
        v-if="icon"
        :is="icon"
        class="size-8"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'MyLink',
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    icon: {
      type: [Object, Function],
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      required: true,
      validator: (value) => ['internal', 'external'].includes(value),
    },
    customClass: {
      type: String,
      default: '',
    }
  },
};
</script>

<style scoped>
</style>
