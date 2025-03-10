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