import * as axios from 'axios';
import { deleteCatalogProduct } from '../reducers/catalog-reducer';

const apiKey = 'AIzaSyCjxNhG8gRa6tYdsO9ritXdsRTNE85C0wE';
const baseURL = 'https://web-app-catalog.firebaseio.com/catalog';


export const catalogAPI = {
  
  getCatalogData() {
    return axios.get(`${baseURL}.json`);
  },

  deleteCatalogProduct(id) { 
    return axios.delete(`${baseURL}/${id}.json`);
  },

  addProduct(body, id) {
    return axios.put(`${baseURL}/${id}.json`, body)
  }
}

export const authApi = {
  login(email, password, returnSecureToken) {
    return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {email, password, returnSecureToken});
  }
};


 