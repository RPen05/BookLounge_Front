<script>
import BookItem from '../common/BookItem.vue'

export default {
  components: {
    BookItem,
  },
  props: {
    books: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<template>
  <section class="container-block">
    <div class="items">
      <BookItem v-for="book in books" :key="book.id" :book="{ id: book.id, title: book.title, details: book.details }" />
    </div>
  </section>
</template>

<style scoped>
.container-block{
  width: 100%;
  margin-top: -20px;
  background-color: #ffffff;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 100px;
}

.container-block a:hover{
  color: #000;
}

.container-block ul{
  list-style: none;
}

.container-block a{
  text-decoration: none;
}


.items{
  display: flex;
  justify-content:space-around;
  flex-wrap: wrap;

}
</style>