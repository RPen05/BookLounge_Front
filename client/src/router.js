import { createRouter, createWebHistory } from 'vue-router';
import MainPage from './components/views/MainPage.vue';
import StocksPage from './components/views/StocksPage.vue';
import DetailsPage from './components/views/DetailsPage.vue';
import CategoryBookPage from './components/views/CategoryBookPage.vue'
import GenrePage from "./components/views/GenrePage.vue";

const routes = [
  { path: '/', component: MainPage },
  { path: '/stocks', component: StocksPage },
  { path: '/details/:id/:bookTitle', name: 'details', component: DetailsPage, props: true },
  {
    path: '/category/:category',
    name: 'category',
    component: CategoryBookPage,
    props: route => ({
      category: route.params.category,
      title: route.params.title,
    }),
  },
  {
    path: '/category/:category/:titleGenre',
    name: 'genre',
    component: GenrePage,
    props: route => ({
      category: route.params.category,
      titleGenre: encodeURIComponent(route.params.titleGenre) ,
    }),
  },
  {
    path: '/category/:category/:titleGenre',
    name: 'genrePage',
    component: GenrePage,
    props: route => ({
      category: 'all',
      titleGenre: encodeURIComponent(route.params.titleGenre),
    })
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;