const express = require('express')
const app = express()

const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Annotation = require('./model/annotation');
const EntityType = require('./model/entitytype');
const ClassType = require('./model/classtype');
const url = 'mongodb://localhost/neaDB';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Connecting to the database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

app.get('/api/entitytypes/', (req, res) => {

    let sets = req.query.sets;
    let query = {}
    if(sets) {
        query = { set: {"$in": sets } } 
    }

    EntityType.find(query, function (err, entities) {
        if (err) throw err;
        return res.status(200).json(entities)
    });
})

app.get('/api/entitysets/', (req, res) => {

    EntityType.distinct('set', function (err, entities) {
        if (err) throw err;
        return res.status(200).json(entities)
    });
})

app.get('/api/classtypes/', (req, res) => {

    let sets = req.query.sets;
    let query = {}
    if(sets) {
        query = { set: {"$in": sets } } 
    }

    ClassType.find(query, function (err, classes) {
        if (err) throw err;
        return res.status(200).json(classes)
    });
})

app.get('/api/classtypes/', (req, res) => {

    ClassType.distinct('set', function (err, classes) {
        if (err) throw err;
        return res.status(200).json(classes)
    });
})

app.get('/api/annotations/:annoId', (req, res) => {

        Annotation.findById(req.params.annoId, function (err, anno) {
            if (err) throw err;
            return res.status(200).json(anno)
        });
})

app.get('/api/annotationsets/', (req, res) => {

    Annotation.distinct('anno_set_name', function (err, entities) {
        if (err) throw err;
        return res.status(200).json(entities)
    });
})

app.get('/api/annotations/', (req, res) => {

    let sets = req.query.sets;
    let query = {}
    if(sets) {
        query = { anno_set_name: {"$in": sets } } 
    }

    Annotation.find(query, { '_id': true, 'name': true }).sort({name: 'asc'}).exec(function (err, annos) {
        if (err) throw err;
        return res.status(200).json(annos)
    });
})

app.put('/api/annotations/:annoId', (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Annotation content can not be empty"
        });
    }

    // Find Annotation and update it with the request body
    Annotation.findByIdAndUpdate(req.params.annoId, {
        named_entities: req.body.named_entities,
        classes: req.body.classes,
        last_modified_date: new Date()
    }, {new: true, useFindAndModify: false})
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