import axios from 'axios';

const MAX_DELAY = 2500;

const get = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  }, Math.random() * MAX_DELAY);
});

const getPromotions = () => get('/promotions');

const getPromotion = (promotionId) => get(`/promotions/${promotionId}`);

const getProducts = (options) => {
  const parsedOptions = Object.entries(options).map((option) => `${option[0]}=${option[1]}`);

  return get(`/products?${parsedOptions.join('&')}`);
};

const getSimilarProducts = () => get('/similarProducts');

const getProduct = (productId) => get(`/products/${productId}`);

const getCurrentUser = () => get('/currentUser');

// fake calls
const postUser = () => get('/currentUser');

const login = () => get('/currentUser');

const logout = () => get('/currentUser');

const postRating = () => get('/currentUser');

export {
  getCurrentUser,
  getPromotions,
  getPromotion,
  getProducts,
  getSimilarProducts,
  getProduct,
  postUser,
  login,
  logout,
  postRating,
};
