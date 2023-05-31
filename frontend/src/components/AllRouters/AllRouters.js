// Navigation menu with routing
import React from "react";
import { Route, Routes } from "react-router-dom";

import MainShopPage from "../Pages/MainShopPage/MainShopPage";
import ShoppingCartPage from "../Pages/ShoppingCartPage/ShoppingCartPage";
import CouponsPage from "../Pages/CouponsPage/CouponsPage";
import OrdersHistoryPage from "../Pages/OrdersHistoryPage/OrdersHistoryPage";

function AllRouters(props) {
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <MainShopPage
              productItems={props.productItems}
              handleAddProduct={props.handleAddProduct}
            />
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <ShoppingCartPage
              couponItems={props.couponItems}
              cartItems={props.cartItems}
              handleAddProduct={props.handleAddProduct}
              handleRemoveProduct={props.handleRemoveProduct}
              handleCartCleaner={props.handleCartCleaner}
            />
          }
        ></Route>
        <Route
          path="/coupons"
          element={<CouponsPage couponItems={props.couponItems} />}
        ></Route>
        <Route path="/history" element={<OrdersHistoryPage />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default AllRouters;
