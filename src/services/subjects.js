import { db } from './_firebase';
import {
  collection,
  getDoc,
  getDocs,
  query,
  orderBy,
  runTransaction,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';

/*
*****************************
SUBJECTS
*****************************
*/

export async function fetchSubjects() {
  const subjectsQuery = query(collection(db, 'subjects'), orderBy('name'));

  const querySnapshot = await getDocs(subjectsQuery);

  return querySnapshot.docs.map((doc) => {
    const { name, usosLink } = doc.data();

    return {
      id: doc.id,
      name,
      usosLink,
    };
  });
}

export async function fetchSubject(subjectId) {
  const subjectRef = doc(db, 'subjects', subjectId);
  const subjectSnap = await getDoc(subjectRef);

  return subjectSnap.data();
}

export async function addSubject({ name, usosLink = '' }) {
  const newSubject = await runTransaction(db, async (transaction) => {
    const subjectsRef = collection(db, 'subjects');

    const docRef = await addDoc(subjectsRef, {
      name,
      usosLink,
    });

    const sectionsRef = collection(db, 'subjects', docRef.id, 'sections');

    const topicsRef = doc(sectionsRef);
    const resourcesRef = doc(sectionsRef);

    transaction.set(topicsRef, {
      title: 'Tematy',
      content: '',
      prevSectionId: null,
      nextSectionId: resourcesRef.id,
    });

    transaction.set(resourcesRef, {
      title: 'Materiały',
      content: '',
      prevSectionId: topicsRef.id,
      nextSectionId: null,
    });

    return {
      id: docRef.id,
      name,
      usosLink,
    };
  });

  return newSubject;
}

export async function deleteSubject(subjectId) {
  await deleteDoc(doc(db, 'subjects', subjectId));
}

export async function updateSubject({ subject: { id: subjectId, ...subjectBody }, updates }) {
  await updateDoc(doc(db, 'subjects', subjectId), { ...subjectBody, ...updates });
}

/*
*****************************
SECTIONS
*****************************
*/

export async function fetchSections(subjectId) {
  const sectionsRef = collection(db, 'subjects', subjectId, 'sections');
  const sectionsSnap = await getDocs(sectionsRef);

  return sectionsSnap.docs.map((doc) => {
    const { title, content, prevSectionId = null, nextSectionId = null } = doc.data();

    return {
      id: doc.id,
      title,
      content,
      prevSectionId,
      nextSectionId,
    };
  });
}

export async function addSection({ subjectId, title, content, prevSectionId = null }) {
  if (!subjectId || !title || !content) {
    throw new Error('Subject id, title, and content are required');
  }

  const sectionsRef = collection(db, 'subjects', subjectId, 'sections');

  const newSection = {
    title,
    content,
    prevSectionId,
    nextSectionId: null,
  };

  const docRef = await addDoc(sectionsRef, newSection);

  return {
    id: docRef.id,
    ...newSection,
  };
}

export async function deleteSection({ subjectId, sectionId }) {
  await deleteDoc(doc(db, 'subjects', subjectId, 'sections', sectionId));
}

export async function updateSection({ subjectId, section: { id: sectionId, ...sectionBody }, updates }) {
  await updateDoc(doc(db, 'subjects', subjectId, 'sections', sectionId), { ...sectionBody, ...updates });
}

export async function repositionSections({ subjectId, sections, movingSectionId, targetSectionId }) {
  if (!movingSectionId || !targetSectionId) {
    throw new Error('Section id and target section id are required');
  }

  const movingSection = sections.find(({ id }) => id === movingSectionId);
  const targetSection = sections.find(({ id }) => id === targetSectionId);

  if (!movingSection || !targetSection) {
    throw new Error('Section not found');
  }

  const { id: sectionId, prevSectionId, nextSectionId } = movingSection;

  const batch = writeBatch(db);
  const sectionsRef = collection(db, 'subjects', subjectId, 'sections');

  // Detach moving section from its current position
  if (prevSectionId) {
    const prevSectionRef = doc(sectionsRef, prevSectionId);

    batch.update(prevSectionRef, { nextSectionId });
  }

  if (nextSectionId) {
    const nextSectionRef = doc(sectionsRef, nextSectionId);

    batch.update(nextSectionRef, { prevSectionId });
  }

  // Insert moving section into new position
  const { prevSectionId: targetPrevSectionId } = targetSection;

  const targetSectionRef = doc(sectionsRef, targetSectionId);

  batch.update(targetSectionRef, { prevSectionId: sectionId });

  if (targetPrevSectionId) {
    const targetPrevSectionRef = doc(sectionsRef, targetPrevSectionId);

    batch.update(targetPrevSectionRef, { nextSectionId: sectionId });
  }

  const movedSectionRef = doc(sectionsRef, sectionId);

  batch.update(movedSectionRef, {
    prevSectionId: targetPrevSectionId,
    nextSectionId: targetSectionId,
  });

  await batch.commit();

  return sections.map((section) => {
    if (section.id === movingSectionId) {
      return {
        ...section,
        prevSectionId: targetPrevSectionId,
        nextSectionId: targetSectionId,
      };
    }

    if (section.id === prevSectionId) {
      return {
        ...section,
        nextSectionId,
      };
    }

    if (section.id === nextSectionId) {
      return {
        ...section,
        prevSectionId,
      };
    }

    if (section.id === targetSectionId) {
      return {
        ...section,
        prevSectionId: sectionId,
      };
    }

    if (section.id === targetPrevSectionId) {
      return {
        ...section,
        nextSectionId: sectionId,
      };
    }

    return section;
  });
}
