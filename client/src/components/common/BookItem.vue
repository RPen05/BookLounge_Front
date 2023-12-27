<script>
export default {
    props: {
        book: {
            type: Object,
            required: true,
            default: () => ({}),
        },
    },
  // mounted() {
  //   // console.log('Received book data:', this.book);
  // },
  // created() {
  //   // console.log('Book prop in BookItem:', this.book);
  //   // console.log('Details prop in BookItem:', this.book.details);
  //   // console.log('Details prop in BookItem:', this.book.details, 'isArray:', Array.isArray(this.book.details));
  // },
};
</script>

<template>
  <div class="item">
    <router-link :to="{ name: 'details', params: { id: book.id, bookTitle: book.title}, query: book.details[0] || {}}">
      <img v-if="book.details && book.details[0]" class="item-img" :src="book.details[0].image_cover" alt=""/>
    </router-link>
<!--    <div class="item-fav">-->
<!--      <a href="#">-->
<!--        <img src="/src/assets/img/sales/icons/fav.png" alt=""/>-->
<!--      </a>-->
<!--    </div>-->
    <div class="item-fav">
      <img class="fav-img" src="/src/assets/img/sales/icons/fav.png" alt=""/>
    </div>
    <div class="item-details">
      <div class="item-details-price">
        <span class="big-price">{{ book.details && book.details[0] ? book.details[0].price : '' }} руб.</span>
        <small v-if="book.details && book.details[0]" class="small-price">{{book.details[0].old_price !== null ? book.details[0].old_price + " руб." : "" }} </small>
      </div>
      <div class="item-title three_point">
        <router-link :to="{ name: 'details', params: { id: book.id, bookTitle: book.title}, query: book.details[0] || {}}">
          {{book.title }}
        </router-link>
      </div>
      <div class="item-details-author">{{ book.details && book.details[0] ? book.details[0].author : '' }}</div>
    </div>
  </div>
</template>

<style scoped>
.item {
    width: 220px;
    height: 485px;
    border-radius: 10px;
    box-sizing: border-box;
    margin: 20px 10px;
    position: relative;
}

.item:hover{

  box-shadow: 2px 2px 4px #9ca3af;
  scale: 101%;
  transition: all ease-in-out 0.1s;
}



.item img{
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

}

.item-img:hover .fav-img{
  opacity: 1;
}

.item-fav {
    position: absolute;
    background-color: #ffffff;
    padding: 12px 16px 12px 16px;
    border-radius: 5px;
    left: 70%;
    top: 2%;
    cursor: pointer;
  opacity: 0;
}

.item-fav:hover{
    background-color: #d5afb0;
    transition: background-color 0.2s linear;

}



.item-details {
    color: #000;
    display: flex;
    margin-left: 5px;
    flex-direction: column;
  height: 200px;
}

.item-details a {
    width: 220px;
    height: 50px;
    margin-bottom: 5px;
}

.item-title {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    white-space: nowrap;
}

.three_point {
    text-overflow: ellipsis;
    overflow: hidden;
}

.item-details-price {
    display: flex;
    margin-bottom: 30px;
    margin-right: 20px;
    margin-top: 15px;
  position: relative;
}

.item-details-price .small-price {
    position: absolute;
    text-decoration: line-through;
    left: 62%;
    top: 76.6%;
    color: #a09f9f;
    font-size: 15px;
}

.item-details-price .big-price {
    position: absolute;

    font-weight: bold;
    font-size: 20px;
}

.item-details p {
    color: #000;
    font-weight: 800;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.item-details .item-details-author {
    font-size: 15px;
    color: #a09f9f;

}


.item-img {
    width: 220px;
    height: 330px;
}


</style>
