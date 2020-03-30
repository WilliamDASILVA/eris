<template>
  <button
    type="button"
    class="shop-item flex flex-col flex-initial bg-white hover:bg-gray-200 text-left border rounded px-4 py-2"
  >
    <div class="shop-item__name text-xl"
      v-text="item.name"
    />
    <p class="shop-item__description border-b pb-2"
      v-text="item.description"
    />
    <div class="border-b py-2">
      <div>
        Coût en bois: {{ item.cost.wood }}
      </div>
      <div>
        Coût en poivrouilles: {{ item.cost.pepper }}
      </div>
    </div>
    <div
      v-if="item.stats"
      class="pt-2"
    >
      <span
        v-if="!!item.stats.cooldown_reduction"
      >
        Gain : {{ item.stats.cooldown_reduction }} CDR.
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
