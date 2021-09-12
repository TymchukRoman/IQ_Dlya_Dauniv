const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./routers/userRouter');
const resultRouter = require('./routers/resultRouter');
const questionRouter = require('./routers/questionRouter');
const logsRouter = require('./routers/logsRouter');

dotenv.config();
const config = process.env;

mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("error", err => {
    console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/', resultRouter)
app.use('/', questionRouter)
app.use('/', logsRouter)
app.use('/user', userRouter)

app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`));