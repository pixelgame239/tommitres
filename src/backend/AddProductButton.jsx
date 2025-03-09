import { Button } from "react-bootstrap"; // Nếu bạn đang dùng Bootstrap
import { addProduct } from "./addProduct";

const AddProductButton = () => {
  const handleAddProduct = () => {
    addProduct("Food", "Siêu ngọt", "P12345", "Trà sữa trân châu", 20000);
  };

  return (
    <Button
      variant="info"
      className="px-4 py-2"
      onClick={() => handleAddProduct()}
    >
      Add product
    </Button>
  );
};

export default AddProductButton;
