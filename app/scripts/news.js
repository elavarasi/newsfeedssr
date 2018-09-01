        const us = document.getElementById('us');
        const gb = document.getElementById('gb');
        const au = document.getElementById('au');
        const fr = document.getElementById('fr');
        const jp = document.getElementById('jp');
        const cn = document.getElementById('cn');

        function shownews() {
            let url = "https://elanewsfeedserver.herokuapp.com/news/us";
            switch(this.id) {
                case "au":
                    url = "https://elanewsfeedserver.herokuapp.com/news/au";
                    break;
                case "gb":
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

            fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                const news = result[0].news;    

                const newscontent = document.getElementById('newscontent');
                while (newscontent.firstChild) newscontent.removeChild(newscontent.firstChild);
                
                const newslist = document.createElement("ul");            
                for(let i=0; i < news.length; i++) {
                    const eachNews = document.createElement("li");
                    const newslink = document.createElement("a");                
                    newslink.setAttribute("href", news[i]["url"]);   
                    newslink.setAttribute("id", i);                                    
                    newslink.textContent = news[i].title;
                    eachNews.appendChild(newslink); 
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
        gb.addEventListener("click", shownews, false);
        jp.addEventListener("click", shownews, false);
        cn.addEventListener("click", shownews, false);
        fr.addEventListener("click", shownews, false);
        au.addEventListener("click", shownews, false);

