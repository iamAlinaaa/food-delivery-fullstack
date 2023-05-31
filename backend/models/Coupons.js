// model for MongoDB collection productItems
const mongoose = require("mongoose");

// create a Schema
const CouponSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
});

// create model with collection name and schema
const CouponModel = mongoose.model("coupons", CouponSchema);

// export this outside of the file with purpose to have an access
module.exports = CouponModel;
