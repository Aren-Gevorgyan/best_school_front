import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebase = initializeApp({
  apiKey: "AIzaSyAltzRT2O4U3SCQFzK23HWdjTPW-pdaR1Y",
  authDomain: "bestschool-16484.firebaseapp.com",
  projectId: "bestschool-16484",
  storageBucket: "bestschool-16484.appspot.com",
  messagingSenderId: "295871076147",
  appId: "1:295871076147:web:8e33a5a31a11ee39b0d046",
  measurementId: "G-NJ9Z3FTD5Q",
});

const storage = getStorage(firebase);

const firebaseRequest = (file) => {
  const storageRef = ref(storage, `images/${file.name}`);

  // Create file metadata including the content type
  const metadata = {
    contentType: file.type,
  };

  // Upload the file and metadata
  const uploadTask = uploadBytes(storageRef, file, metadata);

  return uploadTask;
};

export { firebaseRequest };
