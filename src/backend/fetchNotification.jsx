import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const Notifications = () => {
  const [notifications, setNotifications] = useState(new Map());

  useEffect(() => {
    const q = query(
      collection(db, "Notification"),
      orderBy("CreatedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications = new Map();
      snapshot.docs.forEach((doc) => {
        newNotifications.set(doc.id, { id: doc.id, ...doc.data() });
      });
      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {[...notifications.values()].map((notif) => (
          <li key={notif.id}>
            <strong>{notif.Type}</strong>: {notif.Message} (Receiver:{" "}
            {notif.Receiver})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
