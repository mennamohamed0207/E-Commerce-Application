const express = require("express");
const router=express.Router();
const {createCategory, getCategories,getCategory,updateCategory,deleteCategory}=require("../services/categoryService")


router.post("/",createCategory);
router.get("/",getCategories);
router.get("/:id",getCategory); //this id must be the same name as the variable in the controller
router.put("/:id",updateCategory);
router.delete("/:id",deleteCategory);
//router.route("/").get(getCategories).post(createCategory)
//router.route("/:id").put(updateCategory).delete(deleteCategory)


module.exports=router