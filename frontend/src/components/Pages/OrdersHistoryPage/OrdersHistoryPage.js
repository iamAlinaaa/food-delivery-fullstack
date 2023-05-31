import React, { useState } from "react";

import FindOrder from "./FindOrder";
import ListOfOrders from "./ListOfOrders";

function OrdersHistoryPage(props) {
  const [userInfoOrderHistory, setUserInfoOrderHistory] = useState(null);

  function userInfoHandlerMain(userOrder) {
    console.log("here userOrder goes", userOrder);
    setUserInfoOrderHistory(userOrder);
  }

  return (
    <>
      <FindOrder userInfoHandlerMain={userInfoHandlerMain}></FindOrder>

      {/* TERNARY OPERATOR if we have found order history */}
      {userInfoOrderHistory !== null && userInfoOrderHistory !== undefined ? (
        <div
          style={{ minWidth: "50%", maxHeight: "100%", margin: 0, padding: 0 }}
        >
            <ListOfOrders
              userInfoOrderHistory={userInfoOrderHistory}
            ></ListOfOrders>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default OrdersHistoryPage;
