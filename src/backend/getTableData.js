import { collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";

export async  function getDatatest(){
    for(let i = 2; i<=10; i++){
        const docRef = await addDoc(collection(db,"Table"),{
            tableID:  i,
            isOccupied: false
        });
    }
    console.log("Completed");
}