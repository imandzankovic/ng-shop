var mongoose = require('mongoose')


module.exports = mongoose.model('Product',
    {
        id: Number,
        productName: String,
        productCode: String,
        tags: [],
        releaseDate: String,
        description: String,
        price: Number,
        starRating: Number,
        imageUrl: String

    })
