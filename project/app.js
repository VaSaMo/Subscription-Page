var mysql = require('mysql2');

var bodyParser  = require("body-parser");

var express = require('express');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rapunzel345',
    database: 'projectNode'
});

app.get("/", function(req, res){

    //COUNT USERS
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(error, results){
        if(error) throw error;

        var total = results[0].count;
        //console.log(results);
        res.render("home",{data: total});
        
    });

    
});

app.post("/register",function(req,res){
    var person={
        email: req.body.email
    };

    var q='INSERT INTO users SET ?';
    connection.query(q, person, function(error, results){
        if(error) throw error;
        //console.log(results);
        res.render("subs");//HACER PAGINA DE SUSCRITO
    });

});
  

app.listen(8080, function(){
    console.log('Server running on 8080!');
});