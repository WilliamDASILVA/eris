<template>
  <div class="gather-action">
    <ActionButton
      :icon="require('@/assets/gather_button.svg')"
      class="gather-action__button"
      @click.native="clicked"
    />
    <div
      class="gather-action__numbers"
    />
    <div class="gather-action__spirits">
      <img
        v-for="(spirit, k) in spirits"
        :key="k"
        :src="spirit.image"
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
    methods: {
      createParticle () {
        const particle = document.createElement('span')
        particle.className = 'gather-action__numbers__item'
        particle.innerHTML = '+1'
        particle.style.left = `${Math.random() * 177}px`
        particle.style.top = `${Math.random() * 177}px`

        const numbers = document.querySelector('.gather-action__numbers')
        numbers.appendChild(particle)

        setTimeout(() => {
          numbers.removeChild(particle)
        }, 1000)
      },
      clicked () {
        this.$emit('click')
        this.createParticle()
      }
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
        const spiritsTypes = {
          fruit_gatherer_spirit: require('@/assets/spirit_pepper.gif'),
          gatherer_spirit: require('@/assets/spirit.gif'),
          woodcutter_spirit: require('@/assets/spirit_wood.gif')
        }

        const spirits = this.getPupilSpirits
          .map((spirit, k) => ({
            left: (halfButtonSize - halfImageSize) + (Math.cos(circlePart * k + this.animationIterator) * (circleSpread)),
            top: (halfButtonSize - halfImageSize) + (Math.sin(circlePart * k + this.animationIterator) * (circleSpread)),
            image: spiritsTypes[spirit]
          }))

        return spirits
      }
    }
  }
</script>

<style lang="css">
  .gather-action__spirits,
  .gather-action__numbers {
    left: 0;
    top: 0;
    width: 177px;
    height: 177px;
    user-select: none;
    image-rendering: pixelated;
  }

  .gather-action__spirits,
  .gather-action__spirits__item,
  .gather-action__numbers,
  .gather-action__numbers__item {
    position: absolute;
    user-select: none;
    pointer-events: none;
  }

  .gather-action__numbers {
    top: -177px;
  }

  .gather-action__numbers__item {
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    text-shadow: 0 2px black;
    transition: opacity 500ms, transform 500ms ease-in-out;
    image-rendering: pixelated;
  }
</style>
