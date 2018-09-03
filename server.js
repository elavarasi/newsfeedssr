const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');
const router = express.Router();

app.listen(port, function() {
	console.log(`Listening on port ${port}`); 
});

app.use(express.static(__dirname + '/app'));

app.get('/', getHTML, (req, res) => { 
    return res.status(200).send(res.pagehtml); 
 });

app.get('/:country', getHTML, (req, res) => { 
    return res.status(200).send(res.pagehtml); 
});



function getHTML(req,res,next) {
	let newslist = '';
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let url = "https://elanewsfeedserver.herokuapp.com/news/us";
       switch(req.params.country) {
       	 case "au":
            url = "https://elanewsfeedserver.herokuapp.com/news/au";
            break;
		case "uk":
			url = "https://elanewsfeedserver.herokuapp.com/news/gb";
			break;
		case "fr":
			url = "https://elanewsfeedserver.herokuapp.com/news/fr";
			break;
		case "jp":
			url = "https://elanewsfeedserver.herokuapp.com/news/jp";
            break;
		case "cn":
			url = "https://elanewsfeedserver.herokuapp.com/news/cn";
            break;
        }

	request(url, {json: true}, (err,response,body) => {
		if (err) {
			throw err;
		}
		let news = body[0].news;
        for(let i=0; i<news.length; i++) {
        	const title = news[i]["title"];
            const description = news[i]["description"];
			var date = new Date(news[i]["publishedAt"]);
			let formatteddate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();

			if(title && description) {
				let eachNewsFeed = `
					<div class="col-md-6 card">
						<div class="row card-header mt-2 mr-1 mb-2 ml-1">
                            <div class="col-md-12">
                                <div>
                                    <h5 id="title"><a href="${news[i]["url"]}">${title}</a></h5>
                                     <p class="pb-1" id="description">${description}</p>
                                     <span class="font-italic">${formatteddate}</span>                          
                                 </div>        
                             </div>
                        </div>            
                     </div>`;                              
               newslist = newslist + eachNewsFeed
            }  
        }  
        res.pagehtml = getCountrySpecificHTML(req.params.country, newslist);
    	next();      
	});
 }

function getCountrySpecificHTML(country, newslist) {
	const activateUS = (country === 'us' || country === undefined) ? 'active': '';
	const activateUK = (country === 'uk') ? 'active' : '';
	const activateAU = (country === 'au') ? 'active' : '';
	const activateFR = (country === 'fr') ? 'active' : '';
	const activateJP = (country === 'jp') ? 'active' : '';
	const activateCN = (country === 'cn') ? 'active' : '';
	
      let pagehtml = `
    	<!DOCTYPE html>
			<head>
			    <meta charset="UTF-8">
			    <title>News</title>			   
			    <link rel="stylesheet" type="text/css" href="/styles/bootstrap.css" defer>
			    <link rel="stylesheet" type="text/css" href="/styles/main.css" defer>
			    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>			    
			</head>

			<body>
			    <div class="container-fluid mb-4">
			        <div class="row">
			            <div class="col bg-purple-dark text-center text-white"> 
			                <h2> 
			                    <span class="font-cursive">Ela's</span> News Hub
			                </h2>          
			            </div>
			        </div>       
			        <div class="row">
			            <div class="col bg-purple text-white"> 
			                <ul class="nav nav-tabs justify-content-center">
			                  <li class="nav-item" id="us">
			                    <a class="nav-link ${activateUS}" href="/us">US</a>
			                  </li>
			                  <li class="nav-item" id="uk">
			                    <a class="nav-link  ${activateUK}" href="/uk">UK</a>
			                  </li>
			                  <li class="nav-item" id="au">
			                    <a class="nav-link ${activateAU}" href="/au">Australia</a>
			                  </li>
			                  <li class="nav-item" id="fr">
			                    <a class="nav-link ${activateFR}" href="/fr">France</a>
			                  </li>
			                  <li class="nav-item" id="jp">
			                    <a class="nav-link ${activateJP}" href="/jp">Japan</a>
			                  </li>
			                  <li class="nav-item" id="cn">
			                    <a class="nav-link  ${activateCN}" href="/cn">China</a>
			                  </li>
			                </ul>         
			            </div>
			        </div>
			    </div>

			    <div class="container" id="container">
			        <div class="row id="newscontent">
			         	${newslist}
			        </div>
			    </div> 

			    <div class="container-fluid mt-4">
			        <div class="row">
			            <div class="col bg-purple-dark text-center text-white"> 
			                <span>Made with &hearts;</span> 
			            </div>
			        </div> 
			    </div>
			</body>
		</html>`

	return pagehtml;
}