import axios from 'axios';

const MAX_DELAY = 500;

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

const getProducts = () => get('/products');

const getProduct = (productId) => get(`/products/${productId}`);


export {
  getPromotions,
  getPromotion,
  getProducts,
  getProduct,
};
