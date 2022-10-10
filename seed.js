const express = require("express")
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/product')


mongoose.connect("mongodb+srv://user:pass123@cluster0.avm9sgy.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true }
).then(() => console.log("Database Connection succesful")).catch(() => console.log("error"))

const p = new Product({
    name:'cheese',
    price: 75,
    category: 'dairy'
})


p.save()
    .then(p => {
        console.log(p)
    })
    .catch(e => {
        console.log(e)
    })