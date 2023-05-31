import React from "react";
import classes from "./CardContainer.module.css";

function CardContainer(props) {
  return <div className={classes.cardContainer} style={props.style}>{props.children}</div>;
}

export default CardContainer;
