//To create an express app
const expess = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

dotenv.config({
  //if it was .env ,we will not need to configure its path
  path: "config.env",
});

//connect to DB
mongoose
  .connect(process.env.DB_URI)
  .then((conn) => {
    console.log("connection is suceedded");
  })
  .catch((error) => {
    console.log(`An error has occured in DB connection which is ${error}`);
  });
//express app
const app = expess();
const port = process.env.PORT;

//middleware
//to accept data as json 
app.use(expess.json());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`we are in ${process.env.NODE_ENV}`);
}

//1-Create Schema
const categorySchema = new mongoose.Schema({
  name: String,
});

//2-Create Model
const categoryModel = new mongoose.model("category", categorySchema);

//Routes
app.get("/", (req, res) => {
  res.send("application first get method v6");
});


app.post("/", (req, res) => {
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
});

//server listen to the port
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
