// model for MongoDB collection productItems
const mongoose = require("mongoose");

// create a Schema
const ProductItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
});

// create model with collection name and  schema
const ProductItemModel = mongoose.model("items", ProductItemSchema);

// export this outside of the file with purpose to have an access
module.exports = ProductItemModel;

// id: "1",
// name: "Sony Headphones",
// price: 350,
// image: "./pictures/sony-headphones.jpg",
// quantity: 0,
