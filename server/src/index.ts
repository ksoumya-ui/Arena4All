var mongoose = require('mongoose');
var app = require('./app');
var express =require('express');
var router =  express.Router();

const port = process.env.PORT || 3000;

const mongoDb =  process.env.MONGODB_URL || 'mongodb://localhost:27017/arena';

mongoose.connect(mongoDb,{usenewUrlParser :true})
// .then(()=>{
//     console.log("DB Connection Successful!");
//     app.listen(port,()=>{
//         console.log(`Server listening on ${port}`)
//     })
// }).catch((err:any) =>console.log("Error",err))

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("DB Connection Successful!");
});

app.use(router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});



