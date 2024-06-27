
//To create an express app
const expess = require("express");
const dotenv=require("dotenv")
const morgan=require("morgan")
const mongoose=require("mongoose")
dotenv.config({
    //if it was .env ,we will not need to configure its path
    path:"config.env"
})
//connect to DB
mongoose.connect(process.env.DB_URI).then((conn)=>{
    console.log("connection is suceedded")
}).catch((error)=>{
    console.log(`An error has occured in DB connection which is ${error}`)

})

const app = expess();
const port=process.env.PORT;

if (process.env.NODE_ENV=="development") {
    app.use(morgan("dev"));
    console.log(`we are in ${process.env.NODE_ENV}`)
}

app.locals.title = 'My App'

//Get request
app.get('/',(req,res)=>{
res.send("application first get method v6")
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})