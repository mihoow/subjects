import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'

export function useSubjects() {
  const subjects = ref([])

  const fetchSubjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'subjects'))
      subjects.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error fetching subjects:', error)
    }
  }

  const addSubject = async (newSubject) => {
    try {
      const docRef = await addDoc(collection(db, 'subjects'), newSubject)
      subjects.value.push({
        id: docRef.id,
        ...newSubject
      })
    } catch (error) {
      console.error('Error adding subject:', error)
    }
  }

  onMounted(fetchSubjects)

  return {
    subjects,
    addSubject
  }
}
