import { collection, addDoc, query, orderBy, getDocs, doc, where, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase.js";

export class Table{
    getTableData = async function getTableData() {
        const tableList=[];
        const queryTable = query(collection(db, "Table"), orderBy("tableID"));
        const tableData = await getDocs(queryTable);
        tableData.forEach((doc)=>{
            tableList.push({
                tableID: doc.data().tableID,
                isOccupied: doc.data().isOccupied
            })
        });
        return tableList;
    };
    changeTableData = async function changeTableData(tableID, currentStatus) {
        const queryTable = query(collection(db,"Table"), where("tableID", "==", tableID));
        const tableData = await getDocs(queryTable);
        if(!tableData.empty){
            const getCurrent = tableData.docs[0].ref;
            await updateDoc(getCurrent, {
                isOccupied: !currentStatus,
            });
        }
    }
}
