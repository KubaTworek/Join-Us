var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/style"));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'QAZwsx!@#45',
    database : 'join_us'
});

app.get("/", function(req, res){
    var q = 'SELECT Count(*) as count FROM users';
    connection.query(q, function(error,results){
        if(error) throw error;
        var count = results[0].count;
        res.render("home", {data: count});
    });
});

app.post('/register', function(req,res){
    var person = {email: req.body.email};
    var q =  'INSERT INTO users SET ?';
    connection.query(q, person, function(err, result) {
        res.redirect("/");
    });
});
app.listen(8888, function () {
    console.log('App listening on port 8888!');
});