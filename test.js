const request = require('request');
request('https://newsapi.org/v2/top-headlines?country=US&category=business&apiKey=1d941fa3d7de451fa00e69a607e5f2a6', {json: true}, (err,res,body) => {
	console.log(body.articles);
	for(let i=0; i< body.articles.length; i++) {
		
	}
});