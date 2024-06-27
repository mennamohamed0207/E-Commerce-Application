
//To create an express app
const expess = require("express");
const app = expess();
const dotenv=require("dotenv")
const port=process.env.PORT;

dotenv.config({
    //if it was .env ,we will not need to configure its path
    path:"config.env"
})
app.locals.title = 'My App'

//Get request
app.get('/',(req,res)=>{
res.send("application first get method v6")
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})