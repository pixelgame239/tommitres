import React, { useState, useEffect } from "react"; // Importing useState and useEffect hooks
import { Table } from "../backend/tableData";
import Tables from "../components/Tables";
import OnlineOrderButton from "../components/OnlineOrderButton";

const TableList = () =>{
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const table = new Table();
        table.getTableData().then((data) => {
            setTableData(data);
        });
    }, []);
    return(
        <div>
            <OnlineOrderButton></OnlineOrderButton>
            {tableData.map((table, index) => (
                <Tables key={index} tableID={table.tableID} isOccupied={table.isOccupied} />
            ))}
        </div>
    )
}
export default TableList;