import { collection, addDoc, query, orderBy, getDocs, doc, where, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase.js";

export class Order {
    constructor(orderID, timeCreated, timeFinished, userName, tableNumber, paymentMethod, totalPrice) {
      this.orderID = orderID;
      this.timeCreated = timeCreated;
      this.timeFinished = timeFinished;
      this.userName = userName;
      this.tableNumber = tableNumber;
      this.paymentMethod = paymentMethod;
      this.totalPrice = totalPrice;
      this.products = []; 
    }

      async getOrderID() {
        try {
            const queryOrderID = query(collection(db, "Count"));
            const IDsnapshot = await getDocs(queryOrderID);
            const IDdata = IDsnapshot.docs[0];
            const currentCount = IDdata.data().countNumber; 
            this.orderID = currentCount;
            const docRef = doc(db, "Count", IDdata.id); 
            await updateDoc(docRef, { countNumber: currentCount + 1 });
            console.log("Order ID:", this.orderID, "Count number updated successfully.");
        } catch (error) {
            console.error("Error getting or updating document:", error);
        }
    }
    addProduct(productID, orderQuantity, unitPrice) {
      const existingProduct = this.products.find(product=>product.productID===productID);
      if(existingProduct){
        existingProduct.orderQuantity = orderQuantity;
        existingProduct.singleProductPrice = orderQuantity*unitPrice;
        if(existingProduct.orderQuantity===0){
          this.products = this.products.filter(product=>product.productID!=productID);
        }
      }
      else{
        console.log(orderQuantity);
        const singleProductPrice = orderQuantity * unitPrice;
        this.products.push({ productID, orderQuantity, unitPrice, singleProductPrice });
      }
    }
    calculateTotalPrice() {
      this.totalPrice = this.products.reduce((acc, product) => acc + product.singleProductPrice, 0);
    }
  }