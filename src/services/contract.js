import { db } from './_firebase';
import { doc, increment, updateDoc, onSnapshot } from 'firebase/firestore';

export function subscribe(callback) {
  // Reference the document
  const docRef = doc(db, 'contract', '5A5mfr9t4buyqiSfwpeI');

  // Set up the real-time listener
  const unsubscribe = onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data().value); // Pass the document data to the callback
    } else {
      console.log('Document does not exist!');
    }
  });

  return unsubscribe; // Return the unsubscribe function
}

export function incrementValue(value) {
  const docRef = doc(db, 'contract', '5A5mfr9t4buyqiSfwpeI');

  return updateDoc(docRef, { value: increment(value) });
}

export function decrementValue(value) {
  const docRef = doc(db, 'contract', '5A5mfr9t4buyqiSfwpeI');

  return updateDoc(docRef, { value: increment(-value) });
}
