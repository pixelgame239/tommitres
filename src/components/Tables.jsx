import table_empty from "../assets/table_empty.png";
import './tablesStyle.css';
import table_full from "../assets/table_full.png"

function Tables(tableinfo) {
    return <a style={{cursor:"pointer"}} href="">
        <div className="table">
        <h2 className="table-number">{tableinfo.tableNumber}</h2>
        <img className = "table-display" src= {tableinfo.tableStatus ? table_empty : table_full}></img>
        <p>Trạng thái:</p>
        <p className={tableinfo.tableStatus?"table-status":"table-status-full"}>{tableinfo.tableStatus ? "Trống" : "Đang sử dụng"}</p>
        <button className="table-status-controller">{tableinfo.tableStatus ? "Sử dụng bàn" : "Nghiệm thu"}</button>
        <button className="table-order">Gọi món</button>
    </div>
    </a>
}
export default Tables;