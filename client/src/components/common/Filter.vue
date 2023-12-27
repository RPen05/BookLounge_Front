<script>
import axios from "axios";
export default {
  data() {
    return {
      filters:[],
      selectedFilter: {},
      selectedFilters: [],
      isAccordionOpenFilters: false,
    };
  },
  created() {
    this.fetchFilter();
  },
  methods:{
    async fetchFilter() {
      try {
        const response = await axios.get(`http://localhost:3000/get-books/genres`);
        this.filters = response.data.map(filter => ({...filter, checked: false}));
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    },
    handleFilterChange() {
      this.$emit('filter-change', this.filters.filter(filter => filter.checked).map(filter => filter.title));
    },
  },
}
</script>
<template>
  <div class="accardeon">
    <div class="accardeon-item">
      <input type="checkbox" class="accardeon-input" id="accardeon-2">
      <label for="accardeon-2" class="accardeon-title">Фильтры
        <span class="arrow" v-if="isAccordionOpenFilters">&#9650;</span>
        <span class="arrow" v-else>&#9660;</span>
      </label>
      <div class="accardeon-content">
        <div v-for="filter in filters" :key="filter.id">
          <input type="checkbox" class="filter-input" :id="'filter' + filter.id" v-model="filter.checked" @change="handleFilterChange">
          <label :for="'filter' + filter.id" class="filter-title" :class="{ 'selected': filter.checked }">
            {{ filter.title }}</label>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>


.accardeon {
  width: 300px;
  color: black;
  position: relative;
}

.accardeon-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;

}

.accardeon-title {
  font-size: 16px;
  padding: 10px;
  cursor: pointer;
  display: block;
  width: 100%;
  box-sizing: border-box;
}

.accardeon-input {
  display: none;
}

.accardeon-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}


.accardeon-content div{
  margin-left: 40px;
  margin-bottom: 20px;
  margin-top: 10px;
}

.accardeon-content div label{
  font-size: 15px;
}
.accardeon-content div label:hover{
  color: #F16D70;
  cursor: pointer;
}

.accardeon-input:checked + .accardeon-title + .accardeon-content {
  max-height: 800px; /* Высота контента, которую ты можешь подогнать под свои нужды */
}
.accardeon-title {
  position: relative;
  cursor: pointer;
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



.filter-title {
  font-size: 14px;
  padding: 5px;
}
.filter-input {
  display: none;
}

.filter-input + label {
  position: relative;
  padding-left: 25px;
  cursor: pointer;
}

.filter-input + label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 15%;
  width: 15px; /* Размер квадратика */
  height: 15px; /* Размер квадратика */
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 8px;
}

.filter-input:checked + label:before {
  background-color: #F16D70; /* Цвет квадратика при выборе фильтра */
}
</style>