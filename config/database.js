const mongoose = require("mongoose");
const dbConnection=()=>{
    mongoose
  .connect(process.env.DB_URI)
  .then((conn) => {
    console.log("connection is suceedded");
  })
  .catch((error) => {
    console.log(`An error has occured in DB connection which is ${error}`);
  });
}
module.exports=dbConnection