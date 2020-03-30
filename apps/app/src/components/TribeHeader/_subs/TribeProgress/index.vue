<template>
  <div class="tribe-progress">
    <div
      :style="{
        width: `${getTribeProgression}%`
      }"
      class="tribe-progress__progress"
    />
    <img
      class="tribe-progress__eye"
      src="@/assets/eye_spin.gif"
    />
    <img
      :style="{
        left: `calc(${getTribeProgression}% - 64px)`
      }"
      class="tribe-progress__caravan"
      src="@/assets/caravan.gif"
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  /**
   * @module component - TribeProgress
   */
  export default {
    name: 'TribeProgress',
    computed: {
      ...mapGetters([
        'getTribeProgression'
      ])
    }
  }
</script>

<style lang="css" scoped>
  .tribe-progress {
    position: relative;
    background-color: #2A1F2E;
    background-image: linear-gradient(0deg, #4D435A 0%, #2A1F2E 100%);
    width: 100%;
  }

  .tribe-progress,
  .tribe-progress__progress {
    position: relative;
    border-radius: 8px;
    height: 45px;
  }

  .tribe-progress__caravan,
  .tribe-progress__eye {
    position: absolute;
    top: -64px;
    image-rendering: pixelated;
  }

  .tribe-progress__eye {
    right: -64px;
    top: -40px;
  }
 
  .tribe-progress__progress {
    background-color: #49CBB0;
    background-image: linear-gradient(180deg, #49CBB0 0%, #287D77 100%);
    width: 0%;
    transition: width 200ms ease-in-out;
  }
</style>
