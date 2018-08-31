        const us = document.getElementById('us');
        const europe = document.getElementById('europe');
        const middleeast = document.getElementById('middleeast');
        const asia = document.getElementById('asia');

        function shownews() {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            let url;
            switch(this.id) {
                case "us":
                    url = "https://elanewsfeedserver.herokuapp.com/api/us";
                    break;
                case "europe":
                    url = "https://elanewsfeedserver.herokuapp.com/api/europe";
                    break;
                case "middleeast":
                    url = "https://elanewsfeedserver.herokuapp.com/api/middleeast";
                    break;
                case "asia":
                    url = "https://elanewsfeedserver.herokuapp.com/api/asia";
                    break;
            }

            fetch(proxyurl + url, {     
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                const newscontent = document.getElementById('newscontent');
                const news = result[0].news;    
                const newslist = document.createElement("ul");
                // const newslist = document.getElementById("newslist");
                
                for(let i=0; i < news.length; i++) {
                    const eachNews = document.createElement("li");
                    eachNews.textContent = news[i];
                    newslist.appendChild(eachNews);    
                }
                newscontent.appendChild(newslist);
            })
            .catch((err) => {
                console.log("Error is");
                console.log(err);
            })

        }

        us.addEventListener("click", shownews, false);
        europe.addEventListener("click", shownews, false);
        middleeast.addEventListener("click", shownews, false);
        asia.addEventListener("click", shownews, false);



