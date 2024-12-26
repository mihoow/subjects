<template>
  <div class="shrink-0 w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="px-6 py-4">
      <!-- Title -->
      <a
        :href="`https://usosweb.uni.lodz.pl/kontroler.php?_action=katalog2/przedmioty/pokazPrzedmiot&kod=${subject.id}`"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xl font-bold text-gray-800 mb-2 hover:underline hover:text-blue-500 transition-colors"
      >
        {{ subject.name }}
      </a>

      <!-- Classes List -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Zajęcia:</h3>
        <ul class="text-gray-600 divide-y divide-gray-600">
          <li
            v-for="classItem in subject.classes"
            :key="classItem.type"
            class="py-2"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <span class="font-medium capitalize">{{ classItem.type }}</span>
                <span>: {{ classItem.pass }}</span>
              </div>
              <div class="shrink-0 px-1.5 py-1 rounded-md" :class="classItem.deadline ? 'bg-red-200' : 'bg-purple-100'">{{ classItem.deadline ?? "Nie ustalono" }}</div>
            </div>
            <p
              v-if="classItem.note"
              class="mt-2 text-sm text-gray-500"
            >
              {{ classItem.note }}
            </p>
          </li>
        </ul>
      </div>

      <!-- Materials List -->
      <div v-if="subject.materials?.length > 0">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Materiały:</h3>
        <ul
          v-if="subject.materials.length > 0"
          class="list-disc list-inside text-gray-600"
        >
          <li
            v-for="(material, index) in subject.materials"
            :key="index"
          >
            {{ material }}
          </li>
        </ul>
        <p
          v-else
          class="text-gray-500 italic"
        >
          Brak materiałów
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubjectCard',
  props: {
    subject: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Optional: additional custom styles if needed */
</style>
