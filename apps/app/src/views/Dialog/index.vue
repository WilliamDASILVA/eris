<template>
  <div class="dialog flex h-screen">
    <div class="flex flex-col m-auto container">
      <img
        :src="require(`@/assets/${dialog.speaker}.gif`)"
        alt="Eris The Gatherer"
        class="mb-12 mr-auto"
      >
      <div
        :class="{
          'text-orange-600': dialog.speaker === 'eris',
          'text-orange-600': dialog.speaker === 'eris'
        }"
        class="text-5xl font-bold capitalize"
        :style="{
          color: dialog.speaker === 'eris'
            ? '#D88745'
            : dialog.speaker === 'hygge' ? '#736184' : '#E4B653'
        }"
      >
        {{ dialog.speaker }}
      </div>
      <p class="text-white text-2xl">
        {{ dialog.content }}
      </p>
    </div>
    <div class="absolute bottom-0 left-0 right-0 mx-auto flex pb-12">
      <router-link
        v-if="dialog.to"
        :to="`/dialog/${dialog.to}`"
        class="btn"
      >
        Suivant
      </router-link>
      <router-link
        v-else
        :to="`/game`"
        class="btn"
      >
        Commencer
      </router-link>
    </div>
  </div>
</template>

<script>
  const DIALOGS = [
    {
      id: 1,
      speaker: 'eris',
      content: `Je ne comprends pas... J'ai l'impression de mal faire...`,
      to: 2
    },
    {
      id: 2,
      speaker: 'eris',
      content: `Vous autres êtes tellement utiles à la Tribu en collectant autant de ressource. Je me sens si inutile.`,
      to: 3
    },
    {
      id: 3,
      speaker: 'telesto',
      content: `Ne t’en fais pas. Nous sommes tous utiles d’une façon ou d’une autre.`,
      to: 4
    },
    {
      id: 4,
      speaker: 'hygge',
      content: `Mais oui Eris ! Qu’importe la contribution que tu fais, nous avons tous un impact dans cet univers. Il suffit que tu suives le courant et tout ira à perfection !`,
      to: 5
    },
    {
      id: 5,
      speaker: 'eris',
      content: `Non ! Vous ne semblez pas mesurer l’importance de tout ça !`,
      to: 6
    },
    {
      id: 6,
      speaker: 'eris',
      content: `Si nous ne collectons pas assez de ressources pour aider la tribu, nous n’allons jamais arriver à l’Oeil à temps. ça ne semble pas vous préoccuper ?!`,
      to: 7
    },
    {
      id: 7,
      speaker: 'hygge',
      content: `A quoi bon? Si telle est notre destinée, resigne toi.  Profites du moment présent et laisse toi porter par le Vent.`,
      to: 8
    },
    {
      id: 8,
      speaker: 'eris',
      content: `Ce n’est pas mon genre. Je ferai tout pour aider nous autres, vous verrez...`,
      to: null
    }
  ]

  export default {
    beforeRouteEnter (to, from, next) {
      const { id } = to.params
      if (!id) return next('/')
      if (!DIALOGS.find(dialog => dialog.id === parseInt(id, 10))) return next('/')
      next()
    },
    data () {
      return {
        dialogs: DIALOGS
      }
    },
    computed: {
      dialog () {
        return this.dialogs.find(dialog => dialog.id === parseInt(this.$route.params.id, 10))
      }
    }
  }
</script>

<style>
  .dialog {
    background-color: #2A1F2E;
    background: linear-gradient(180deg, rgba(42,31,46,1) 0%, rgba(31,24,33,1) 100%);
  }

  .dialog img {
    image-rendering: pixelated;
  }
</style>
