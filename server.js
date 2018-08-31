const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');

app.listen(port, function() {
	console.log(`listening on port ${port}`); 
});

app.use(express.static(__dirname + '/app'));

app.get('/',function(req,response) {
	request('https://elanewsfeedserver.herokuapp.com/api/us', {json: true}, (err,res,body) => {
		if (err) {
			throw err;
		}
		let news = body[0].news;
        let list = '';
        for(let i=0; i<news.length; i++) {
        	list = `${list} <li>${news[i]}</li>`
        }

		let firsthalf = `<!DOCTYPE html><head><meta charset='UTF-8'><title>News</title><link rel='stylesheet' type='text/css' href='/styles/news.css'defer><link rel='shortcut icon' href='#' /><script type='text/javascript' src='/scripts/news.js' async></script></head>`
		let secondhalf = `<body><header class='home' role='banner'><div>News Headlines</div></header><div id='main-menu'><nav><ul class=' hidden-xs'><li class='us' id='us'><button>US</button></li><li class='europe' id='europe'><button>Europe</button></li><li class='middleeast' id='middleeast'><button>Middle East</button></li><li class='asia' id='asia'><button>Asia</button></li></ul></nav><section class='newslist' id='newslist'><div id='newscontent'><ul id='newslist'>${list}</ul></div></section></div></body></html>`
		response.send(firsthalf+secondhalf);
	})
});


