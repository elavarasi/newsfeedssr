const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');

app.listen(port, function() {
	console.log(`listening on port ${port}`); 
});

app.use(express.static(__dirname + '/app'));

app.get('/',function(req,response) {
	request('https://elanewsfeedserver.herokuapp.com/news/us', {json: true}, (err,res,body) => {
		if (err) {
			throw err;
		}
		let news = body[0].news;
        let list = '';
        for(let i=0; i<news.length; i++) {
        	list = `${list} <li><a href=${news[i]["url"]}>${news[i].title}</a></li>`
        }

		let firsthalf = `<!DOCTYPE html><head><meta charset='UTF-8'><title>News</title><link rel='stylesheet' type='text/css' href='/styles/news.css'defer><link rel='shortcut icon' href='#' /><script type='text/javascript' src='/scripts/news.js' async></script></head>`
		let secondhalf = `<body onLoad="shownews()"><header class="home" role="banner"><div>News Headlines</div></header><div id="main-menu"><nav><ul class=" hidden-xs"><li class="us" id="us"><button>US</button></li><li class="gb" id="gb"><button>UK</button></li><li class="au" id="au"><button>Australia</button></li><li class="fr" id="fr"><button>France</button></li><li class="jp" id="jp"><button>Japan</button></li><li class="cn" id="cn"><button>China</button></li></ul></nav><section class="newslist" id="newslist"><div id="newscontent"></div></section>${list}</div></body>`
		response.send(firsthalf+secondhalf);
	})
});

