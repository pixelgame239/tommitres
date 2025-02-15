import Header from "../components/Header"
import Tables from "../components/Tables";

const Order = () => {
    return <div>
        <Header />
        <div style={{marginTop:80}}/>
        <Tables tableNumber ={1} tableStatus={false}></Tables>
        <Tables tableNumber ={2} tableStatus={true}></Tables>
        <Tables tableNumber ={3} tableStatus={true}></Tables>
        <Tables tableNumber ={4} tableStatus={true}></Tables>
        <Tables tableNumber ={5} tableStatus={false}></Tables>
    </div>
}
export default Order;