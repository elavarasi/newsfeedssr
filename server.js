const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log(`listening on port ${port}`); 
});

app.use(express.static(__dirname + '/app'));

app.get('/',function(req,res) {
	res.sendFile(__dirname +  '/app/view/home.html');

});


