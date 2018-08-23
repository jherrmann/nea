const express = require('express')
const app = express()

const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Annotation = require('./model/annotation');
const url = 'mongodb://localhost/neaDB';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Connecting to the database
mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// http://localhost:3000/api/namedentities/5b59946547c34d5ac72d7284
app.get('/api/namedentities/:annoId', (req, res) => {

        Annotation.findById(req.params.annoId, function (err, anno) {
            if (err) throw err;
            return res.status(200).json(anno)
        });
})

app.get('/api/namedentities/', (req, res) => {

    Annotation.find({}, '_id' , function (err, annos) {
        if (err) throw err;
        return res.status(200).json(annos)
    });
})

app.put('/api/namedentities/:annoId', (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Named Entities content can not be empty"
        });
    }

    // Find Annotation and update it with the request body
    Annotation.findByIdAndUpdate(req.params.annoId, {
        named_entities: req.body,
        last_modified_date: new Date()
    }, {new: true})
    .then(anno => {
        if(!anno) {
            return res.status(404).send({
                message: "Annotation not found with id " + req.params.annoId
            });
        }
        res.send(anno);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Annotation not found with id " + req.params.annoId
            });                
        }
        return res.status(500).send({
            message: "Error updating annotation with id " + req.params.annoId
        });
    });
})

app.use('/', express.static(path.join(__dirname, '/public')))

app.listen(3000, () => console.log('NEA server running on port 3000!'))