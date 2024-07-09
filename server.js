//To create an express app
const expess = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const apiError=require("./utils/apiError")

dotenv.config({
  //if it was .env ,we will not need to configure its path
  path: "config.env",
});

//connect to DB
const dbConnection=require("./config/database");
const categoryRoute =require("./routes/categoryRoute");
const globalError = require("./middleware/errorMiddleware");
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

app.all("*", (req, res, next) => {
  //Create an error when there is not route found and then pass it to the global error handler

  //Version 1 before apiError
  // const error=new Error("route not found");
  // next(error.message);

  next(new apiError(`can't find ${req.originalUrl} on this server`, 404));
})
//Global Error handling middleware 
//it must be at the end
app.use(globalError)
//server listen to the port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
