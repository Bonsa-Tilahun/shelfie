const express = require('express')
const massive = require('massive')
require('dotenv').config()

const prdctCtrl = require('./controller/productController')

const app = express()
app.use(express.json())

const { SERVER_PORT, CONNECTION_STRING } = process.env

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    console.log("DB connected")
    app.set('db', dbInstance)
    app.listen(SERVER_PORT, () => console.log(`SERVER IS UP AND RUNNING ON PORT ${SERVER_PORT}`))
})


app.post('/api/product', prdctCtrl.addProduct) //used to add product
app.get('/api/inventory', prdctCtrl.getProducts) //used to get all proucts
app.delete('/api/product/:id', prdctCtrl.deleteProduct) //used to get all proucts
app.put('/api/product/:id', prdctCtrl.editProduct) //used to get all proucts
app.get('/api/product/:id', prdctCtrl.getProduct) //used to get all proucts