<script>
  //import axios from "axios";
  export default {
    data(){
      return{
        isAccordionOpenSubgenres: false,
        subgenres:[],
      };
    },
    props:{
      name:{
        type:String,
        required:true,
      }
    },
    created() {
      //this.fetchSubgenres();
      this.subgenres = [
        { id: 1, name: 'Военные боевики'},
        { id: 2, name: 'Зарубежные боевики'},
      ]
    },
    methods:{
      // async fetchSubgenres(){
      //   try{
      //     const response = await axios.get(`http://localhost:3000/get-genres`);
      //     this.subgenres = response.data;
      //   } catch (error)  {
      //     console.error('Error fetching subgenres: ', error);
      //   }
      // },
    },
  };
</script>

<template>
  <div class="accardeon">
    <div class="accardeon-item">
      <input type="checkbox" class="accardeon-input" id="accardeon-3">
      <label for="accardeon-3" class="accardeon-title">{{decodeURIComponent(this.name)}}
        <span class="arrow" v-if="isAccordionOpenSubgenres">&#9650;</span>
        <span class="arrow" v-else>&#9660;</span>
      </label>
      <div class="accardeon-content">
        <div v-for="subgenre in subgenres" :key="subgenre.id">
<!--          <router-link :to="{name: 'subgenre', params: {name: subgenre.name}}">{{subgenre.name}}</router-link>-->
          <a href="#">{{ subgenre.name }}</a>
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