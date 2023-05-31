// model for MongoDB collection productItems
const mongoose = require("mongoose");

// create a Schema
const OrderSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPhone: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userOrder: [{}],
  totalPrice: {
    type: String,
    required: true,
  }
});

// create model with collection name and schema
const OrderModel = mongoose.model("orders", OrderSchema);

// export this outside of the file with purpose to have an access
module.exports = OrderModel;

// inside userOrder
// id: String,
// name: String,
// price: Number,
// image: String,
// quantity: Number,
// class: String,
