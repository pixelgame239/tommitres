import React, { useState, useEffect } from "react"; // Importing useState and useEffect hooks
import { Table } from "../backend/tableData";
import Tables from "../components/Tables";
import OnlineOrderButton from "../components/OnlineOrderButton";

const TableList = () =>{
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const table = new Table();
        const fetchData = async()=>{
            try{
                const data = await table.getTableData();
                setTableData(data);
                setLoading(false);
            } catch(error){
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if(loading){
        return(
            <div style={{textAlign: "center"}}>Loading....</div>
        )
    }
    if(!tableData){
        return(
            <div style={{textAlign: "center"}}>Unexpected Error!</div>
        )
    }
    return(
        <div style={{textAlign:"center"}}>
            <OnlineOrderButton></OnlineOrderButton>
            {tableData.map((table, index) => (
                <Tables key={index} tableID={table.tableID} isOccupied={table.isOccupied} />
            ))}
        </div>
    )
}
export default TableList;
