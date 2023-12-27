import { createApp } from 'vue'
import './style.css'
import './styles/navbar/navbar.css'
import './styles/footer.css'
import './styles/slider.css'
import App from './App.vue'
import router from './router';
// import store from './store.js';
import Navbar from './components/common/Navbar.vue'
import MainPage from './components/views/MainPage.vue'
import IFooter from './components/common/IFooter.vue'
import BookBlock from './components/common/BookBlock.vue'
import StocksPage from './components/views/StocksPage.vue';
import DetailsPage from './components/views/DetailsPage.vue';
import CategoryBookPage from './components/views/CategoryBookPage.vue'
import BookList from "./components/common/BookList.vue";
import MyBtnReturn from "./components/UI/MyBtnReturn.vue";
import VIntersection from "./directives/VIntersection.js";
import VFocus from "./directives/VFocus.js";
const app = createApp(App)
app.use(router);
app.directive('intersection', VIntersection);
app.directive('focus', VFocus);
// app.use(store);

app.component('MainPage', MainPage)
app.component('Navbar', Navbar)
app.component('IFooter', IFooter)
app.component('BookBlock', BookBlock)
app.component('StocksPage', StocksPage)
app.component('DetailsPage', DetailsPage)
app.component('CategoryBookPage', CategoryBookPage)
app.component('BoolList', BookList)
app.component('MyBtnReturn', MyBtnReturn)


app.mount('#app')
