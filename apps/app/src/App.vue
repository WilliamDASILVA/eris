<template>
  <div id="app">
    <TribeHeader />
    <Actions />
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
      <div>
        Max capacity: {{ getPupilMaxCapacity }}
      </div>
    </div>
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

  import TribeHeader from '@/components/TribeHeader'
  import Actions from '@/components/Actions'
  import ShopItem from '@/components/Shop/_subs/ShopItem'

  export default {
    name: 'App',
    components: {
      TribeHeader,
      Actions,
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
        'getPupilItems',
        'getTribeWood',
        'getTribePepper',
        'getCooldown',
        'getPupilMaxCapacity',
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

<style lang="css" scoped>
  #app {
    display: flex;
    flex-direction: column;
  }

  .actions {
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>
