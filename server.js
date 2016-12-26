var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
//parsing data
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//getting data from db
app.get('/contactlist', function(req,res) {
	db.contactlist.find(function (err,docs){
		res.json(docs);
	});
});

//inserting data to db
app.post('/contactlist', function(req,res) {
	db.contactlist.insert(req.body, function(err,doc) {
		res.json(doc);
		
	});
});

//deleting data from db
app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err, doc){
		res.json(doc);
	});
});

//getting data from db with specific ID
app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});

//modifying data
app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");