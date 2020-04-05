import axios from 'axios';

const MAX_DELAY = 4000;

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

const getProduct = (productId) => get(`/products/${productId}`);

export {
  getPromotions,
  getPromotion,
  getProduct,
};
