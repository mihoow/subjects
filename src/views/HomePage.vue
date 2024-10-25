<template>
  <div class="text-white">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">Subjects</h1>
      <button
        class="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600 transition-colors duration-200"
        @click="handleAddSubject"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        <span class="mr-2">|</span>
        <span>Add Subject</span>
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <SubjectCard
        v-for="subject in subjects"
        :key="subject.id"
        :title="subject.title"
        :topics="subject.topics"
      />
    </div>

    <!-- Add Subject Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      @click="handleOutsideClick"
    >
      <div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Add New Subject</h2>
        <input
          v-model="newSubjectName"
          type="text"
          placeholder="Enter subject name"
          class="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white placeholder-gray-400"
        />
        <div class="flex justify-end">
          <button
            @click="cancelAddSubject"
            class="mr-2 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            @click="confirmAddSubject"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SubjectCard from '@/components/SubjectCard.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { useSubjects } from '@/providers/SubjectProvider'

export default {
  name: 'HomePage',

  components: {
    SubjectCard,
    PlusIcon,
  },

  setup() {
    const { subjects, addSubject } = useSubjects()
    const showModal = ref(false)
    const newSubjectName = ref('')

    const handleAddSubject = () => {
      showModal.value = true
    }

    const cancelAddSubject = () => {
      showModal.value = false
      newSubjectName.value = ''
    }

    const confirmAddSubject = async () => {
      if (newSubjectName.value.trim()) {
        const newSubject = {
          title: newSubjectName.value.trim(),
          topics: [],
        }
        await addSubject(newSubject)
        cancelAddSubject()
      }
    }

    const handleOutsideClick = (event) => {
      if (event.target === event.currentTarget) {
        cancelAddSubject()
      }
    }

    return {
      subjects,
      handleAddSubject,
      showModal,
      newSubjectName,
      cancelAddSubject,
      confirmAddSubject,
      handleOutsideClick,
    }
  }
}
</script>
