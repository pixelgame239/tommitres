import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
const addNotification = async (sender, receiver, type, message, data) => {
  if (!sender || !message) {
    throw new Error("Vui lòng điền đầy đủ thông tin!");
  }

  try {
    await addDoc(collection(db, "Notification"), {
      Sender: sender,
      Receiver: receiver,
      Type: type,
      Message: message,
      CreatedAt: serverTimestamp(),
      data: data
    });
    console.log("Thông báo đã được thêm vào Firestore!");
  } catch (error) {
    console.error("Lỗi khi thêm thông báo:", error);
    throw error;
  }
};

export default addNotification;
