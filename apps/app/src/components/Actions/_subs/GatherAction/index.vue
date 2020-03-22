<template>
  <div class="gather-action">
    <ActionButton
      :icon="require('@/assets/gather_button.svg')"
      class="gather-action__button"
      @click.native="$emit('click')"
    />
    <div class="gather-action__spirits">
      <img
        v-for="(spirit, k) in spirits"
        :key="k"
        :src="require('@/assets/spirit.gif')"
        :style="{
          transform: `translate3d(${spirit.left}px, ${spirit.top}px, 0)`
        }"
        class="gather-action__spirits__item"
        alt=""
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import ActionButton from './../ActionButton'

  /**
   * @module component - GatherAction
   */
  export default {
    name: 'GatherAction',
    components: {
      ActionButton
    },
    data () {
      return {
        animationInterval: null,
        animationIterator: 0
      }
    },
    mounted () {
      this.animationInterval = setInterval(() => {
        this.animationIterator += (Math.PI * 2) / 180
      }, 200)
    },
    beforeDestroy () {
      if (this.animationInterval) clearInterval(this.animationInterval)
    },
    computed: {
      ...mapGetters([
        'getPupilSpirits'
      ]),
      spirits () {
        const circlePart = ((Math.PI * 2) / this.getPupilSpirits.length)
        const halfButtonSize = 88.5
        const circleSpread = halfButtonSize + 32
        const halfImageSize = 16

        const spirits = this.getPupilSpirits
          .map((_, k) => ({
            left: (halfButtonSize - halfImageSize) + (Math.cos(circlePart * k + this.animationIterator) * (circleSpread)),
            top: (halfButtonSize - halfImageSize) + (Math.sin(circlePart * k + this.animationIterator) * (circleSpread))
          }))

        return spirits
      }
    }
  }
</script>

<style lang="css" scoped>
  .gather-action__spirits {
    left: 0;
    top: 0;
    width: 177px;
    height: 177px;
    user-select: none;
  }

  .gather-action__spirits,
  .gather-action__spirits__item {
    position: absolute;
    user-select: none;
    pointer-events: none;
  }
</style>
