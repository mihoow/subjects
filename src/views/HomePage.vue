<template>
  <div class="text-white">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">Subjects</h1>
      <button
        class="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600 transition-colors duration-200"
        @click="openModal"
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
        :id="subject.id"
        :title="subject.name"
        :resources="subject.resources"
      />
    </div>

    <Modal
      :isOpen="showModal"
      title="Add New Subject"
      submitButtonText="Add"
      @close="closeModal"
      @submit="confirmAddSubject"
    >
      <input
        v-model="newSubjectName"
        type="text"
        placeholder="Enter subject name"
        class="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white placeholder-gray-400"
      />
      <input
        v-model="newUsosLink"
        type="text"
        placeholder="Enter USOS link (optional)"
        class="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white placeholder-gray-400"
      />
    </Modal>
  </div>
</template>

<script>
import { ref } from 'vue'
import SubjectCard from '@/components/SubjectCard.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { useSubjects } from '@/providers/SubjectProvider'
import Modal from '@/components/Modal.vue'

export default {
  name: 'HomePage',

  components: {
    SubjectCard,
    PlusIcon,
    Modal,
  },

  setup() {
    const { subjects, addSubject } = useSubjects()
    const showModal = ref(false)
    const newSubjectName = ref('')
    const newUsosLink = ref('')

    const openModal = () => {
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
      newSubjectName.value = ''
      newUsosLink.value = ''
    }

    const confirmAddSubject = async () => {
      if (newSubjectName.value.trim()) {
        const newSubject = {
          title: newSubjectName.value.trim(),
          usosLink: newUsosLink.value.trim(),
        }
        await addSubject(newSubject)
        closeModal()
      }
    }

    return {
      subjects,
      showModal,
      newSubjectName,
      newUsosLink,
      openModal,
      closeModal,
      confirmAddSubject,
    }
  }
}
</script>

