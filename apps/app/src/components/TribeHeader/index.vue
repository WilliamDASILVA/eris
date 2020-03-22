<template>
  <div class="tribe-header">
    <div class="tribe-header__container">
      <div class="tribe-header__title">
        Tribue
      </div>
      <div class="tribe-header__resources">
        <ResourceItem
          :icon="require('@/assets/wood.svg')"
          :value="`${getTribeWood} bois`"
        />
        <ResourceItem
          :icon="require('@/assets/pepper.svg')"
          :value="`${getTribePepper} poivrouilles`"
        />
      </div>
    </div>
    <TribeProgress />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import ResourceItem from '@/components/ResourceItem'
  import TribeProgress from './_subs/TribeProgress'

  /**
   * @module component - TribeHeader
   */
  export default {
    name: 'TribeHeader',
    components: {
      ResourceItem,
      TribeProgress
    },
    computed: {
      ...mapGetters([
        'getTribeWood',
        'getTribePepper'
      ])
    }
  }
</script>

<style lang="css" scoped>
  .tribe-header {
    position: relative;
    width: 50%;
    margin: 0 auto;
  }

  .tribe-header__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 175px;
    background-color: white;
    background-image: linear-gradient(180deg, rgba(253,253,253,1) 0%, rgba(223,223,223,1) 100%);
    clip-path: polygon(100% 0, 80% 100%, 20% 100%, 0 0);
  }

  .tribe-header__title {
    font-size: 2rem;
    margin: 0.5rem 0;
    font-weight: 500;
  }

  .tribe-header__resources {
    display: flex;
  }

  .tribe-header__resources .resource-item:not(:last-child) {
    margin-right: 1rem;
  }

  .tribe-progress {
    bottom: 65px;
  }
</style>
