const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./routers/userRouter');
const resultRouter = require('./routers/resultRouter');
const questionRouter = require('./routers/questionRouter');

mongoose.connect("mongodb://localhost:27017/iq", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("error", err => {
    console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
})

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/', resultRouter)
app.use('/', questionRouter)
app.use('/user', userRouter)

app.listen(4000, () => console.log(`Listening on port 4000`));