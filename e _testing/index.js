const express = require('express');
const router = require('./Routes/route.js')
const bodyParser = require('body-parser')
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
const port =  process.env.PORT||2001;
app.use('/',router.rout);
app.listen(port,()=>{
    console.log("Connection Successfull at port http://localhost:" +port)
});




