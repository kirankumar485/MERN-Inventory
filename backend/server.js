const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app=express()

const PORT =process.env.PORT || 5000;

//Connect DB and start server

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        app.listen(PORT,() => {
            console.log(`Server running on PORT ${PORT}`)

        })
    })
    .catch((err)=> console.log(err))