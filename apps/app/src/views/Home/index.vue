<template>
  <div class="home flex h-screen">
    <div class="flex flex-col m-auto">
      <img
        src="@/assets/logo.svg"
        alt="Eris The Gatherer"
        class="mb-12"
      >

      <router-link
        to="/dialog/1"
        class="btn"
      >
        Commencer
      </router-link>
      <div class="text-white text-center mt-12 w-2/3 mx-auto">
        Mini-jeu réalisé par <a href="https://william.to/web" class="text-green-gradient underline hover:underline">William DA SILVA</a> pour le concours création d'Unexpected.
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  .home {
    background-color: #2A1F2E;
    background: linear-gradient(180deg, rgba(42,31,46,1) 0%, rgba(31,24,33,1) 100%);
  }
</style>
