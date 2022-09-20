const  express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
const port = 3000;


app.post('/postUser',(req :any ,res:any)=>{
    res.send({code:200, message:'Success'})
})

app.get('/userPosts',(req :any,res:any)=>{
    res.send({code:200,message:'Success'});
})

app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})
