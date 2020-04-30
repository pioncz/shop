import HomePage from './pages/HomePage.vue';
import ProductPage from './pages/ProductPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';
import CartPage from './pages/CartPage.vue';
import CategoryPage from './pages/CategoryPage.vue';
import ContactPage from './pages/ContactPage.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import SearchPage from './pages/SearchPage.vue';
import PromotionPage from './pages/PromotionPage.vue';
import AdminPage from './pages/AdminPage.vue';

// Routes
const routes = [
  {
    name: 'home',
    path: '/',
    component: HomePage,
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
    component: PromotionPage,
    meta: {
      title: 'Shop - Promotion',
    },
  },
  {
    name: 'product',
    path: '/product/:id',
    component: ProductPage,
    meta: {
      title: 'Shop - Product',
    },
  },
  {
    name: 'cart',
    path: '/cart',
    component: CartPage,
    meta: {
      title: 'Shop - Cart',
      secured: true,
    },
  },
  {
    name: 'category',
    path: '/category',
    component: CategoryPage,
    meta: {
      title: 'Shop - Category',
    },
  },
  {
    name: 'contact',
    path: '/contact',
    component: ContactPage,
    meta: {
      title: 'Shop - Contact',
    },
  },
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
    meta: {
      title: 'Shop - Login',
    },
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterPage,
    meta: {
      title: 'Shop - Register',
    },
  },
  {
    name: 'search',
    path: '/search',
    component: SearchPage,
    meta: {
      title: 'Shop - Search',
    },
  },
  {
    name: 'admin',
    path: '/admin',
    component: AdminPage,
    meta: {
      title: 'Shop - Admin page',
    },
  },
  {
    path: '*',
    component: NotFoundPage,
    meta: {
      title: 'Shop - Not found',
    },
  },
];

export default routes;
