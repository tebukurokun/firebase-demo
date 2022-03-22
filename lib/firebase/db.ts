import { User } from "firebase/auth";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getFirestore,
  addDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";

export const addUser = (user: User) => {
  const db = getFirestore();

  const userRef = collection(db, "user");

  setDoc(
    doc(userRef, user.uid),
    {
      name: user.displayName,
      email: user.email,
    },
    { merge: true }
  )
    .then(() => console.info("addUser successful"))
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const getUserByUid = async (uid: string) => {
  const db = getFirestore();

  const userRef = doc(db, "user", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    console.log("Document data: ", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
