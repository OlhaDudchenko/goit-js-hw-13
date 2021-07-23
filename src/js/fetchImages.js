

import axios from "axios";

 
const API_KEY = "22121707-46a45fd40074b90b571e26051";
const BASE_URL = 'https://pixabay.com/api/';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.limit = 40;
      
    }

    async fetchImages() {
    const url = `${BASE_URL}?q=${this.searchQuery}&page=${this.page}&key=${API_KEY}&image_type=photo&safesearch=true&orientation=horizontal&per_page=${this.limit}`;
    const response = await axios.get(url);
    this.incrementPage()
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
