import { ref, onMounted } from 'vue';
import { db } from '../firebase';
import { collection, getDocs, addDoc, doc, runTransaction, getDoc } from 'firebase/firestore';

export function useSubjects() {
  const subjects = ref([]);

  const fetchSubjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'subjects'));
      const subjectsPromises = querySnapshot.docs.map(async (docSnap) => {
        const { name, usosLink } = docSnap.data();

        // Fetch resources section
        const resourcesDoc = await getDoc(doc(db, 'subjects', docSnap.id, 'sections', 'resources'));
        const resources = resourcesDoc.exists() ? resourcesDoc.data().content : '';

        return {
          id: docSnap.id,
          name,
          usosLink,
          resources,
        };
      });

      subjects.value = await Promise.all(subjectsPromises);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const addSubject = async ({ title, usosLink }) => {
    try {
      await runTransaction(db, async (transaction) => {
        const subjectsRef = collection(db, 'subjects');
        const docRef = await addDoc(subjectsRef, {
          name: title,
          usosLink: usosLink || '',
        });

        const sectionsRef = collection(db, 'subjects', docRef.id, 'sections');

        transaction.set(doc(sectionsRef, 'topics'), {
          title: 'Tematy',
          type: 'checklist',
          items: [],
          position: 0,
          required: true,
        });

        transaction.set(doc(sectionsRef, 'resources'), {
          title: 'Zasoby',
          type: 'markdown',
          content: '',
          position: 1,
          required: true,
        });

        subjects.value.push({
          id: docRef.id,
          name: title,
          usosLink: usosLink || '',
        });
      });
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  onMounted(fetchSubjects);

  return {
    subjects,
    addSubject,
  };
}
