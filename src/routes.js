import Home from './pages/Home.vue';
import Product from './pages/Product.vue';
import NotFound from './pages/NotFound.vue';
import Cart from './pages/Cart.vue';
import Category from './pages/Category.vue';
import Contact from './pages/Contact.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Search from './pages/Search.vue';
import Promotion from './pages/Promotion.vue';
import Admin from './pages/Admin.vue';

// Routes
const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      title: 'Shop - Home',
      metaTags: [
        {
          name: 'description',
          content: 'The home page of our example app.',
        },
        {
          property: 'og:description',
          content: 'The home page of our example app.',
        },
      ],
    },
  },
  {
    name: 'promotion',
    path: '/promotion/:id',
    component: Promotion,
    meta: {
      title: 'Shop - Promotion',
    },
  },
  {
    name: 'product',
    path: '/product',
    component: Product,
    meta: {
      title: 'Shop - Product',
    },
  },
  {
    name: 'cart',
    path: '/cart',
    component: Cart,
    meta: {
      title: 'Shop - Cart',
      secured: true,
    },
  },
  {
    name: 'category',
    path: '/category',
    component: Category,
    meta: {
      title: 'Shop - Category',
    },
  },
  {
    name: 'contact',
    path: '/contact',
    component: Contact,
    meta: {
      title: 'Shop - Contact',
    },
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      title: 'Shop - Login',
    },
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: {
      title: 'Shop - Register',
    },
  },
  {
    name: 'search',
    path: '/search',
    component: Search,
    meta: {
      title: 'Shop - Search',
    },
  },
  {
    name: 'admin',
    path: '/admin',
    component: Admin,
    meta: {
      title: 'Shop - Admin page',
    },
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      title: 'Shop - Not found',
    },
  },
];

export default routes;
