import table_empty from "../assets/table_empty.png";
import "../styles/tablesStyle.css";
import table_full from "../assets/table_full.png"
import { Table } from "../backend/tableData";

function Tables(tabledata) {
    return <div className="table">
        <h2 className="table-number">{tabledata.tableID}</h2>
        <img className = "table-display" src= {tabledata.isOccupied ? table_empty : table_full}></img>
        <p>Trạng thái:</p>
        <p className={tabledata.isOccupied?"table-status":"table-status-full"}>{tabledata.isOccupied ? "Trống" : "Đang sử dụng"}</p>
        <button className="table-status-controller" onClick={()=>{}}>{tabledata.isOccupied ? "Sử dụng bàn" : "Nghiệm thu"}</button>
        <button className="table-order">Gọi món</button>
    </div>
}
export default Tables;