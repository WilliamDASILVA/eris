<template>
  <div id="app">
    <TribeHeader />
    <Actions class="w-5/12"/>
    <div class="bg-white p-4 w-3/12">
      <h1 class="text-orange-500 text-2xl">
        Eris
      </h1>
      <div>
        Bois : {{ getPupilWood }}
      </div>
      <div>
        Poivrouilles : {{ getPupilPepper }}
      </div>
      <div>
        Capacité de transport : {{ getPupilMaxCapacity }}
      </div>
    </div>
    <Shop class="w-7/12"/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import TribeHeader from '@/components/TribeHeader'
  import Actions from '@/components/Actions'
  import Shop from '@/components/Shop'

  export default {
    name: 'App',
    components: {
      TribeHeader,
      Actions,
      Shop,
    },
    data () {
      return {
        interval: null,
      }
    },
    computed: {
      ...mapGetters([
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

  
  .shop {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
