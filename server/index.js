const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Annotation = require('./model/annotation');
const url = 'mongodb://localhost/neaDB';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// http://localhost:3000/api/namedentities/5b59946547c34d5ac72d7284
app.get('/api/namedentities/:annoId', (req, res) => {
    mongoose.connect(url, function (err) {
        if (err) throw err;
        Annotation.findById(req.params.annoId, function (err, anno) {
            if (err) throw err;
            return res.status(200).json(anno)
        })
    });
})

app.listen(3000, () => console.log('NEA server running on port 3000!'))