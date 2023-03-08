const express = require('express');
const con = require('./database');
const app = express();
const ejs = require('ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set("view engine",'ejs')
const path = require('path');
// console.log(__dirname)

console.log(path.join(__dirname  , '../client'))
const staticPath = path.join(__dirname  , '../client');
app.use(express.static(staticPath));
var id;
app.get('/', function(req, res) {
    con.query('SELECT name,email,amount,message,id FROM users', function(error, results) {
      if (error) throw error;    
        const data = JSON.stringify(results);
        ejs.renderFile(path.join(__dirname, '..', 'client', 'home.ejs'), {data: data}, function(err, str) {
        if (err) throw err;
        res.send(str);
        });
    });
  });


app.post('/', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var amount = req.body.amount;
    var message = req.body.message;
    // const id = req.query.id;
    console.log(name, email, amount, message,9);
    
    // if(results==null)
    // var sql = "INSERT INTO users (name, amount, message, email) VALUES ?";

    const sql = "UPDATE users SET name=?, amount=?, message=?, email=? WHERE id=?";
    const values = [name, amount, message, email, 9];
    // var values = [
    //   [name, amount, message, email]
    // ];
      con.query(sql, values, function(error, result) {
        console.log(error);
        res.send("Data inserted successfully");
      });
  
  });
  

app.listen(5000,function(){
    console.log('server is runnning on port 5000');
})