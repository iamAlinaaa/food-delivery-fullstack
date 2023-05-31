import { useState } from "react";
import classes from "./FindOrder.module.css";
import Axios from "axios";

import CardContainer from "../../UI/Containers/CardContainer";

function FindOrder(props) {
  const [userInfo, setUserInfo] = useState({
    userEmail: "",
  });

  function submitUserInfoButton(event) {
    // for page not to reload
    event.preventDefault();
    // check if user info and order are not empty
    if (userInfo.userEmail.length !== 0) {
      // if we have object with same names for each post (like {name:name,phone:phone}, we can send it just like {name, phone})
      // but we keep all data into one useState object, so we need to specify
      Axios.post("http://localhost:5000/history", {
        userEmail: userInfo.userEmail,
      }).then((response) => {
        console.log("response from server", response.data);
        props.userInfoHandlerMain(response.data)
      });
    } else {
      alert("Please, provide required information");
    }
  }

  function userInfoHandler(event) {
    const newInfo = { ...userInfo };
    newInfo[event.target.id] = event.target.value.trim();
    setUserInfo(newInfo);
  }

  return (
    <form
      action="/history"
      method="post"
      // submitting through form
      onSubmit={(event) => submitUserInfoButton(event)}
    >
      <CardContainer
        style={{
          color: "black",
          maxWidth: "30%",
          maxHeight: "100%",
          margin: "20px auto",
        }}
      >
        <div className={classes.findOrderContainer}>
          <div className={classes.userInfo}>
            <label className={classes.infoTitles} htmlFor="userEmail">
              Email:
            </label>
            <input
              className={classes.formControl}
              placeholder="Enter your email"
              id="userEmail"
              type="email"
              name="userEmail"
              autoComplete="off"
              onChange={(e) => userInfoHandler(e)}
              value={userInfo.userEmail}
            />
          </div>
          <button type="submit" className={classes.userSubmitButton}>
            Find My Orders
          </button>
        </div>
      </CardContainer>
    </form>
  );
}

export default FindOrder;
