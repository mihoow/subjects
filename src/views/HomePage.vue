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
          @moreClick="handleMoreClick"
        />
      </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import SubjectCard from '@/components/SubjectCard.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'

export default {
  name: 'HomePage',

  components: {
    SubjectCard,
    PlusIcon,
  },

  setup() {
    const subjects = ref([
      { id: 1, title: 'Mathematics', topics: ['Algebra', 'Geometry', 'Calculus'] },
      { id: 2, title: 'Science', topics: ['Physics', 'Chemistry', 'Biology'] },
      { id: 3, title: 'Literature', topics: ['Poetry', 'Prose', 'Drama', 'Literary Analysis'] },
      { id: 4, title: 'History', topics: ['Ancient Civilizations', 'World Wars', 'Modern History'] },
      { id: 5, title: 'Computer Science', topics: ['Programming', 'Algorithms', 'Data Structures', 'Web Development', 'Artificial Intelligence'] },
      { id: 6, title: 'Art', topics: ['Painting', 'Sculpture'] },
      { id: 7, title: 'Music', topics: ['Theory', 'Composition', 'Instruments', 'Music History'] },
      { id: 8, title: 'Physical Education', topics: ['Team Sports', 'Individual Sports', 'Fitness', 'Nutrition', 'Health'] },
      { id: 9, title: 'Languages', topics: ['Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Italian'] },
      { id: 10, title: 'Economics', topics: ['Microeconomics', 'Macroeconomics', 'International Trade'] },
    ])

    const handleAddSubject = () => {
      console.log('Add subject clicked')
      // Implement the logic to add a new subject
    }

    const handleMoreClick = (subjectTitle) => {
      console.log(`More clicked for ${subjectTitle}`)
      // Implement the logic for handling the "More" button click
    }

    return {
      subjects,
      handleAddSubject,
      handleMoreClick,
    }
  }
}
</script>

