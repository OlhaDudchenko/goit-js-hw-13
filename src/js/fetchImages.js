//  export default function fetchImages(searchQuery,page) {

import axios from "axios";

   
//     const BASE_URL = 'https://pixabay.com/api/';
//     const API_KEY = "22121707-46a45fd40074b90b571e26051";
//     const q = searchQuery;
//     // let page = 1;
//     const url = `${BASE_URL}?key=${API_KEY}&q=${q}&image_type=photo&orientation = horizontal&safesearch = true&per_page=4&page${page}`;
    
//      return fetch(url)
//         .then(response => { return response.json() })
// }
 
const API_KEY = "22121707-46a45fd40074b90b571e26051";
const BASE_URL = 'https://pixabay.com/api/';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

    async fetchImages() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation = horizontal&safesearch = true&per_page=20&page${this.page}`;

        const response = await axios.get(url);
        console.log(response.data)
        return response;
    }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
