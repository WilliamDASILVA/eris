<template>
  <div class="shop bg-white p-4">
    <h2 class="mb-4 text-2xl">
      L'Oeil
    </h2>
    <div class="flex overflow-auto">
      <ShopItem
        v-for="item in getEyeItems"
        :key="item.key"
        :item="item"
        @click.native="shop(item.key)"
        class="mr-4"
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import ShopItem from '@/components/Shop/_subs/ShopItem'

  export default {
    components: {
      ShopItem
    },
    computed: {
      ...mapGetters([
        'getEyeItems'
      ])
    },
    methods: {
      ...mapActions([
        'shop'
      ])
    }
  }
</script>

<style lang="css" scoped>
  .shop-item {
    flex: 0 0 250px;
  }
</style>
