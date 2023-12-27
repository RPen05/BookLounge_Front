<script>
import Logo from '../common/Logo.vue'
import RegModal from '../common/RegModal.vue'
import CatalogModal from '../common/CatalogModal.vue'

export default {
  components: {
    Logo,
    RegModal,
    CatalogModal,
  },
  data() {
    return {
      isRegModalOpen: false,
      isCatalogModalOpen: false,
    };
  },
  methods: {
    showRegModal() {
      this.isRegModalOpen = true;
    },

    showCatalogModal(){
      this.isCatalogModalOpen = true
    },

    emitBooks(category) {
      const categoryName = this.getCategoryName(category);
      this.$router.push({ name: 'category', params: { category, title: categoryName} });
    },
    getCategoryName(category) {
      // Возвращаем соответствующее название для категории
      // Можешь настроить это в соответствии с твоими требованиями
      switch (category) {
        case 'discountBooks':
          return 'Скидки';
        case 'newBooks':
          return 'Новинки';
        case 'allBooks':
          return 'Все книги';
        default:
          return '';
      }
    },
  },
};

</script>

<template>
  <nav class="navbar">
    <div class="navbar-menu-left">
      <Logo />
      <div class="navbar-menu-left-bottom">
        <ul class="navbar-lists">
          <router-link to="/stocks" class="navbar-list-title">
            <li class="navbar-list">Акции</li>
          </router-link>
          <router-link :to="{ name: 'category', params: { category: 'discountBooks'}}" @click="emitBooks('discount')" class="navbar-list-title">
            <li class="navbar-list">Скидки</li>
          </router-link>
          <router-link :to="{ name: 'category', params: { category: 'newBooks'}}" @click="emitBooks('new')" class="navbar-list-title" >
            <li class="navbar-list">Новинки</li>
          </router-link>
          <router-link :to="{ name: 'category', params: { category: 'allBooks' }}" @click="emitBooks('all')" class="navbar-list-title">
            <li class="navbar-list">Все книги</li>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="navbar-menu-center">
      <ul class="navbar-menu-center-items">
        <li class="navbar-menu-center-item">
          <div class="catalog-btn" @click="showCatalogModal">
            <img src="/src/assets/img/navbar/catalog.png" alt="" class="catalog-img">
          </div>
        </li>
        <li class="navbar-menu-center-item">
          <div class="search-box">
            <input type="text" class="search" name="" placeholder="Поиск по книге, автору, жанру и издательству">
          </div>
        </li>
        <li class="navbar-menu-center-item">
          <a href="#" class="search-btn"><img src="/src/assets/img/navbar/search.png" alt="" class="search-img"></a>
        </li>
      </ul>
    </div>
    <div class="navbar-menu-right">
      <ul>
        <div class="fav-icon">
          <a href="#" @click="showRegModal"><img src="/src/assets/img/navbar/user.png" alt=""></a>
        </div>
        <div class="fav-icon">
          <a href="#/favorite"><img src="/src/assets/img/navbar/favorite.png" alt=""></a>
        </div>
      </ul>
    </div>

    <RegModal v-model:showModal="isRegModalOpen"/>
    <CatalogModal v-model:show="isCatalogModalOpen"/>
  </nav>
</template>
<style scoped>
.catalog-btn{
  cursor: pointer;
}
.active {
  background-color: #f16d70; /* Цвет для выделенной вкладки */
  color: #fff; /* Цвет текста на выделенной вкладке, если нужно изменить */
}
</style>