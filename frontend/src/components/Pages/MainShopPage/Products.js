import React from "react";
import classes from "./Products.module.css";

function Products(props) {
  //  filter items by shop name and chose required or all if user clicked "All Shops"
  const availableProductItems = props.productItems.filter(
    (productItem) =>
      productItem.class === props.shopNameTracker ||
      props.shopNameTracker === "All Shops"
  );
  return (
    <div className={classes.products}>
      {/* we call map function with puprose to loop through all our elements */}
      {availableProductItems.map((productItem) => (
        <div key={productItem.id} className={classes.card}>
          <div>
            <img
              className={classes.productImage}
              src={productItem.image}
              alt={productItem.name}
            />
          </div>
          <div>
            <h3 className={classes.productName}>{productItem.name}</h3>
          </div>
          <div className={classes.productPrice}>${productItem.price}</div>
          <div>
            <button
              className={classes.productAddButton}
              onClick={() => props.handleAddProduct(productItem)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;