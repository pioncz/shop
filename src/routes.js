import Home from './pages/Home.vue';
import Product from './pages/Product.vue';

// Routes
const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/product',
    component: Product,
  },
  {
    path: '*',
    component: Product,
  },
];

export default routes;
