import { storage, db } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const uploadImage = async (file) => {
  if (!file) return;

  try {
    // 1. Upload image to Firebase Storage
    const storageRef = ref(storage, `assets/${file.name}`);
    await uploadBytes(storageRef, file);

    // 2. Get the download URL
    const imageUrl = await getDownloadURL(storageRef);

    // 3. Save image URL to Firestore
    const docRef = await addDoc(collection(db, "images"), {
      imageUrl: imageUrl,
      uploadedAt: new Date(),
    });

    console.log("Image uploaded & saved in Firestore with ID:", docRef.id);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};
