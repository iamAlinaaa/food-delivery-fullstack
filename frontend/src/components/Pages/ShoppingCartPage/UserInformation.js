import { useState, useEffect } from "react";

import classes from "./UserInformation.module.css";

// const my_api_key_google_maps = `AIzaSyCOwkj9-VJYmj2kwLK1c_DLf3MBjO2V12M`;
const shopPosition = "Tsum+Kyiv";

function UserInformation(props) {
  // ///////////////////////////////// STATES
  // for user input address
  const [userAddress, setUserAddress] = useState("");
  //   holds original destination and changes after user has clecked a button
  const [addressSearchButton, setaddressSearchButton] = useState(
    `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MY_API_KEY_GOOGLE_MAPS}&q=${shopPosition}`
  );

  const [userInfo, setUserInfo] = useState({
    userAddress: "",
    userEmail: "",
    userPhone: "",
    userName: "",
  });

  // ///////////////////////////////////// USE EFFECT
  useEffect(() => {
    props.userInfoHandlerMain(userInfo)
  }, [userInfo] )

  
  // //////////////////////////////////// FUNCTIONS

  //   when user inputs an address
  function userAddressHandler(event) {
    setUserAddress(event.target.value);
    setUserInfo((prevData) => {
      return {...prevData, userAddress: event.target.value }
    })
  }

  //   when button is clicked user searches for address on map
  function addressButtonHandler() {
    if (userAddress.length === 0) {
      alert("Please, enter your address of delivery first");
      return;
    } else {
      const modifiedUserAddress = userAddress.trim().split(" ").join("+");
      console.log(modifiedUserAddress);
      // we add user addres to get destination from shop to user's place
      setaddressSearchButton(
        `https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_MY_API_KEY_GOOGLE_MAPS}&origin=${shopPosition}&destination=${modifiedUserAddress}&avoid=tolls|highways`
      );
      // // send user address up to parent component through props function
      setUserInfo({...userInfo, userAddress: userAddress.trim()})
    }
  }

  function userInfoHandler(event) {
    const newInfo = { ...userInfo };
    newInfo[event.target.id] = event.target.value.trim();
    setUserInfo(newInfo);
  }

  // /////////////////////////////////// RETURN
  return (
    <>
      <div style={{ padding: "10px 30px" }}>
        <iframe
          title="map"
          width="100%"
          height="250rem"
          borderradius="15px"
          style={{ border: "0" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          //   if button is clicked destination changes
          src={addressSearchButton}
        ></iframe>
      </div>
      <div>
        <div className={`${classes.userSearch} ${classes.userInfo}`}>
          <div>
            <label className={classes.infoTitles} htmlFor="userAddress">
              Adress:
            </label>
            <input
              placeholder="Enter your address and search"
              className={classes.formControl}
              id="userAddress"
              type="text"
              name="userAddress"
              autoComplete="off"
              value={userAddress}
              onChange={userAddressHandler}
            />
          </div>
          <div>
            <button
              className={classes.userSearchButton}
              type="button"
              onClick={addressButtonHandler}
            >
              Search on Map
            </button>
          </div>
        </div>
        <div className={classes.userInfo}>
          <label className={classes.infoTitles} htmlFor="userEmail">
            Email:
          </label>
          <input
            className={classes.formControl}
            id="userEmail"
            type="email"
            name="userEmail"
            autoComplete="off"
            onChange={(e) => userInfoHandler(e)}
            value={userInfo.userEmail}
          />
        </div>
        <div className={classes.userInfo}>
          <label className={classes.infoTitles} htmlFor="userPhone">
            Phone:
          </label>
          <input
            className={classes.formControl}
            id="userPhone"
            type="tel"
            name="userPhone"
            autoComplete="off"
            onChange={(e) => userInfoHandler(e)}
            value={userInfo.userPhone}
          />
        </div>
        <div className={classes.userInfo}>
          <label className={classes.infoTitles} htmlFor="userName">
            Name:
          </label>
          <input
            className={classes.formControl}
            id="userName"
            type="text"
            name="userName"
            autoComplete="off"
            onChange={(e) => userInfoHandler(e)}
            value={userInfo.userName}
          />
        </div>
      </div>
    </>
  );
}

export default UserInformation;
