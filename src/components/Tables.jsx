import table_empty from "../assets/table_empty.png";
import "../styles/tablesStyle.css";
import table_full from "../assets/table_full.png"
import { Table } from "../backend/tableData";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Tables(tabledata) {
    const navigate = useNavigate();
    const [status, setStatus]= useState(tabledata.isOccupied);
    const handleStatus = async () => {
        try {
            const currentTable = new Table();
            await currentTable.changeTableData(tabledata.tableID, tabledata.isOccupied);
            setStatus((prevStatus) => !prevStatus);
        } catch (error) {
            console.error("Error updating table status:", error);
        }
    };
    const handleOrder = async() =>{
        if(!tabledata.isOccupied){
            await handleStatus();
        }
        navigate(`/tommitres/Order/Table${tabledata.tableID}`);
    }
    useEffect(() => {
        setStatus(tabledata.isOccupied); 
    }, [tabledata.isOccupied]);
    return <div className="table">
        <h2 className="table-number">{tabledata.tableID}</h2>
        <img className = "table-display" src= {status ? table_full : table_empty}></img>
        <p>Trạng thái:</p>
        <p className={status ?"table-status-full":"table-status"}>{status ? "Đang sử dụng" : "Trống"}</p>
        {status?( <button className="table-status-controller" onClick={handleStatus}>Đổi trạng thái</button>):null}
        <button className="table-order" onClick={handleOrder}>Gọi món</button>
    </div>
}
export default Tables;