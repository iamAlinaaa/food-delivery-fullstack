import React, {useState} from "react";
import classes from "./MainShopPage.module.css";

import CardContainer from "../../UI/Containers/CardContainer";
import ItemContainer from "../../UI/Containers/ItemContainer";
import Products from "./Products";


const shopNames = ["PizzaHouse", "Candy Shop", "Burger XXL", "All Shops"];

function MainShopPage(props) {

  // check what shop is being selected
  const [shopNameTracker, setShopNameTracker] = useState("All Shops");

  // get shop name of clicked (chosen) shop
  function onSelectShop(event) {
    setShopNameTracker(event.target.id)
  }

  return (
    <>
      <div className={classes.mainContainer}>
        <CardContainer style={{ color: "#929292", minWidth: "20%", maxHeight: "400px"}}>
          <h1 style={{textAlign:"center", margin:"5px auto 10px auto"}}>Shops</h1>
          {shopNames.map((shopName) => (
            <ItemContainer key={shopName} style={{ color: "#FC4F00" }} >
              <p className={`${classes.shopName} ${shopNameTracker === shopName && classes.active}`} onClick={onSelectShop} id={shopName}>{shopName}</p>
            </ItemContainer>

          ))}
        </CardContainer>
        <CardContainer
          style={{
            backgroundColor: "white",
            minWidth: "60%",
            display: "flex",
          }}
        >
          <Products productItems={props.productItems} shopNameTracker={shopNameTracker} handleAddProduct={props.handleAddProduct}/>
        </CardContainer>
      </div>
    </>
  );
}

export default MainShopPage;
export {shopNames}
