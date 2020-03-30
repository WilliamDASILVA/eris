<template>
  <div class="victory h-screen flex">
    <div class="m-auto flex flex-col container">
      <img
        src="@/assets/eye_spin.gif"
        alt=""
        class="w-1/3 mx-auto"
      >
      <div
        class="text-5xl text-center font-bold text-white"
      >
        Vous avez rejoint l’Oeil
      </div>
      <p class="text-white text-center w-1/2 mx-auto text-2xl">
        Vous êtes sauvés. Vous avez collecté <span class="text-orange-500">{{ getPupilSum.wood }} bois & {{ getPupilSum.pepper }} poivrouilles</span> pour aider votre Tribu à atteindre l'Oeil.
      </p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  /**
   * @module component - victory
   */
  export default {
    name: 'victory',
    computed: {
      ...mapGetters([
        'getPupilSum'
      ])
    }
  }
</script>

<style>
  .victory {
    background-color: #2A1F2E;
    background: linear-gradient(180deg, rgba(42,31,46,1) 0%, rgba(31,24,33,1) 100%);
  }

  .victory img {
    image-rendering: pixelated;
  }
</style>

