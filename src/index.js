import {Notify} from "notiflix";
import axios from 'axios';
import photoCard from './templates/photoCard.hbs';

import  NewsApiService  from './js/fetchImages';

import './css/style.css';


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

    buttonLoadMore.classList.remove("load-more");
    buttonLoadMore.classList.add("is-visible");
    newsApiService.resetPage();
    clearImagesContainer();
    fetchImages();

}

 async function fetchImages() {
  buttonLoadMore.disable=true;
     try {
        
        const data = await newsApiService.fetchImages();
        const { data: { hits }, data: {totalHits }} = data;
        renderImagesMarkup(hits);
        Notify.info(`Hooray! We found ${totalHits} images.`);
        buttonLoadMore.disable=false;
        

     if (hits.length === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
       }
     }
     
     catch (error) {
        console.log("Error: ", error)
        };
  
};
   
async function onLoadMore() {
    buttonLoadMore.disable=true;
     try {
        
        const data = await newsApiService.fetchImages();
        const { data: { hits }, data: {totalHits }} = data;
        renderImagesMarkup(hits);
        
        buttonLoadMore.disable=false;
        
  
        const totalPages = totalHits - (newsApiService.limit+=1);
        if (totalPages <= 0) {
            Notify.failure("We're sorry, but you've reached the end of search results.");
             buttonLoadMore.classList.remove("is-visible");
             buttonLoadMore.classList.add("load-more");
         };
     }
     
     catch (error) {
        
        console.log("Error: ", error)
        };
  
}

function renderImagesMarkup(hits) {
    imageBox.insertAdjacentHTML("beforeend",photoCard(hits));
}

function clearImagesContainer() {
  imageBox.innerHTML = '';
}


