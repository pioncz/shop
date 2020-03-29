import Home from './pages/Home.vue';
import Product from './pages/Product.vue';
import NotFound from './pages/NotFound.vue';
import Cart from './pages/Cart.vue';
import Category from './pages/Category.vue';
import Contact from './pages/Contact.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Search from './pages/Search.vue';

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
    path: '/cart',
    component: Cart,
  },
  {
    path: '/category',
    component: Category,
  },
  {
    path: '/contact',
    component: Contact,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
