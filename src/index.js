import {Notify} from "notiflix";
import photoCard from './templates/photoCard.hbs';
import SimpleLightbox from "simplelightbox";
import  NewsApiService  from './js/fetchImages';
import './css/style.css';
import "../node_modules/simplelightbox/src/simple-lightbox.scss";
const lightbox = new SimpleLightbox('.gallery a');

const imageBox = document.querySelector(".gallery");
const buttonSearch = document.querySelector(".search-form");
const buttonLoadMore = document.querySelector(".load-more");

buttonSearch.addEventListener("submit", onSearch);
buttonLoadMore.addEventListener("click", onLoadMore);

const newsApiService = new NewsApiService();
function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  if (newsApiService.query.trim() === '') {
    return ;
  }

    
    newsApiService.resetPage();
    clearImagesContainer();
    hideBtnLoadMore();
    fetchImages();
    lightbox.refresh();
}

 async function fetchImages() {
     try {
        const data = await newsApiService.fetchImages();
        const { data: { hits }, data: { totalHits } } = data;
         
        renderImagesMarkup(hits);
        showBtnLoadMore();
        lightbox.refresh();
        
         if (hits.length === 0) {
            hideBtnLoadMore();
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
       }
       Notify.info(`Hooray! We found ${totalHits} images.`);
        
     }
     catch (error) {
        console.log("Error: ", error)
    };
};
   
async function onLoadMore() {
    
     try {
        const data = await newsApiService.fetchImages();
        const { data: { hits }, data: {totalHits }} = data;
        renderImagesMarkup(hits);
        showBtnLoadMore();
        lightbox.refresh()

        const totalPages = totalHits/newsApiService.limit;
         console.log(totalPages);
         if (newsApiService.page>totalPages) {
            hideBtnLoadMore();
            Notify.failure("We're sorry, but you've reached the end of search results.");
           
         };
    }
     
     catch (error) {
         console.log("Error: ", error);
        };
};

function renderImagesMarkup(hits) {
    imageBox.insertAdjacentHTML("beforeend",photoCard(hits));
}

function clearImagesContainer() {
  imageBox.innerHTML = '';
}


function showBtnLoadMore() {
    buttonLoadMore.classList.remove("load-more");
    buttonLoadMore.classList.add("is-visible"); 
};


function hideBtnLoadMore() {
    buttonLoadMore.classList.remove("is-visible");
    buttonLoadMore.classList.add("load-more");
}