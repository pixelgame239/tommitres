import { Button } from "react-bootstrap"; // Nếu bạn đang dùng Bootstrap
import { addProduct } from "./addProduct";

const AddProductButton = () => {
  const handleAddProduct = () => {
    addProduct("Food", "siêu cay khổng lồ", "P12345", "Kim chi", 10000);
  };

  return (
    <Button variant="info" className="px-4 py-2" onClick={handleAddProduct}>
      Add product
    </Button>
  );
};

export default AddProductButton;
