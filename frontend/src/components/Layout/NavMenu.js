// Navigation menu with routing
import React, {useState} from "react";
import { Link } from "react-router-dom";

import classes from "./NavMenu.module.css";

import ItemContainer from "../UI/Containers/ItemContainer";

function NavMenu(props) {
const [isLinkClicked, setIsLinkClicked] = useState("Shop")

// get shop name of clicked (chosen) link
function onSelectLink(event) {
  setIsLinkClicked(event.target.id)
}

  return (
    <header className={classes.navigationBar}>
      <ItemContainer>
        <Link to="/" onClick={onSelectLink} className={`${classes.navigationItem} ${isLinkClicked === "Shop" && classes.active}`} id="Shop">
          Shop
        </Link>
      </ItemContainer>
      <ItemContainer>
        <Link to="/cart" onClick={onSelectLink} className={`${classes.navigationItem} ${isLinkClicked === "Shopping Cart" && classes.active}`} id="Shopping Cart">
          Shopping Cart
          {/* to show only number in span */}
          {/* <span className={classes.cartLength}>{props.cartItems.length === 0 ? "" : props.cartItems.length}</span> */}
          {/* to show number in span after user adds something to cart */}
          {props.cartItems.length === 0 ? "" : <span className={classes.cartLength}>{props.cartItems.length}</span>}
        </Link>
      </ItemContainer>
      <ItemContainer>
        <Link to="/history" onClick={onSelectLink} className={`${classes.navigationItem} ${isLinkClicked === "History" && classes.active}`} id="History">History</Link>
      </ItemContainer>
      <ItemContainer>
        <Link to="/coupons" onClick={onSelectLink} className={`${classes.navigationItem} ${isLinkClicked === "Coupons" && classes.active}`} id="Coupons">Coupons</Link>
      </ItemContainer>
    </header>
  );
}

export default NavMenu;
