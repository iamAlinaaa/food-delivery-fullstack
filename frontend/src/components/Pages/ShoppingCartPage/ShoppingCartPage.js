import React, { useState } from "react";
import Axios from "axios";
import classes from "./ShoppingCartPage.module.css";

import CardContainer from "../../UI/Containers/CardContainer";

import UserInformation from "./UserInformation";
import CartItems from "./CartItems";

function ShoppingCartPage(props) {
  const [userInfoAndOrder, setUserInfoAndOrder] = useState({
    userAddress: "",
    userEmail: "",
    userPhone: "",
    userName: "",
    userOrder: [],
    totalPrice: "",
  });

  // //////////////////////// WORKS FROM USE EFFECT un child components

  function userInfoHandlerMain(info) {
    setUserInfoAndOrder((prevInfo) => {
      return {
        ...prevInfo,
        ...info,
      };
    });
  }

  function userOrderHandler(order) {
    if (order === "No items") {
      return;
    } else {
      setUserInfoAndOrder((prevInfo) => {
        return {
          ...prevInfo,
          ...order,
        };
      });
    }
  }

  // ////////////////////////////////////// SUBMITTING TO BACKEND when button submit is clicked

  function submitUserOrderAndInfo(event) {
    // for page not to reload
    event.preventDefault();
    // check if user info and order are not empty
    if (
      userInfoAndOrder.userAddress.length !== 0 &&
      userInfoAndOrder.userEmail.length !== 0 &&
      userInfoAndOrder.userPhone.length !== 0 &&
      userInfoAndOrder.userName.length !== 0 &&
      userInfoAndOrder.userOrder.length !== 0 &&
      userInfoAndOrder.userAddress.length !== 0 &&
      userInfoAndOrder.totalPrice.length !== 0
    ) {
      // if we have object with same names for each post (like {name:name,phone:phone}, we can send it just like {name, phone})
      // but we keep all data into one useState object, so we need to specify
      Axios.post("http://localhost:5000/cart", {
        userAddress: userInfoAndOrder.userAddress,
        userEmail: userInfoAndOrder.userEmail,
        userPhone: userInfoAndOrder.userPhone,
        userName: userInfoAndOrder.userName,
        userOrder: userInfoAndOrder.userOrder,
        totalPrice: userInfoAndOrder.totalPrice,
      }).then((response) => {
        // clean cart and hide submit button
        props.handleCartCleaner();
        setUserInfoAndOrder({ totalPrice: "" });
        window.location.reload();
        alert("Your Order has been created!");
      });
    } else {
      alert(
        "Please, search your address on map or provide required information"
      );
    }
  }

  return (
    <>
      <form
        className={classes.mainContainer}
        action="/cart"
        method="post"
        // submitting through form
        onSubmit={(event) => submitUserOrderAndInfo(event)}
        id="submitUserInfoAndOrder"
      >
        <CardContainer
          style={{
            color: "black",
            minWidth: "45%",
            maxHeight: "100%",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserInformation
            // passed from this ShoppingCartPage component
            userInfoHandlerMain={userInfoHandlerMain}
          ></UserInformation>
        </CardContainer>
        <div
          style={{ minWidth: "50%", maxHeight: "100%", margin: 0, padding: 0 }}
        >
          <CardContainer style={{ maxHeight: "90%" }}>
            <CartItems
              // passed from this ShoppingCartPage component
              userOrderHandler={userOrderHandler}
              // passed through props
              couponItems={props.couponItems}
              cartItems={props.cartItems}
              handleAddProduct={props.handleAddProduct}
              handleRemoveProduct={props.handleRemoveProduct}
              handleCartCleaner={props.handleCartCleaner}
            ></CartItems>

            {/* Ternary operator */}
            {userInfoAndOrder.totalPrice === "" ||
            userInfoAndOrder.totalPrice === 0.0 ? (
              <></>
            ) : (
              <div className={classes.userInfo}>
                <button type="submit" className={classes.userSubmitButton}>
                  Submit
                </button>
              </div>
            )}
          </CardContainer>
        </div>
      </form>
    </>
  );
}

export default ShoppingCartPage;
