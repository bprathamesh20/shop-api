const { urlencoded } = require("body-parser")
const express = require("express")
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/product')
const methodOverride = require('method-override')


mongoose.connect("mongodb+srv://user:pass123@cluster0.avm9sgy.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true }
).then(() => console.log("Database Connection succesful")).catch(() => console.log("error"))


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    res.send('Hello')
})
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', { products })
})
app.get('/products/new', async (req, res) => {
    res.render('products/new')

})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    console.log(newProduct)
    res.redirect(`products/${newProduct._id}`)


})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/details', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/edit', { product })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect(`/products/`)
})



app.listen(3000)

