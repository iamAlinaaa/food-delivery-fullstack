import React from "react";
import classes from "./CouponsPage.module.css";
import CardContainer from "../../UI/Containers/CardContainer";

function CouponsPage(props) {
  return (
    <CardContainer
      style={{
        backgroundColor: "white",
        display: "flex",
      }}
    >
      <div className={classes.coupons}>
        {/* we call map function with puprose to loop through all our elements */}
        {props.couponItems.map((couponItem) => (
          <div key={couponItem.id} className={classes.card}>
            <div>
              <img
                className={classes.couponImage}
                src={couponItem.image}
                alt={couponItem.name}
              />
            </div>
            <div>
              <h3 className={classes.couponName}>{couponItem.name}</h3>
            </div>
            <div className={classes.discountCode}>
              Discount Code: {couponItem.code}
            </div>
            <div>
              <button
                className={classes.copyCodeButton}
                onClick={() => {
                  // to copy text on clipboard
                  navigator.clipboard.writeText(couponItem.code);
                }}
              >
                Copy Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </CardContainer>
  );
}

export default CouponsPage;

