<script>
import axios from "axios";
export default {
  data(){
    return{
      isAccordionOpenGenres: false,
      genres: [],
    };
  },
  created() {
    this.fetchGenres();
    // this.genres = [
    //   { id: 1, name: 'Боевики и триллеры'},
    //   { id: 2, name: 'Детективы'},
    //   // Добавь остальные жанры
    // ];
  },
  methods:{
    async fetchGenres() {
      try {
        const response = await axios.get(`http://localhost:3000/get-books/genres`);
        this.genres = response.data;
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    },
  },
};
</script>
<template>
  <div class="accardeon">
    <div class="accardeon-item">
      <input type="checkbox" class="accardeon-input" id="accardeon-1">
      <label for="accardeon-1" class="accardeon-title">Все книги
        <span class="arrow" v-if="isAccordionOpenGenres">&#9650;</span>
        <span class="arrow" v-else>&#9660;</span>
      </label>
      <div class="accardeon-content">
        <div v-for="genre in genres" :key="genre.id">
          <router-link :to="{name: 'genre', params: {titleGenre: genre.title}}">{{genre.title}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.accardeon {
  width: 300px;
  color: black;
}

.accardeon-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.accardeon-item label{
  font-size: 15px;
  color: #F16D70;
}

.accardeon-title {
  font-size: 16px;
  padding: 10px;
  cursor: pointer;
  display: block;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.accardeon-input {
  display: none;
}

.accardeon-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accardeon-content div a:hover{
  color: #F16D70;
  transition: color ease-in-out 0.2s;
}

.accardeon-content div{
  margin-left: 40px;
  margin-bottom: 20px;
  margin-top: 10px;
}

.accardeon-input:checked + .accardeon-title + .accardeon-content {
  max-height: 800px; /* Высота контента, которую ты можешь подогнать под свои нужды */
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
</style>