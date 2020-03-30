<template>
  <ActionButton
    :disabled="$wait.is('unloading')"
    :icon="require('@/assets/caravane_button.svg')"
    :size="100"
    :loading="true"
    :loading-progression="$wait.percent('unloading')"
    class="unload-action blue"
  />
</template>

<script>
  import ActionButton from './../ActionButton'

  /**
   * @module component - UnloadAction
   */
  export default {
    name: 'UnloadAction',
    components: {
      ActionButton
    }
  }
</script>
