import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  runTransaction,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";

import { Blog, BlogItem } from "../../store/blogs/blogs.types";
import { Dispatch, SetStateAction } from "react";

export type AdditionalInformation = {
  displayName?: string;
  imageUrl?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
  imageUrl: string;
};

export type UserForDisplay = {
  email: string;
  imageUrl: string;
  displayName: string;
};

const firebaseConfig = {
  apiKey: "AIzaSyAfiL4cp4XNb2cFa--iPXb1jm32j7Ip6fc",
  authDomain: process.env["REACT_APP_FIREBASE_AUTH_DOMAIN"],
  projectId: process.env["REACT_APP_FIREBASE_PROJECT_ID"],
  storageBucket: process.env["REACT_APP_FIREBASE_STORAGE_BUCKET"],
  messagingSenderId: process.env["REACT_APP_FIREBASE_MESSAGING_SENDER_ID"],
  appId: process.env["REACT_APP_FIREBASE_APP_ID"],
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export const auth = getAuth();
export const db = getFirestore();

export type ObjectToAdd = {
  email: string;
};

export const getBlogsAndDocuments = async (): Promise<Blog[]> => {
  const collectionRef = collection(db, "blogs");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Blog);
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionInformation,
      });
      return (await getDoc(userDocRef)) as QueryDocumentSnapshot<UserData>;
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

export enum gettingID {
  ID_POST = "ID_POST",
  ID_COMMENT = "ID_COMMENT",
}

export const getBlogsId = async (id: gettingID): Promise<number> => {
  const sfDocRef = doc(db, "blogs", "id");
  let newID = -1;
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        // eslint-disable-next-line no-throw-literal
        throw "Document does not exist!";
      }
      if (id === gettingID.ID_POST) {
        newID = sfDoc.data().currentID + 1;
        transaction.update(sfDocRef, { currentID: newID });
      }
      if (id === gettingID.ID_COMMENT) {
        newID = sfDoc.data().commentID + 1;
        transaction.update(sfDocRef, { commentID: newID });
      }
    });
    return newID;
  } catch (e) {
    console.log(e);
    return newID;
  }
};

export const setBlogs = async (
  userEmail: string,
  usersBlogs: BlogItem[]
): Promise<void> => {
  const batch = writeBatch(db);
  const usersBlogsRef = doc(db, "blogs", userEmail.toLowerCase());
  const userSnapshot = await getDoc(usersBlogsRef);
  if (userSnapshot.exists())
    batch.update(usersBlogsRef, { email: userEmail, items: usersBlogs });
  else {
    await setDoc(usersBlogsRef, { email: userEmail, items: usersBlogs });
  }
  await batch.commit();
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.email.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export enum TypeOfImage {
  postImage = "post",
  avatarImage = "avatar",
}
export const createReferenceToImageForPost = (
  file: Blob,
  userEmail: string,
  setNewImages: Dispatch<SetStateAction<string[]>>,
  newImages: string[],
  postId: string,
  indexOfImage: number | undefined
) => {
  const metadata = {
    contentType: "image/jpeg",
  };
  let imageRef: StorageReference;
  imageRef = ref(
    storage,
    `images/${userEmail}/${postId}/${newImages.length + 1}.jpg`
  );

  const uploadTask = uploadBytesResumable(imageRef, file, metadata);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log(error.code);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        if (indexOfImage) {
          setNewImages([...newImages, (newImages[indexOfImage] = downloadURL)]);
        } else setNewImages([...newImages, downloadURL]);
      });
    }
  );
};

export const createReferenceToAvatar = (
  file: Blob,
  userEmail: string,
  setNewImages: Dispatch<SetStateAction<string>>
) => {
  const metadata = {
    contentType: "image/jpeg",
  };

  let imageRef: StorageReference;
  imageRef = ref(storage, `images/${userEmail}/avatar.jpg`);

  const uploadTask = uploadBytesResumable(imageRef, file, metadata);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        setNewImages(downloadURL);
      });
    }
  );
};
