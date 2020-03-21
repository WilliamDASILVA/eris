<template>
  <div id="app">
    <div>
      <h1>
        Bob:
      </h1>
      <div>
        Wood: {{ getPupilWood }}
      </div>
      <div>
        Pepper: {{ getPupilPepper }}
      </div>
    </div>
    <div>
      <h1>
        Tribe:
      </h1>
      <div>
        Wood: {{ getTribeWood }}
      </div>
      <div>
        Pepper: {{ getTribePepper }}
      </div>
      <div>
        Progress: <progress
          max="100"
          :value="getTribeProgression"
        />
      </div>
    </div>
    <button
      type="button"
      :disabled="$wait.is('gathering wood')"
      @click="gather"
    >
      Gather wood
    </button>
    <button
      type="button"
      :disabled="$wait.is('unloading')"
      @click="bringWood"
    >
      Bring wood ({{ getCooldown.unload }} CD)
    </button>
    <div>
      <h2>
        The Eye
      </h2>
      <div>
        <ShopItem
          v-for="item in getEyeItems"
          :key="item.key"
          :item="item"
          @click.native="shop(item.key)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import ShopItem from '@/components/Shop/_subs/ShopItem'

  export default {
    name: 'App',
    components: {
      ShopItem
    },
    data () {
      return {
        interval: null,
      }
    },
    computed: {
      ...mapGetters([
        'getEyeItems',
        'getPupilWood',
        'getPupilPepper',
        'getTribeWood',
        'getTribePepper',
        'getCooldown',
        'getTribeProgression'
      ])
    },
    mounted () {
      this.interval = setInterval(() => {
        this.increasePupilResources()
        this.increaseTribeResources()
        this.decreaseTribeResources()
      }, 1000)
    },
    beforeDestroy () {
      if (this.interval) {
        clearInterval(this.interval)
      }
    },
    methods: {
      ...mapActions([
        'gather',
        'unload',
        'shop',
        'increasePupilResources',
        'increaseTribeResources',
        'decreaseTribeResources'
      ]),
      bringWood () {
        const { unload } = this.getCooldown
        this.$wait.start('unloading')
        this.unload()
        setTimeout(() => {
          this.$wait.end('unloading')
        }, unload)
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
