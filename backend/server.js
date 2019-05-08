var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')
var _ = require('lodash');

var app = express()

var Product = require('./models/Product.js')

app.use(cors())
app.use(bodyParser.json())

app.get('/products', async (req, res) => {

    try {
        var products = await Product.find({}, '-__v')
        res.send(products)
    }
    catch (err) {

        res.sendStatus(500)
        console.log(err)
    }
})


app.get('/product/:id', async (req, res) => {

    try {
      
        var query= { id: req.params.id};
        console.log(query)
        var product = await Product.find(query)
        console.log(req.params.id)
        console.log(product)
        res.send(product)
        
    }
    catch (err) {

        res.sendStatus(500)
        console.log(err)
    }
})

app.post('/products', (req, res) => {

    var requestData = req.body
    var product = new Product(requestData)
    product.save((err, result) => {
        if (err) {
            console.log('eror saving product')
            res.status(500).send('eror saving product')
        }
        res.sendStatus(200)
    })

})

app.put('/products/:id', async (req, res, next) => {

    // try {

    //     var query = { id: req.params.id };
    //     console.log(query)
    //     var product = await Product.findOne(query).exec()
    //     //var product = await Product.findOne(request.params.id).exec();
    //     product.set(req.body);
    //     var result = await product.save();
    //     res.status(200).send(result);
    // } catch (error) {
    //     res.status(500).send(error);
    //     console.log(error)
    // }
    Product
        .findOneAndUpdate({ id: req.params.id }, req.body)
        .exec(function (err, product) {
            product.set(req.body);
            product.save();
            console.log(req.body)
            if (err) return res.status(500).json({ err: err.message })
            res.json({ product, message: 'Successfully updated' })
        });

    })



app.delete('/product/:id',async (req,res)=>{
   
   
    var query= { id: req.params.id};
    console.log(query)
    var product = await Product.findOne(query).exec()
    product.remove(function(err,removed){
        if (err) {
            next(err);
          } else {
            res.json(removed);
          }
    })

})



mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('Problem connecting with Mongo Db.')

        console.log('Connected to Mongo')

    }
})

app.listen(3000)