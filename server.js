//To create an express app
const expess = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({
  //if it was .env ,we will not need to configure its path
  path: "config.env",
});

//connect to DB
const dbConnection=require("./config/database");
const categoryRoute =require("./routes/categoryRoute");
dbConnection();



//express app
const app = expess();

//middleware
//to accept data as json
app.use(expess.json());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`we are in ${process.env.NODE_ENV}`);
}

//Mount Routes
app.use("/api/v1/categories",categoryRoute);

//Global Error handling middleware 
//it must be at the end
app.use((error,req,res,next)=>{
  res.status(500).json({error})
})
//server listen to the port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
