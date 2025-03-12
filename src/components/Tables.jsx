import table_empty from "../assets/table_empty.png";
import "../styles/tablesStyle.css";
import table_full from "../assets/table_full.png"
import { Table } from "../backend/tableData";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../backend/firebase";

function Tables(tabledata) {
    const navigate = useNavigate();
    const [status, setStatus]= useState();
    const [tableID, setTableID] = useState();
    const handleStatus = async () => {
        try {
            const currentTable = new Table();
            await currentTable.changeTableData(tableID, status);
            setStatus((prevStatus) => !prevStatus);
        } catch (error) {
            console.error("Error updating table status:", error);
        }
    };
    const handleOrder = async() =>{
        if(!status){
            await handleStatus();
        }
        navigate(`/tommitres/Order/Table${tabledata.tableID}`);
    }
    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "Table"), where("tableID","==", tabledata.tableID)),
    (snapshot)=>{
        const thisTable = snapshot.docs[0];
        const thistableID = thisTable.data().tableID;
        const thisStatus = thisTable.data().isOccupied;
        setStatus(thisStatus);
        setTableID(thistableID);
        return()=>unsubscribe();
    });
    }, [status]);
    return <div className="table">
        <h2 className="table-number">{tableID}</h2>
        <img className = "table-display" src= {status ? table_full : table_empty}></img>
        <p>Trạng thái:</p>
        <p className={status ?"table-status-full":"table-status"}>{status ? "Đang sử dụng" : "Trống"}</p>
        <button className="table-status-controller" onClick={handleStatus}>Đổi trạng thái</button>
        <button className="table-order" onClick={handleOrder}>Gọi món</button>
    </div>
}
export default Tables;