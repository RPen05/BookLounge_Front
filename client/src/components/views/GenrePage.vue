<script>
import axios from "axios";
import Filter from '../common/Filter.vue';
import BookList from "../common/BookList.vue";
import MySelect from "../UI/MySelect.vue";
import FilterGenres from "../common/FilterGenres.vue";
import FilterSubgenre from "../common/FilterSubgenre.vue";
import MyBtnReturn from "../UI/MyBtnReturn.vue";
export default {
  components:{
    MyBtnReturn,
    MySelect,
    BookList,
    FilterGenres,
    Filter,
    FilterSubgenre,
  },
  props:{
    category:{
      type: String,
      required: true,
    },
    titleGenre:{
      type: String,
      required: true,
    },

  },
  data(){
    return{
      books:[],
      totalCount: 0,
      selectedSort: '',
      sortOptions:[
        {value:'news', name: 'По новизне'},
        {value:'priceHigh', name: 'По уменьшению цены'},
        {value:'priceLow', name: 'По увеличению цены'},
      ],
      page:1,
    };
  },
  mounted() {
    this.fetchBooks();
    console.log('category:', this.category);
    console.log('titleGenre:', this.titleGenre);
  },

  methods:{
    async fetchBooks() {
      try {
        const decodedTitleGenre = decodeURIComponent(this.titleGenre);
        const response = await axios.get(`http://localhost:3000/get-books/${this.category}?page=1&limit=20&genre=${decodedTitleGenre}&sort=${this.selectedSort || ''}`);
        console.log('decoded title: ', decodedTitleGenre)
        this.totalCount = response.data.totalCount;
        this.books = response.data.books;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    async loadMoreBooks() {
      try {
        this.page += 1;
        const decodedTitleGenre = decodeURIComponent(this.titleGenre);
        const response = await axios.get(`http://localhost:3000/get-books/${this.category}?page=${this.page}&limit=20&genre=${decodedTitleGenre}&sort=${this.selectedSort || ''}`);
        this.books = [...this.books, ...response.data.books];
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    handleSortChange(selectedSort){
      this.selectedSort = selectedSort;
      this.fetchBooks();
    },
  },
};
</script>

<template>
  <section class="container-books">
    <div class="top-content">
      <div class="content-title">
        <div class="title"><!-- {{ this.genre.name }} --></div>
        <div class="count-books">Найдено {{ totalCount }} книг</div>
      </div>
      <my-select v-model="selectedSort" :options="sortOptions" @update:modelValue="handleSortChange" />
    </div>
    <div class="content-books">
      <div class="accardeon-column">
        <MyBtnReturn>Назад</MyBtnReturn>
        <FilterSubgenre :name="titleGenre" />
        <Filter/>
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

</style>