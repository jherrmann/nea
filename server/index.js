const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Annotation = require('./model/annotation');
const url = 'mongodb://localhost/neaDB';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// http://localhost:3000/api/namedentities?id=5b79a6ba20e7a0bd3eddb44b
app.get('/api/namedentities', (req, res) => {
    mongoose.connect(url, function (err) {
        if (err) throw err;
        Annotation.findById(req.query.id, function (err, anno) {
            if (err) throw err;
            return res.status(200).json(anno)
        })
    });
})

app.listen(3000, () => console.log('NEA server running on port 3000!'))