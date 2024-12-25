<template>
  <Box class="flex flex-col lg:flex-row max-h-full">
    <div class="hidden lg:block lg:w-3/4 bg-white rounded-lg">
      <div class="w-full max-h-full overflow-y-auto p-4">
        <Markdown
          :source="formattedContract"
          class="w-full bg-white rounded-lg prose !max-w-none"
        />
      </div>
    </div>

    <div class="grow-1 max-h-full lg:w-1/4 text-white rounded-r-lg">
      <div class="p-4 bg-blue-600/50 rounded-tr-lg">
        <h2 class="text-lg font-bold">Na nowy komputer</h2>

        <div class="flex items-center gap-2">
          <span class="shrink-0">{{ currentValue }} / 3750 zł</span>

          <div class="w-full bg-gray-200 rounded-full h-2.5 ml-2">
            <div
              class="bg-blue-600 h-2.5 rounded-full"
              :style="{ width: progressBarWidth }"
            ></div>
          </div>
        </div>
      </div>

      <div class="max-h-[calc(100vh-102px-84px-72px)] lg:max-h-[634px] p-2 lg:p-4 overflow-y-auto bg-blue-500/50">
        <div
          v-for="category in categorizedTasks"
          :key="category.name"
        >
          <h3 class="mb-2 font-semibold">{{ category.name }}</h3>

          <ul>
            <li
              v-for="task in category.tasks"
              :key="task.id"
              class="flex items-center mb-2 cursor-pointer transition-colors lg:hover:bg-green-900 p-2 rounded"
              :class="{ 'bg-green-700': task.completed }"
              @click="toggleTask(task)"
            >
              <input
                type="checkbox"
                v-model="task.completed"
                @change="updateValue(task)"
                class="mr-2"
              />
              <span>{{ task.task }} ({{ task.value }} zł)</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="p-4 bg-blue-600/50 rounded-br-lg flex items-center justify-end">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="resetTasks"
        >
          Następny dzień
        </button>
      </div>
    </div>
  </Box>
</template>

<script>
import contractMarkdown from '@/assets/contract.md';
import tasksData from '@/assets/tasks.json';
import Markdown from 'vue3-markdown-it';
import Box from '@/components/Box.vue';
import { subscribe, incrementValue, decrementValue } from '@/services/contract';

let unsubscribe;

export default {
  components: {
    Markdown,
    Box,
  },

  data() {
    const savedTasks =
      JSON.parse(localStorage.getItem('tasks')) || tasksData.map((task) => ({ ...task, completed: false }));

    return {
      tasks: savedTasks,
      currentValue: 0,
      formattedContract: contractMarkdown,
    };
  },

  computed: {
    progressBarWidth() {
      return `${(this.currentValue / 3750) * 100}%`;
    },

    categorizedTasks() {
      const categories = [...new Set(this.tasks.map(({ category }) => category))];

      return categories.map((category) => ({
        name: category,
        tasks: this.tasks.filter((task) => task.category === category),
      }));
    },
  },

  methods: {
    async updateValue({ value, completed }) {
      this.currentValue += completed ? value : -value;

      if (completed) {
        await incrementValue(value);
      } else {
        await decrementValue(value);
      }

      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    toggleTask(task) {
      task.completed = !task.completed;

      this.updateValue(task);
    },

    resetTasks() {
      this.tasks.forEach((task) => {
        task.completed = false;
      });

      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
  },
  mounted() {
    unsubscribe = subscribe((value) => {
      this.currentValue = value;
    });
  },
  unmounted() {
    unsubscribe?.();
    unsubscribe = null;
  }
};
</script>

<style scoped></style>
