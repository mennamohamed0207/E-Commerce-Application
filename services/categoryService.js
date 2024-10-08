const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const apiError=require("../utils/apiError")


//the body of the function when we were in server.js
// exports.createCategory=(req, res,next) => {
//   //1-getting the data from data from post request
// const name = req.body.name;
// //making a new object with the name from the request to send it to the DB
// const newCategory = new categoryModel({ name });
// //save is mandatory to send it to DB and it returns promise
// newCategory
//   .save()
//   .then((doc) => {
//       //to return the document entered in the database
//     res.json(doc);
//   })
//   .catch((error) => {
//       console.error(`this error is in post request${error}`);
//       res.json(error);
// });
// }

//@desc Create category
//@Route POST /api/v1/categories
//@Access Private
exports.createCategory = asyncHandler(async (req, res,next) => {
  const name = req.body.name;
  const categorty = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: categorty });
});
//@desc Get all categories
//@Route GET /api/v1/categories
//@Access Public
exports.getCategories = asyncHandler(async (req, res,next) => {
  //*1 to convert it from string to integer
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({
      results: categories.length,
      page: page,
      limit: limit,
      data: categories,
    });
});
exports.getCategory = asyncHandler(async (req, res,next) => {
  const id = req.params.id; //const {id} =req.params;
  const categorty = await categoryModel.findById(id);
  if (!categorty) {
    // res.status(404).json({ msg: `No category found with this ${id}` });
    return next(new apiError(`No category found with this ${id}`, 404));
  } else res.status(200).json({ data: categorty });
});
exports.updateCategory=asyncHandler (async(req,res,next)=>{
  const id=req.params.id;
  const name=req.body.name;
  const categorty=await categoryModel.findOneAndUpdate({_id:id},{name:name,slug:slugify(name)},{new:true});
  if (!categorty) {
    // res.status(404).json({ msg: `No category found with this ${id}` });
    return next(new apiError(`No category found with this ${id}`, 404));
  } else res.status(200).json({ data: categorty });

});
exports.deleteCategory=asyncHandler(async(req,res,next)=>{
  const id =req.params.id;
  // const categorty=await categoryModel.deleteOne({_id:id});
  //this one always return the else although the document does not exist
  // if (!categorty) {
  //   res.status(404).json({ msg: `No category found with this ${id}` });
  // } else res.status(200).json({ msg: `Category with this ${id} has been deleted successfully` });

  const categorty=await categoryModel.findByIdAndDelete(id);
  if (!categorty) {
    // res.status(404).json({ msg: `No category found with this ${id}` });
    return next(new apiError(`No category found with this ${id}`, 404));
  } else res.status(201).json({msg: `Category with this ${id} has been deleted successfully`});
  //if we want to indicate success without msg we can send status code 204

})