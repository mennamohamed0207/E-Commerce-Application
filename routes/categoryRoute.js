const express = require("express");
const router=express.Router();
const {createCategory, getCategories,getCategory}=require("../services/categoryService")


router.post("/",createCategory);
router.get("/",getCategories);
router.get("/:id",getCategory); //this id must be the same name as the variable in the controller


module.exports=router