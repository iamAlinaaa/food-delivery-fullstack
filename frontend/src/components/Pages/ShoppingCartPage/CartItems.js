import { useState, useEffect } from "react";
import classes from "./CartItems.module.css";
import CouponCode from "./CouponCode";

function CartItems(props) {
  // ////////////////// CALCULATING TOTAL PRICE OF ALL ITEMS HERE
  // 0 here is initial value that we can pass
  // we multiply item.quantity by item.price and add it to price accumulator
  const totalPrice = props.cartItems.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );

  // State for items in cart and total price
  const [discountPrice, setDiscountPrice] = useState(totalPrice);
  const [currentDiscountPercent, setCurrentDiscountPercent] = useState();
  const [isDiscountUsed, setIsDiscountUsed] = useState(false);
  const [userOrderAndPrice, setUserOrderAndPrice] = useState("No items");

  // /////////////////////////////// USE EFFECT to pass info to parent
  useEffect(() => {
    if (props.cartItems.length === 0) {
      setUserOrderAndPrice("No items");
    } else {
      setUserOrderAndPrice({
        userOrder: props.cartItems,
        totalPrice: totalPrice.toFixed(2),
      });
    }
  }, [props.cartItems, totalPrice]);

  useEffect(() => {
    props.userOrderHandler(userOrderAndPrice);
  }, [userOrderAndPrice]);

  useEffect(() => {
    if (isDiscountUsed) {
      let newPrice = totalPrice - (totalPrice * currentDiscountPercent) / 100;
      setDiscountPrice(newPrice);
      setUserOrderAndPrice({
        userOrder: props.cartItems,
        totalPrice:`${newPrice.toFixed(2)} with discount`,
      });
    }
    
  }, [isDiscountUsed, totalPrice]);

  // ////////////////////////////////////////// FUNCTIONS

  function useDiscount(coupon) {
    setCurrentDiscountPercent(coupon.discount);
    let newPrice = totalPrice - (totalPrice * coupon.discount) / 100;
    setDiscountPrice(newPrice);
    setIsDiscountUsed(true);
    alert(`${coupon.name} Discount was applied :)`)
  }

  // ////////////////////////////////////////// RETURN

  return (
    <>
      <div className={classes.cartItems}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: 0,
          }}
        >
          <h2 className={classes.cartItemsHeader}>Cart Items</h2>
          <div className={classes.clearCart}>
            {props.cartItems.length >= 1 && (
              <button
                className={classes.clearCartButton}
                onClick={() => props.handleCartCleaner()}
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
        {props.cartItems.length === 0 && (
          <div className={classes.cartItemsEmpty}>No items are added.</div>
        )}
        <div style={{ color: "black", minWidth: "50%" }}>
          <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
            {props.cartItems.map((item) => (
              <div key={item.id} className={classes.cartItemsList}>
                <img
                  className={classes.cartItemsImage}
                  src={item.image}
                  alt={item.name}
                />
                <div className={classes.cartItemsName}>{item.name}</div>
                <div className={classes.cartItemsFunction}>
                  <button
                    type="button"
                    className={classes.cartItemsAdd}
                    onClick={() => props.handleAddProduct(item)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className={classes.cartItemsRemove}
                    onClick={() => props.handleRemoveProduct(item)}
                  >
                    -
                  </button>
                </div>
                <div className={classes.cartItemsPrice}>
                  {item.quantity} * ${item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TERNARY OPERATOR if there are items in cart */}
      {totalPrice === 0.0 ? (
        <></>
      ) : (
        <div className={classes.userInfo}>
          <CouponCode
            couponItems={props.couponItems}
            useDiscount={useDiscount}
          />

          {/* TERNARY OPERATOR for showing discount */}
          {isDiscountUsed ? (
            <div className={classes.cartItemsTotalPriceName}>
              Discounted Price: ${discountPrice.toFixed(2)}
            </div>
          ) : (
            <div className={classes.cartItemsTotalPriceName}>
              Total Price: ${totalPrice.toFixed(2)}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CartItems;
