const express = require('express');
const oracledb = require('oracledb');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
// DB config
// 引入users
const testDb = require('./routes/api/testDb');
const user = require('./routes/api/user');
const getbook = require('./routes/api/getbook');
const send = require('./routes/api/send');
const getmsg = require('./routes/api/getmsg');
app.use('/api/testDb', testDb);
app.use('/api/user', user);
app.use('/api/getbook', getbook);
app.use('/api/send', send)
app.use('/api/getmsg', getmsg)
app.listen(5000, () => {
    console.log('the port running');
})