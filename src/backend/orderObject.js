import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  doc,
  where,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase.js";

export class Order {
  constructor(
    orderID,
    status,
    buyDate,
    userName,
    tableNumber,
    paymentMethod,
    totalPrice
  ) {
    this.orderID = orderID;
    this.status = status;
    this.buyDate = buyDate;
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
      console.log(
        "Order ID:",
        this.orderID,
        "Count number updated successfully."
      );
    } catch (error) {
      console.error("Error getting or updating document:", error);
    }
  }
  addProduct(productID, productName, orderQuantity, unitPrice, imageLink) {
    const existingProduct = this.products.find(
      (product) => product.productID === productID
    );
    if (existingProduct) {
      existingProduct.orderQuantity = orderQuantity;
      existingProduct.singleProductPrice = orderQuantity * unitPrice;
      if (existingProduct.orderQuantity === 0) {
        this.products = this.products.filter(
          (product) => product.productID != productID
        );
      }
    } else {
      console.log(orderQuantity);
      const singleProductPrice = orderQuantity * unitPrice;
      this.products.push({
        productID,
        productName,
        orderQuantity,
        unitPrice,
        singleProductPrice,
        imageLink,
      });
    }
  }
  calculateTotalPrice() {
    this.totalPrice = this.products.reduce(
      (acc, product) => acc + product.singleProductPrice,
      0
    );
  }
}

export async function changeStatusToSuccess(orderID, userType) {
  const queryOrderID = query(
    collection(db, "Order"),
    where("orderID", "==", Number(orderID))
  );
  const IDsnapshot = await getDocs(queryOrderID);

  if (IDsnapshot.empty) {
    console.log("❌ Không tìm thấy đơn hàng với orderID đã cho.");
    return;
  }

  const IDdata = IDsnapshot.docs[0];
  const dataRef = doc(db, "Order", IDdata.id);
  const currentStatus = IDdata.data().status;

  if (currentStatus !== "Sẵn sàng giao") {
    console.log(
      "⚠️ Đơn hàng không ở trạng thái 'Sẵn sàng giao', không thể cập nhật."
    );
    return;
  }

  try {
    await updateDoc(dataRef, {
      status: "Hoàn thành",
      userName: userType,
      completedDate: Timestamp.now().toDate(), // Lưu thời gian hoàn thành đơn hàng
    });

    console.log(`✅ Đơn hàng ${orderID} đã cập nhật thành 'Hoàn thành'`);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật trạng thái đơn hàng:", error);
  }
}

// ✅ Hàm cập nhật trạng thái đơn hàng thành "Sẵn sàng giao"
export const markOrderAsReady = async (orderID) => {
  try {
    const orderRef = doc(db, "Order", orderID);
    await updateDoc(orderRef, {
      status: "Sẵn sàng giao",
    });
    console.log(`✅ Đã cập nhật đơn hàng ${orderID} thành "Sẵn sàng giao"`);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật trạng thái đơn hàng:", error);
    throw new Error("Không thể cập nhật trạng thái đơn hàng.");
  }
};
export async function createOrder(currentOrder) {
  const orderRef = await addDoc(collection(db, "Order"), {
    orderID: currentOrder.orderID,
    buyDate: Timestamp.now().toDate(),
    status: "Đang xử lý",
    userName: null,
    tableNumber: currentOrder.tableNumber,
    paymentMethod:
      currentOrder.paymentMethod === "cash" ? "Tiền mặt" : "Chuyển khoản",
    totalPrice: currentOrder.totalPrice,
    products: currentOrder.products.map((product) => ({
      productID: product.productID,
      productName: product.productName,
      orderQuantity: product.orderQuantity,
      unitPrice: product.unitPrice,
      singleProductPrice: product.singleProductPrice,
    })),
  });
}
export async function confirmOrder(orderID, userType) {
  const queryOrderID = query(
    collection(db, "Order"),
    where("orderID", "==", Number(orderID))
  );
  const IDsnapshot = await getDocs(queryOrderID);
  if (IDsnapshot.empty) {
    console.log("No order found with the provided orderID");
    return;
  }
  const IDdata = IDsnapshot.docs[0];
  const dataRef = doc(db, "Order", IDdata.id);
  const currentDate = Timestamp.now().toDate();
  try {
    await updateDoc(dataRef, {
      buyDate: currentDate,
      status: "Đã xác nhận",
      userName: userType,
    });
    console.log("Updated buydate and status");
  } catch (error) {
    console.log(error);
  }
}
export async function getOrderDetail(currentOrderID) {
  const thisOrderID = Number(currentOrderID);
  const queryOrderBill = query(
    collection(db, "Order"),
    where("orderID", "==", thisOrderID)
  );
  try {
    const billSnapshot = await getDocs(queryOrderBill);
    if (billSnapshot.empty) {
      console.log("No order found");
      return null;
    }
    const billData = billSnapshot.docs[0].data();
    console.log(`query return: ${billData}`);
    return billData;
  } catch (error) {
    console.log(error);
  }
}
