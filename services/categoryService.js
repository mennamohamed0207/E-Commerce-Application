const categoryModel=require("../models/categoryModel")
exports.createCategory=(req, res) => {
    //1-getting the data from data from post request
  const name = req.body.name;
  //making a new object with the name from the request to send it to the DB
  const newCategory = new categoryModel({ name });
  //save is mandatory to send it to DB and it returns promise
  newCategory
    .save()
    .then((doc) => {
        //to return the document entered in the database
      res.json(doc);
    })
    .catch((error) => {
        console.error(`this error is in post request${error}`);
        res.json(error);
    });
}

