import React from "react";
import classes from "./ItemContainer.module.css";

function ItemContainer(props) {
  return <div className={classes.itemContainer} style={props.style}><h2 className={classes.itemEffect}>{props.children}</h2></div>;
}

export default ItemContainer;
