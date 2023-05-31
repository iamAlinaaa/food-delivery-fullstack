import classes from "./ListOfOrders.module.css";
import CardContainer from "../../UI/Containers/CardContainer";

function ListOfOrders(props) {
  // we get userData array
  const userData = props.userInfoOrderHistory;

  return (
    <>
      <div className={classes.orderContainer}>
        <div>
          {/* map through array or objects */}
          {userData.map((orderInfo) => (
            <CardContainer
              style={{
                backgroundColor: "white",
                display: "block",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1 style={{margin: "0"}}>Total Price: ${orderInfo.totalPrice}</h1>
              </div>
              <div
                key={orderInfo._id}
                style={{
                  display: "block",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className={classes.products}>
                  {/* map through array of orders */}
                  {orderInfo.userOrder.map((item) => (
                    <div key={item.id} className={classes.card}>
                      <div>
                        <img
                          className={classes.productImage}
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className={classes.productPrice}>
                        {`${item.quantity} * ${(
                          item.quantity * item.price
                        ).toFixed(2)}`}
                      </div>
                      <div>
                        <h3 className={classes.productName}>{item.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListOfOrders;
