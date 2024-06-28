const express = require("express");
const router=express.Router();
const {createCategory}=require("../services/categoryService")


router.post("/",createCategory);

module.exports=router