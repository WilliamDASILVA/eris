<template>
  <div class="explanation flex h-screen">
    <div class="flex flex-col m-auto container">
      <div class="relative">
        <div class="explanation__bg"></div>
        <img
          :src="require(`@/assets/${explanation.image}.gif`)"
          class="mb-12 mx-auto w-64"
        >
      </div>
      <div
        class="text-5xl text-white text-center font-bold mb-2"
        v-html="explanation.title"
      />
      <p
        v-if="explanation.content"
        class="text-white text-2xl text-center w-2/3 mx-auto"
        v-html="explanation.content"
      />
    </div>
    <div class="absolute bottom-0 left-0 right-0 mx-auto flex pb-12">
      <router-link
        :to="explanation.to ? `/explanation/${explanation.to}` : '/dialog/1'"
        class="btn"
      >
        Suivant
      </router-link>
    </div>
  </div>
</template>

<script>
  const EXPLANATIONS = [
    {
      id: 1,
      image: 'eris',
      title: `Vous êtes <span class="text-orange-500">Eris</span>.`,
      content: null,
      to: 2
    },
    {
      id: 2,
      image: 'eye_spin',
      title: 'L’Oeil vous a créé.',
      content: `Il vous a crée vous et vos autres camarades les <span class="text-orange-500">pupilles</span>.`,
      to: 3
    },
    {
      id: 3,
      image: 'eye_spin',
      title: 'Vous collectez des ressources',
      content: `Vous et les pupilles collectez du <span class="text-orange-500">bois</span> & des <span class="text-orange-500">poivrouilles</span> pour rejoindre l’Oeil avant le déluge...`,
      to: 4
    },
    {
      id: 4,
      image: 'spirit',
      title: 'Invoquez les esprits',
      content: `Les esprits sont là pour vous aider à accomplir cette tache.`,
      to: null
    }
  ]

  export default {
    beforeRouteEnter (to, from, next) {
      const { id } = to.params
      if (!id) return next('/')
      if (!EXPLANATIONS.find(explanation => explanation.id === parseInt(id, 10))) return next('/')
      next()
    },
    data () {
      return {
        explanations: EXPLANATIONS
      }
    },
    computed: {
      explanation () {
        return this.explanations.find(explanation => explanation.id === parseInt(this.$route.params.id, 10))
      }
    }
  }
</script>

<style>
  .explanation {
    background-color: #2A1F2E;
    background: linear-gradient(180deg, rgba(42,31,46,1) 0%, rgba(31,24,33,1) 100%);
  }

  .explanation__bg {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    width: 300px;
    height: 300px;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.025);
  }

  .explanation__bg::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    left: -100px;
    top: -100px;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.025);
  }

  .explanation__bg::after {
    content: '';
    position: absolute;
    width: 800px;
    height: 800px;
    left: -250px;
    top: -250px;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.025);
  }

  .explanation img {
    image-rendering: pixelated;
  }
</style>
