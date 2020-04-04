import axios from 'axios';

const MAX_DELAY = 4000;

const get = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.get(url)
      .then((response) => {
      // handle success
        resolve(response.data);
      })
      .catch((error) => {
      // handle error
        reject(error);
      });
  }, Math.random() * MAX_DELAY);
});

const getPromotions = () => get('/promotions');


const getProduct = () => [];

export {
  getPromotions,
  getProduct,
};
