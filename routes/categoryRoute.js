const express = require("express");
const router=express.Router();
const {createCategory, getCategories}=require("../services/categoryService")


router.post("/",createCategory);
router.get("/",getCategories);


module.exports=router