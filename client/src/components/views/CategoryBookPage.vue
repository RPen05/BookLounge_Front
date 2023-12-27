<script>
import FilterGenres from '../common/FilterGenres.vue';
import Filter from '../common/Filter.vue';
import axios from "axios";
import BookList from "../common/BookList.vue";
import MySelect from "../UI/MySelect.vue";


export default {
  components: {
    MySelect,
    BookList,
    FilterGenres,
    Filter,
  },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      books: [],
      totalCount: 0,
      selectedSort: '',
      sortOptions:[
        {value:'news', name: 'По новизне'},
        {value:'priceHigh', name: 'По уменьшению цены'},
        {value:'priceLow', name: 'По увеличению цены'},
      ],
      page: 1,
      titleFilters: [],
      categoryTitle: '',
    };
  },
  created() {
    this.fetchBooks();
  },
  watch: {
    category: 'fetchBooks',
    titleFilters: {
      handler: 'fetchBooksWithDelay',
      deep: true,
    },
    selectedFilters: 'fetchBooks',
  },
  methods:{
    async fetchBooks() {
      try {
        this.categoryTitle = this.getCategoryLabel(this.category);
        const response = await axios.get(`http://localhost:3000/get-books/${this.category}?page=1&limit=20&sort=${this.selectedSort || ''}`);
        console.log(`Count: `, this.books);
        this.totalCount = response.data.totalCount;
        this.books = response.data.books;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    async fetchBooksWithDelay() {
      // Задержка перед отправкой запроса на сервер
      setTimeout(async () => {
        try {
          this.categoryTitle = this.getCategoryLabel(this.category);
          const response = await axios.get(`http://localhost:3000/get-books/${this.category}?page=1&limit=20&sort=${this.selectedSort || ''}&genre=${this.titleFilters.join(',')}`);
          this.totalCount = response.data.totalCount;
          this.books = response.data.books;
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      }, 1000);
    },
    async loadMoreBooks() {
      try {
        this.page += 1;
        const response = await axios.get(`http://localhost:3000/get-books/${this.category}?page=${this.page}&limit=20&sort=${this.selectedSort || ''}`);
        console.log(`Count: `, this.books);
        this.books = [...this.books, ...response.data.books];
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    getCategoryLabel(categoryName) {
      switch (categoryName) {
        case 'discount':
          return 'Скидки';
        case 'new':
          return 'Новинки';
        case 'all':
          return 'Все книги';
        default:
          return this.categoryTitle;
      }
    },
    handleSortChange(selectedSort){
      this.selectedSort = selectedSort;
      this.fetchBooksWithDelay();
    },
    handleFilterChange(titleFilters){
      this.titleFilters = titleFilters;
    },
  },

}
</script>

<template>

  <section class="container-books">
    <div class="top-content">
      <div class="content-title">
        <div class="title">{{ getCategoryLabel(category) }}</div>
        <div class="count-books">Найдено {{ totalCount }} книг</div>
      </div>
      <my-select v-model="selectedSort" :options="sortOptions" @update:modelValue="handleSortChange" />
    </div>
    <div class="content-books">
      <div class="accardeon-column">
        <FilterGenres/>
        <Filter @filter-change="handleFilterChange"/>
      </div>
      <BookList :books="books"/>
    </div>
    <div v-intersection="loadMoreBooks" class="observer"></div>
  </section>

</template>

<style scoped>
.top-content{
  display: flex;
  justify-content: space-between;
}

.top-content{
  margin-bottom: 100px;
  width: 1440px;
}

.content-books{
  display: flex;
  justify-content: space-between;

}

.accardeon-item label{
  color: #F16D70;
}


.accardeon-content div{
  margin-bottom: 20px;
}

.accardeon-content div a:hover{
  color: #F16D70;
  transition: color ease-in-out 0.2s;
}

.accardeon-input:checked + .accardeon-title + .accardeon-content {
  display: block;
}

.accardeon-input:checked + .accardeon-title .arrow {
  transform: rotate(180deg);
}

.arrow {
  position: absolute;
  right: 3%;
  top: 25%;

  transition: transform 0.3s ease;
  color: #F16D70;

}

.count-books{
  font-size: 22px ;
  margin-top: 22px;
}
</style>