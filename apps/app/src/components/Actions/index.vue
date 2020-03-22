<template>
  <div class="actions">
    <GatherAction
      @click="gather"
    />
    <UnloadAction
      @click.native="bringResources"
    />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  import GatherAction from './_subs/GatherAction'
  import UnloadAction from './_subs/UnloadAction'

  /**
   * @module component - actions
   */
  export default {
    name: 'actions',
    components: {
      GatherAction,
      UnloadAction
    },
    computed: {
      ...mapGetters([
        'getCooldown'
      ])
    },
    methods: {
      ...mapActions([
        'gather',
        'unload'
      ]),
      bringResources () {
        const { unload } = this.getCooldown
        this.$wait.progress('unloading', 0)

        let currentProgress = 0
        const progressInterval = setInterval(() => {
          currentProgress += 10
          this.$wait.progress('unloading', currentProgress)
        }, unload / 10)

        this.unload()
        setTimeout(() => {
          if (progressInterval) {
            clearInterval(progressInterval)
          }

          setTimeout(() => {
            this.$wait.progress('unloading', 101)
          }, unload / 10)
        }, unload)
      }
    }
  }
</script>

<style lang="css" scoped>
  .actions {
    padding: 32px;
  }

  .gather-action {
    position: absolute;
    left: 100px;
    bottom: 100px;
  }

  .unload-action {
    position: absolute;
    left: 280px;
    bottom: 280px;
  }
</style>
