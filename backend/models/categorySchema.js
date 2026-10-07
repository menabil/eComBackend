const mongoose = require("mongoose");
const subCategorySchema = require("./subCategorySchema");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["active", "deactive", "reject"],
    default: "deactive",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  subCategory: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
