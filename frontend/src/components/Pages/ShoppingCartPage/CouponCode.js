import classes from "./CartItems.module.css";
import { useState, useEffect } from "react";

function CouponCode(props) {
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    // get current discount
    if (couponCode !== "") {
      let [coupon] = props.couponItems.filter(
        (couponItem) => couponItem.code === couponCode
      );
      // we check if coupon matches to any coupon from list DB and then pass it to parent
      if (coupon !== undefined) {
        props.useDiscount(coupon);
      }
    }
  }, [couponCode]);

  function userInfoHandler(event) {
    setCouponCode(event.target.value);
    console.log(event.target.value);
  }
  return (
    <input
      placeholder="coupon code"
      className={classes.formControl}
      onChange={(e) => userInfoHandler(e)}
      value={couponCode}
    ></input>
  );
}

export default CouponCode;
