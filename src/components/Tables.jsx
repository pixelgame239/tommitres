import table_empty from "../assets/table_empty.png";
import './tablesStyle.css';
import table_full from "../assets/table_full.png"

const Tables = () => {
    return <a style={{cursor:"pointer"}}>
        <div className="table">
        <h2 className="table-number">1</h2>
        <img className = "table-display" src= {table_empty}></img>
        <p className="table-status">Trạng thái: Trống</p>
        <h2 className="table-number">2</h2>
        <img className = "table-display" src= {table_full}></img>
        <p className="table-status-full">Trạng thái: Đang sử dụng</p>
    </div>
    </a>
}
export default Tables;