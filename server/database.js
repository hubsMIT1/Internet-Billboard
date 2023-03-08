const mysql = require('mysql');

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'blockonomics'

})
con.connect(function(error) {
    if (error) throw error;
    console.log("Connected to database.");
  
});

// define( 'DB_CHARSET', 'utf8' )

module.exports = con;