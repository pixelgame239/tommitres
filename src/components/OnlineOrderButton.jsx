import "../styles/tablesStyle.css";
import { useNavigate } from "react-router-dom";

const OnlineOrderButton = () => {
    const navigate = useNavigate();
    return <div className="table" style={{background:"lightblue"}} onClick={()=>navigate("./Takeaway")}>
        <p style={{fontSize:30, color:"green", fontWeight: "bold", paddingTop: 150}}>Takeaway</p>
    </div>
}
export default OnlineOrderButton;