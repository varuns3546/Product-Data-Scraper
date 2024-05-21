require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const storesRoutes = require('./storesRoutes')

const app = express()

app.use(express.json())
app.use(function(req, res, next) {
  console.log(req.path, req.method)
  next();
});

app.use(storesRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () =>{
            console.log('connected to database and listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })