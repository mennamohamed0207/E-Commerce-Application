const mongoose = require("mongoose");
//1-Create Schema
const categorySchema = new mongoose.Schema({
    name: {
      type:String,
      required:[true,"Category name is required"],
      unique:[true,"Category name must be unique"],
      minLength:[3,"Category name must be at least 3 characters"],
      maxLength:[32,"Category name must be less than 32 characters"]
    },
    //the slug is the name of the category in url
    slug:{
      type:String,
      lowercase:true
    },
    image:String,
  },{timestamps:true});
  
  //2-Create Model
  const categoryModel = new mongoose.model("category", categorySchema);
  
  module.exports=categoryModel