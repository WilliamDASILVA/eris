<template>
  <button
    :style="{
      width: `${size}px`,
      height: `${size}px`
    }"
    class="action-button"
    type="button"
  >
    <span class="action-button__dot" />
    <span class="action-button__dot" />
    <span class="action-button__dot" />
    <span class="action-button__dot" />
    <span class="action-button__dot" />
    <span class="action-button__dot" />
    <span class="action-button__dot" />
    <span class="action-button__dot" />

    <img
      class="action-button__image"
      :src="icon"
      alt=""
    >

    <vue-circle
      v-if="loading"
      ref="progress"
      :progress="loadingProgression"
      :start-angle="-Math.PI/2"
      :fill="{ color: '#23BEE0' }"
      :size="size"
      :show-percent="false"
      :show-legend="false"
      :thickness="8"
      :animation="{ duration: 50, easing: 'circleProgressEasing' }"
      line-cap="round"
    />
  </button>
</template>

<script>
  import VueCircle from 'vue2-circle-progress/src/index.vue'

  /**
   * @module component - ActionButton
   */
  export default {
    name: 'ActionButton',
    components: {
      VueCircle
    },
    props: {
      icon: {
        type: String,
        required: true
      },
      size: {
        type: [String, Number],
        default: 177
      },
      loading: {
        type: Boolean,
        default: false
      },
      loadingProgression: {
        type: Number,
        default: 0
      }
    },
    watch: {
      loadingProgression (v) {
        this.$refs.progress.updateProgress(v)
      }
    }
  }
</script>

<style lang="css" scoped>
  .action-button {
    position: relative;
    appearance: none;
    height: 177px;
    width: 177px;
    border-radius: 100%;
    padding: 0;
    cursor: pointer;
    border: 8px solid #4F4459;
    outline: none;
    transition: transform 200ms ease-in-out;

    background-color: #4D435A;
    background-image: linear-gradient(180deg, #4D435A 0%, #3B2D3F 100%);
  }

  .action-button:hover:not(:disabled) {
    background-color: #4D435A;
    background-image: linear-gradient(180deg, #685E74 0%, #443748 100%);
    transform: scale(1.02);
  }

  .action-button:active:not(:disabled) {
    background-color: #4D435A;
    background-image: linear-gradient(0deg, #685E74 0%, #443748 100%);
    transform: scale(1);
  }

  .action-button__image {
    transition: filter 200ms;
  }

  .action-button:disabled {
    cursor: not-allowed;
  }

  .action-button:disabled .action-button__image {
    filter: grayscale(1);
  }

  .action-button__dot {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #5A4D66;
    z-index: 10;
  }

  .action-button__dot:nth-child(1) {
    left: calc(50% - 4px);
    top: -4px;
  }

  .action-button__dot:nth-child(2) {
    left: calc(85% - 4px);
    top: calc(15% - 4px);
  }

  .action-button__dot:nth-child(8) {
    left: calc(15% - 4px);
    top: calc(15% - 4px);
  }

  .action-button__dot:nth-child(4) {
    left: calc(85% - 4px);
    bottom: calc(15% - 4px);
  }

  .action-button__dot:nth-child(6) {
    left: calc(15% - 4px);
    bottom: calc(15% - 4px);
  }

  .action-button__dot:nth-child(5) {
    left: calc(50% - 4px);
    bottom: -4px;
  }

  .action-button__dot:nth-child(3) {
    top: calc(50% - 4px);
    right: -4px;
  }

  .action-button__dot:nth-child(7) {
    top: calc(50% - 4px);
    left: -4px;
  }

  .circle {
    position: absolute;
    left: -8px;
    top: -8px;
    user-select: none;
    pointer-events: none;
  }
</style>
