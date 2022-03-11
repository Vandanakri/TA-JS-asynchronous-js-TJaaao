let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
let newsElm = document.querySelector('.news');
let select = document.querySelector('select');
let allNews = [];

function renderNews(news){
    newsElm.innerHTML = '';
    news.forEach((newsItem) => {
        let article = document.createElement('article');
        let img = document.createElement('img');
        img.src = newsItem.imageUrl;
        img.alt = newsItem.title;
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        h2.classList.add('source');
        h2.innerText = newsItem.newsSite;
        let p = document.createElement('p');
        p.innerText = newsItem.title;
        let a = document.createElement('a');
        a.href = newsItem.url;
        let button = document.createElement('button');
        a.append(button);
        button.innerText = 'Read More';
        div.append(h2, p, a);
        article.append(img, div);
        newsElm.append(article);
    });
}

function displayOptions(sources){
      sources.forEach((source) => {
          let option = document.createElement('option');
          option.innerText = source;
          option.value = source;
          select.append(option);
      });
}

fetch(url).then((res) => res.json()).then((news) => {
    console.log(news);
    allNews = news;
    renderNews(news);
    let allSources = Array.from(new Set(news.map((n) => n.newsSite)));
    displayOptions(allSources);
});

select.addEventListener('change',(event) => {
    let source = event.target.value.trim();
    if (source) {
       var filteredNews = allNews.filter((news) => news.newsSite === source);
    } else{
        filteredNews = allNews;
    }
    renderNews(filteredNews);
});