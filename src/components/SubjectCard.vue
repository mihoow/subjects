<template>
  <div class="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700 flex flex-col h-full">
    <div class="p-6 flex-grow">
      <h2 class="text-xl font-semibold text-gray-100 mb-4">{{ title }}</h2>
      <ul class="space-y-2">
        <li
          v-for="topic in topics"
          :key="topic"
          class="flex justify-between items-center text-gray-300"
        >
          <span>{{ topic }}</span>
          <input
            type="checkbox"
            class="form-checkbox h-5 w-5 text-green-400 rounded focus:ring-green-400 focus:ring-opacity-25 bg-gray-700 border-gray-600"
          />
        </li>
      </ul>
    </div>
    <router-link
      :to="{ name: 'Subject', params: { subjectId: id }}"
      class="block w-full bg-gray-700 text-gray-300 py-2 px-4 hover:bg-gray-600 transition-colors duration-200 text-center mt-auto"
    >
      More
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SubjectCard',

  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    topics: {
      type: Array,
      required: true,
    },
  },
};
</script>

