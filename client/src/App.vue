<script setup>

</script>

<template>
  <div>
    <header>
      <Navbar />
    </header>
    <body>
      <router-view/>
    </body>
    <footer>
      <IFooter />
    </footer>
  </div>
</template>

<style>
/* Ширина скроллбара */
::-webkit-scrollbar {
  width: 10px;
}

/* Цвет фона скроллбара */
::-webkit-scrollbar-track {
  background-color: #ffffff;
}

/* Цвет самой линии скроллбара */
::-webkit-scrollbar-thumb {
  background-color: #f16d70;
  border-radius: 12px;

}


/* Изменение формы линии скроллбара */
::-webkit-scrollbar-thumb:hover {
  background-color: #e5595c;
}

</style>
