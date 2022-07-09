const express = require("express");
const route =require("./routes/route");
const app = express();
const port = 2001;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/' , route.route)
app.listen(port , ()=>{
    console.log("Connection Successfull at port http://localhost:" + port)
});
