<template>
  <button
    type="button"
    class="shop-item"
  >
    <div class="shop-item__name"
      v-text="item.name"
    />
    <p class="shop-item__description"
      v-text="item.description"
    />
    <div>
      <div>
        Wood: {{ item.cost.wood }}
      </div>
      <div>
        Pepper: {{ item.cost.pepper }}
      </div>
    </div>
    <div
      v-if="item.stats"
    >
      <span
        v-if="!!item.stats.cooldown_reduction"
      >
        {{ item.stats.cooldown_reduction }} CDR.
      </span>
    </div>
  </button>
</template>

<script>
  /**
   * @module component - ShopItem
   */
  export default {
    name: 'ShopItem',
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>
