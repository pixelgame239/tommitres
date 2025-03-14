import { db } from "./firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
export class Product{
    constructor(productID, productName, quantity, unitPrice, description, category) {
        this.productID = productID;
        this.productName = productName;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.description = description;
        this.category = category;
      }
    updateQuantity(newQuantity){
        this.quantity = newQuantity;
    }
    getProduct(products){
        let listProducts =[];
        products.forEach(product=> {
            const tempProduct = new Product();
            tempProduct.productID=product.productID;
            tempProduct.productName = product.productName;
            tempProduct.quantity = product.quantity;
            tempProduct.unitPrice = product.unitPrice;
            tempProduct.description=product.description;
            tempProduct.category = product.category;
            listProducts.push(tempProduct);
        });
        return listProducts;
    }
}
export async function modifiedProduct(productID, orderQuantity){
    const productQuery = query(
        collection(db, "Product"), 
        where("productID", "==", productID)
      );
      const productSnapshot = await getDocs(productQuery);
      if (!productSnapshot.empty) {
        const productDoc = productSnapshot.docs[0];
        const productRef = doc(db, "Product", productDoc.id); 
        const currentProductData = productDoc.data();
        const currentQuantity = currentProductData.quantity;
        const updateQuantity = currentQuantity + orderQuantity;
        try {
          await updateDoc(productRef, {
            quantity: updateQuantity
          });
        } catch (error) {
          console.log(`Error updating product ${productID}:`, error);
        }
      } else {
        console.log(`No product found for productID: ${productID}`);
      }
}