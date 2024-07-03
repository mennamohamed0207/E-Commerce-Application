const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

//the body of the function when we were in server.js
// exports.createCategory=(req, res) => {
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
exports.createCategory = (req, res) => {
  const name = req.body.name;
  categoryModel
    .create({ name, slug: slugify(name) })
    .then((categorty) => res.status(201).json({ data: categorty }))
    .catch((err) => res.status(400).json({ error: 400 }));
};
