  <script>
  import axios from "axios";

  export default {
    data(){
      return {
        genres: [],
        books:[],
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false,
      }
    },
    methods: {
      hideModal() {
        this.$emit('update:show', false);
      },
      async fetchGenres() {
        try {
          const response = await axios.get(`http://localhost:3000/get-books/genres`);
          this.genres = response.data;
        } catch (error) {
          console.error('Error fetching genres:', error);
        }
      },
      async fetchBooks() {
        try {
          const response = await axios.get(`http://localhost:3000/get-books/all?page=1&limit=12`);
          this.books = response.data.books;
        } catch (error) {
          console.error('Error fetching genres:', error);
        }
      },
    },
    created() {
      this.fetchGenres();
      this.fetchBooks();
    }
  }
  </script>

  <template>
    <div class="dialog" v-if="show" @click="hideModal">
      <div class="dialog-content">
        <div class="cols">
          <div class="col">
            <ul class="list1">
                <router-link v-for="(genre, index) in genres.slice(0, 7)" :key="index" :to="{ name: 'genrePage', params: {titleGenre: genre.title, category: 'all' }}">
                  <div class="genre">
                    {{ genre.title }}
                    <span class="arrow">&#9672;</span>
                  </div>
                </router-link>
            </ul>
          </div>
          <div class="col">
            <ul class="list2">
              <router-link v-for="(genre, index) in genres.slice(7, 14)" :key="index" :to="{ name: 'genrePage', params: {titleGenre: genre.title, category: 'all' }}">
                <div class="genre">
                  {{ genre.title }}
                  <span class="arrow">&#9672;</span>
                </div>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>

  <style scoped>
  body{
    position: relative;
  }

  .dialog {
    top: 0;
    bottom: 75px;
    left: 75px;
    right: 0;
    position: absolute;
    display: flex;
    z-index: 2;

  }

  .dialog-content {
    margin: auto;
    background: #ffffff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    min-width: 875px;
    min-height: 500px;
    border: 1px solid #cccccc;
    border-top: none;
  }

  .cols {
    display: flex;
    justify-content: space-around;
    font-size: 20px;
    color: black;
    margin-top: 10px;
  }

  .list1 .genre, .list2 .genre{
    margin-bottom: 30px;
    font-size: 22px;
    display: flex;
    justify-content: space-between;
    width: 300px;
  }

  .list1 .genre:hover, .list2 .genre:hover{
    color: #f16d70;
    transition: all 0.2s linear;
  }

  .list1 {
    margin-right: 80px;
    display: flex;
    flex-direction: column;
  }


  .list1 li:hover, .list2 li:hover {
    color: #f16d70;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

  }

  .list2 {
    margin-right: 30px;
    display: flex;
    flex-direction: column;
  }


  .arrow {
    right: 3%;
    top: 25%;

    transition: transform 0.3s ease;
    color: #F16D70;

  }

  </style>