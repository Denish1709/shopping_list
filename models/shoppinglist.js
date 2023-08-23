const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const shoppinglistSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  unit: {
    type: String,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },
  purchased: {
    type: Boolean,
    default: false,
  },
});

const Shoppinglist = model("Shoppinglist", shoppinglistSchema);
module.exports = Shoppinglist;
