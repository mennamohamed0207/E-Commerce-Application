const mongoose = require("mongoose");
//1-Create Schema
const categorySchema = new mongoose.Schema({
    name: String,
  });
  
  //2-Create Model
  const categoryModel = new mongoose.model("category", categorySchema);
  
  module.exports=categoryModel