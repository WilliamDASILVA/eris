<template>
  <div class="resource-item">
    <div class="resource-item__icon">
      <img
        :src="icon"
        :alt="value"
      >
    </div>
    <div
      v-text="value"
      class="resource-item__value"
    />
  </div>
</template>

<script>
  /**
   * @module component - ResourceItem
   */
  export default {
    name: 'ResourceItem',
    props: {
      icon: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="css" scoped>
  .resource-item {
    display: flex;
    align-items: center;
  }

  .resource-item__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: white;
    background-image: linear-gradient(0deg, rgba(253,253,253,1) 0%, rgba(223,223,223,1) 100%);
    margin-right: 1rem;
  }

  .resource-item__icon img {
    width: 28px;
    height: 28px;
  }

  .resource-item__value {
    font-size: 1.2rem;
  }
</style>
