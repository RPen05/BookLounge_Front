<script>

</script>

<template>

    <router-link :to="{name: 'category'}">
      <div class="btn-return">
        <slot class="slot"></slot>
        <span class="arrow">&#9664;</span>
      </div>
    </router-link>

</template>

<style scoped>
  .btn-return{
    border: 1px solid #cccccc;
    margin-bottom: 10px;
    border-radius: 4px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    cursor: pointer;
    color: #f16d70;
    position: relative;
  }

  .btn-return:hover{
    box-shadow: 1px 1px 4px #cccccc;
    transition: box-shadow 0.2s ease-in-out  ;
  }

  .arrow {
    position: absolute;
    right: 3%;
    top: 25%;

    transition: transform 0.3s ease;
    color: #F16D70;

  }

</style>