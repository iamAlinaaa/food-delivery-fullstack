// ENTRY POINT FILE

const express = require("express");
const app = express();
// to connect backend and frontend we use cors and app.use(cors())
const cors = require("cors");
// try
app.use(cors());
// we need it to parse json we post from frontend
app.use(express.json());

// require dotenv
require("dotenv").config();

// WE SHOULD USE ANY PORT BUT 3000, BECAUSE ITS DEFAULD REACT APP
// (and in package.json of frontend we should add "proxy": "http://localhost:5000",)
const PORT = process.env.PORT || 5000;

// MongoDB connection
const mongoose = require("mongoose");
// line to connect to cluster with database
mongoose.connect(
  // "mongodb+srv://iamAlinaaa:iamAlinaaa123456789@alina1.yavwabv.mongodb.net/foodDeliveryAppDB?retryWrites=true&w=majority"
  `${process.env.MONGO_DB_CONNECTION}?retryWrites=true&w=majority`
);
// require mongoose models
const ProductItemModel = require("./models/ProductItems");
const CouponModel = require("./models/Coupons");
const OrderModel = require("./models/UserOrders");

// with req we get info that is being sent from the frontend and with res we send info from backend to frontend
app.get("/", async (req, res) => {
  try {
    const allItemsModel = await ProductItemModel.find({});
    res.json(allItemsModel);
  } catch (err) {
    console.log(err);
  }
});

// post request will help add data co collection db (from frontend)
app.post("/cart", async (req, res) => {
  try {
    const newOrder = new OrderModel({
      userAddress: req.body.userAddress,
      userEmail: req.body.userEmail,
      userPhone: req.body.userPhone,
      userName: req.body.userName,
      totalPrice: req.body.totalPrice,
      userOrder: req.body.userOrder,
    });
    newOrder.save();
    console.log("DONE");

    // send back to get response
    res.json(newOrder);
  } catch (err) {
    console.log(err);
  }
});

app.post("/history", async (req, res) => {
  try {
    const findOrder = await OrderModel.find({
      userEmail: req.body.userEmail
    }).exec();
    res.json(findOrder);
  } catch (err) {
    console.log(err);
  }
});

app.get("/coupons", async (req, res) => {
  try {
    const allCouponsModel = await CouponModel.find({});
    res.json(allCouponsModel);
  } catch (err) {
    console.log(err);
  }
});

//  listen to server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
