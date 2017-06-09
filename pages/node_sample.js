var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'root',  
  password : '',  
  database : 'uniondata'  
});  
connection.connect();  
  
connection.query('SELECT * FROM employee', function(err, rows, fields)   
{  
  if (err) throw err;  
  
  console.log(rows[0]);  
});  