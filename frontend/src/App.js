// to browse all routers in App.js we need to wrap it around all routers
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Axios from "axios";

import "./App.css";

// components
import NavMenu from "./components/Layout/NavMenu";
import AllRouters from "./components/AllRouters/AllRouters";


function App() {
  // state: list of product items and coupons that we get from DB from frontend
  const [listOfProductItemsFromDB, setListOfProductItemsFromDB] = useState([]);
  const [listOfCouponsFromDB, setlistOfCouponsFromDB] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  // useEffect will run immideately when website is loading
  // We make API call to backend using axios
  // TO GET PRODUCT ITEMS FOR MAIN PAGE
  useEffect(() => {
    // we pass url to our server page we need, then we return a promise(.then()) and catch the response from backend
    Axios.get("http://localhost:5000/", { crossdomain: true }).then(
      (response) => {
        // to access the data : response.data and we add it to our state listOfProductItemsFromDB to keep here
        setListOfProductItemsFromDB(response.data);
      }
    );
  }, []);

  // TO GET COUPONS FOR COUPONS PAGE
  useEffect(() => {
    Axios.get("http://localhost:5000/coupons", { crossdomain: true }).then(
      (response) => {
        setlistOfCouponsFromDB(response.data);
      }
    );
  }, []);

  // ///////////////////////////FUNCTIONS TO DEAL WITH PRODUCT ITEMS INSIDE CART
  function handleAddProduct(product) {
    // check if product exists through all array
    const ProductExists = cartItems.find((item) => item.id === product.id);
    // if product already exists
    if (ProductExists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExists, quantity: ProductExists.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  function handleRemoveProduct(product) {
    // check if product exists through all array
    const ProductExists = cartItems.find((item) => item.id === product.id);
    // to delete product if it is just one
    if (ProductExists.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExists, quantity: ProductExists.quantity - 1 }
            : item
        )
      );
    }
  }

  // function that will help clear all the items from the cart by one click
  function handleCartCleaner() {
    //  just set cart items array to an empty array
    setCartItems([]);
    window.location.reload();
  }
  // ////////////////////////////////////////////////////////////////

  return (
    <Router>
      <NavMenu cartItems={cartItems} />
      <AllRouters
        productItems={listOfProductItemsFromDB}
        couponItems={listOfCouponsFromDB}
        cartItems={cartItems}
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
        handleCartCleaner={handleCartCleaner}
      />
    </Router>
  );
}

export default App;
