var  express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/users');
const feedRoute = require('./routes/feed');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req:any, res:any, next:any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, feed, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, feed, OPTIONS, PUT, DELETE');

    next();
});


app.use('/feed',feedRoute);

app.use('/user',userRoute);


module.exports = app;