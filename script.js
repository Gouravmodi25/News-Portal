const API_KEY = "309e92e3e0ff4e53a46ddd7ec66beafb";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetch_api("India"));
async function fetch_api(query) {
  const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await response.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const cardContainer = document.getElementById("card-container");
  const templateNewsCard = document.getElementById("template-news-card");
  cardContainer.innerHTML = " ";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = templateNewsCard.content.cloneNode(true);
    filledData(article, cardClone);
    cardContainer.appendChild(cardClone);
  });
}
function filledData(article, cardClone) {
  const newsImage = cardClone.querySelector("#news-image");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImage.src = article.urlToImage;
  newsTitle.innerText = article.title;
  newsDesc.innerText = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerText = `${article.source.name} . ${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let currNav = null;
function onNavItem(id) {
  fetch_api(id);
  const navItem = document.getElementById(id);
  currNav?.classList.remove("active");
  currNav = navItem;
  currNav.classList.add("active");
}

const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");

searchButton.addEventListener("click", () => {
  const query = searchInput.value;
  if (!query) return;
  fetch_api(query);
  currNav?.classList.remove("active");
  currNav = null;
});
const companyLogo = document.querySelector("#company-logo");
companyLogo.addEventListener("click", () => {
  window.location.reload();
});
