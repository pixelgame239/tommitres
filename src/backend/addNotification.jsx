import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
const addNotification = async (sender, type, message) => {
  if (!sender || !message) {
    throw new Error("Vui lòng điền đầy đủ thông tin!");
  }

  try {
    await addDoc(collection(db, "Notification"), {
      Sender: sender,
      Type: type,
      Message: message,
      CreatedAt: serverTimestamp(),
    });
    console.log("Thông báo đã được thêm vào Firestore!");
  } catch (error) {
    console.error("Lỗi khi thêm thông báo:", error);
    throw error;
  }
};

export default addNotification;
