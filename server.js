const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

var app = express();;
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));
// parse application/json
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.post('/data',function(req,res){
	var reqData = JSON.stringify(req.body);
	
	fs.writeFile('./assets/burger.json', JSON.stringify(reqData),function(err){
		if(err){
			throw err;
		}
		else{
			res.send("Your order has been placed successfully...");
		}
		
	});
	
});


app.listen('3001',function(err){
    if(err)
        console.log('Error while starting the port..');
    else{
        console.log('Server is running on port 3001...');
    }
});