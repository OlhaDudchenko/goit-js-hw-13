import {Notify} from "notiflix";
import axios from 'axios';
import photoCard from './templates/photoCard.hbs';
// import  fetchImages  from './js/fetchImages';
import  NewsApiService  from './js/fetchImages';

import './css/style.css';


const imageBox = document.querySelector(".gallery");
const buttonSearch = document.querySelector(".search-form");
const buttonLoadMore = document.querySelector(".load-more");


buttonSearch.addEventListener("submit", onSearch);
buttonLoadMore.addEventListener("click", fetchImages);
// buttonLoadMore.addEventListener("click", onLoadMore);

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
        newsApiService.incrementPage();
        buttonLoadMore.disable=false;
      
       if (hits.length === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
       }
        if (newsApiService.page > totalHits) {
             buttonLoadMore.classList.remove("is-visible");
            buttonLoadMore.classList.add("load-more");
            console.log("Hooray! We found totalHits images.");
        }
         }
        catch(error){
        console.log("Error: ", error)
    };
  
};
    // async function onLoadMore() {
    //      buttonLoadMore.disable=true;
    // try {
    //     const data = await newsApiService.fetchImages();
    //     const { data: { hits }, data: {totalHits }} = data;
    //     console.log(hits);
    //     dataState = [...dataState,...hits];
    //     renderImagesMarkup(hits);
    //     newsApiService.incrementPage();
    //     buttonLoadMore.disable=false;
      
    //    if (hits.length === 0) {
    //         Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    //    }
    //     if (newsApiService.page > totalHits) {
    //          buttonLoadMore.classList.remove("is-visible");
    //         buttonLoadMore.classList.add("load-more");
    //         console.log("Hooray! We found totalHits images.");
    //     }
    //      }
    //     catch(error){
    //     console.log("Error: ", error)
    // };
  
    //  }

function renderImagesMarkup(hits) {
    imageBox.insertAdjacentHTML("beforeend",photoCard(hits));
    console.log( imageBox)
}

function clearImagesContainer() {
  imageBox.innerHTML = '';
}

// let searchQuery = '';
// let page = 1;

// // console.log(searchQuery)
// function onSearch(e) {
//     e.preventDefault();
    
//     searchQuery = e.target.elements.searchQuery.value;
//     console.log(searchQuery);
//      if (searchQuery === "" ) {
    
//     return alert('Введи что-то нормальное');
//      }
//     //  imageBox.innerHTML = '';
//     fetchImages(searchQuery,page).then(hits => {
//         console.log(hits);
//         renderPhotoCard(hits);
        
//         if (hits.length === 0) {
            
//              Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//          }
        
//     }).catch(error => {
        
//         console.log("Error: ", error)
//     });

// }
// console.log(searchQuery)

// function renderPhotoCard(hits) {
//     const murkup = photoCard(hits);
//     imageBox.innerHTML = murkup;
// };

// function onLoadMore(searchQuery,page) {
//     console.log(searchQuery)
//     fetchImages(searchQuery).then(hits => {
//         page += 1;
//         console.log(hits);
//         renderPhotoCard(hits);
        
//         // if (data.hits.length === 0) {
            
//         //      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//         //  }
        
//     }).catch(error => {
        
//         console.log("Error: ", error)
//     });
// }