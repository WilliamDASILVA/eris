import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const ITEMS_BASE_PRICE = {
  lama: {
    wood: 20,
    pepper: 30
  },
  gatherer_spirit: {
    wood: 25,
    pepper: 15
  },
  woodcutter_spirit: {
    wood: 25,
    pepper: 40
  },
  fruit_gatherer_spirit: {
    wood: 15,
    pepper: 25
  },
  max_capacity: {
    wood: 100,
    pepper: 100
  }
}

export default new Vuex.Store({
  state: {
    unload_cooldown: 2000,
    pupil: {
      speciality: 'gatherer', // sinon peut être "fruit_gatherer", "lumberman"
      wood: 0,
      items: [],
      pepper: 0
    },
    tribe: {
      progression: 0,
      wood: 0,
      pepper: 0
    },
    eye: {
      items: [
        {
          key: 'lama',
          name: 'Lama',
          description: 'Réduit le temps de trajet entre la forêt et la caravanne..',
          stats: {
            cooldown_reduction: 1000
          },
          cost: ITEMS_BASE_PRICE.lama
        },
        {
          key: 'gatherer_spirit',
          name: 'Esprit ramasseur',
          description: 'Aide la pupille en collectant soit du bois soit des poivrouilles, à chaque fois automatiquement.',
          cost: ITEMS_BASE_PRICE.gatherer_spirit
        },
        {
          key: 'woodcutter_spirit',
          name: 'Esprit bûcheron',
          description: 'Aide la poivrouille en collectant un de bois, à chaque fois automatiquement.',
          cost: ITEMS_BASE_PRICE.woodcutter_spirit
        },
        {
          key: 'fruit_gatherer_spirit',
          name: 'Esprit ramasseur de fruits',
          description: 'Aide la pupille en collectant une poivrouille, à chaque fois automatiquement.',
          cost: ITEMS_BASE_PRICE.fruit_gatherer_spirit
        },
        {
          key: 'max_capacity',
          name: 'Capacité du ballon',
          description: 'Augmente la capacité du ballon de 100.',
          cost: ITEMS_BASE_PRICE.max_capacity
        }
      ]
    }
  },
  getters: {
    getPupilSpeciality (state) {
      return state.pupil.speciality
    },
    getPupilWood (state) {
      return state.pupil.wood
    },
    getPupilPepper (state) {
      return state.pupil.pepper
    },
    getPupilMaxCapacity (state, getters) {
     const totalCapacity = getters.getPupilItems
      .filter(v => v === 'max_capacity')

     return 100 + (100 * totalCapacity.length)
    },
    getTribeWood (state) {
      return state.tribe.wood
    },
    getTribeProgression (state) {
      return state.tribe.progression
    },
    getTribePepper (state) {
      return state.tribe.pepper
    },
    getCooldown (state, getters) {
      /**
       * Appliquer cooldown reduction au cooldown de base
       */
      const totalCDR = getters.getPupilItems
        .map(v => getters.getEyeItems.find(_v => _v.key === v))
        .filter(item => item.stats && !!item.stats.cooldown_reduction)
        .map(item => item.stats.cooldown_reduction)
        .reduce((a, b) => a + b, 0)

      return {
        unload: Math.max(0, state.unload_cooldown - totalCDR)
      }
    },
    getEyeItems (state) {
      return state.eye.items
    },
    getPupilItems (state) {
      return state.pupil.items
    },
    getPupilSpirits (state) {
      const SPIRITS = ['gatherer_spirit', 'fruit_gatherer_spirit', 'woodcutter_spirit']
      return state.pupil.items.filter(item => SPIRITS.includes(item))
    }
  },
  mutations: {
    SET_PUPIL_WOOD (state, wood) {
      state.pupil.wood = wood
    },
    SET_PUPIL_PEPPER (state, pepper) {
      state.pupil.pepper = pepper
    },
    SET_TRIBE_WOOD (state, wood) {
      state.tribe.wood = wood
    },
    SET_TRIBE_PEPPER (state, pepper) {
      state.tribe.pepper = pepper
    },
    SET_TRIBE_PROGRESSION (state, progression) {
      state.tribe.progression = progression
    },
    SET_EYE_ITEM_COST (state, { itemIndex, cost }) {
      Vue.set(state.eye.items[itemIndex], 'cost', cost)
    },
    SET_PUPIL_ITEM (state, item) {
      state.pupil.items.push(item)
    },
    INCREASE_PUPIL_WOOD_BY (state, value) {
      state.pupil.wood = state.pupil.wood + value
    },
    INCREASE_PUPIL_PEPPER_BY (state, value) {
      state.pupil.pepper = state.pupil.pepper + value
    }
  },
  actions: {
    gather ({ commit, getters }) {
      const speciality = getters.getPupilSpeciality

      /**
       * En fonction de la spécialité de la pupille, il peut récolter:
       * - du bois & des poivrouilles
       * - juste du bois
       * - des fruits (poivrouilles)
       */
      const odds = speciality === 'gatherer'
        ? Math.round(Math.random()) % 2
        : speciality === 'fruit_gatherer'
          ? 0
          : 1

      const wood = getters.getPupilWood
      const pepper = getters.getPupilPepper
      commit('SET_PUPIL_WOOD', wood + (odds ? 1 : 0))
      commit('SET_PUPIL_PEPPER', pepper + (odds ? 0 : 1))
    },
    unload ({ commit, getters }) {
      const pupilWood = getters.getPupilWood
      const pupilPepper = getters.getPupilPepper
      const maxCapacity = getters.getPupilMaxCapacity
      const wood = getters.getTribeWood
      const pepper = getters.getTribePepper

      const woodToCarry = Math.min(pupilWood, (maxCapacity / 2))
      const pepperToCarry = Math.min(pupilPepper, (maxCapacity / 2))

      commit('SET_TRIBE_WOOD', wood + woodToCarry)
      commit('SET_TRIBE_PEPPER', pepper + pepperToCarry)
      commit('SET_PUPIL_WOOD', Math.max(0, pupilWood - (maxCapacity / 2)))
      commit('SET_PUPIL_PEPPER', Math.max(0, pupilPepper - (maxCapacity / 2)))
    },
    shop ({ commit, getters, dispatch }, itemKey) {
      const pupilWood = getters.getPupilWood
      const pupilPepper = getters.getPupilPepper

      const item = getters.getEyeItems.find(v => v.key === itemKey)
      if (item) {
        const { wood, pepper } = item.cost
        if (pupilWood >= wood && pupilPepper >= pepper) {
          // OK
          commit('SET_PUPIL_WOOD', pupilWood - wood)
          commit('SET_PUPIL_PEPPER', pupilPepper - pepper)
          commit('SET_PUPIL_ITEM', item.key)

          /**
           * Increase the cost of the bought item
           */
          dispatch('increaseItemPrice', item.key)
        } else {
          // CANNOT BUY
        }
      }
    },
    increaseItemPrice ({ commit, getters }, itemKey) {
      const itemIndex = getters.getEyeItems.findIndex(v => v.key === itemKey)
      const pupilItems = getters.getPupilItems
      
      if (itemIndex !== -1) {
        const sameItems = pupilItems.filter(item => item === itemKey)
        const previousCost = getters.getEyeItems[itemIndex].cost

        const priceMultiplyBy = (1 + Math.log(sameItems.length))
        const baseCost = ITEMS_BASE_PRICE[itemKey]

        commit('SET_EYE_ITEM_COST', {
          itemIndex,
          cost: {
            wood: Math.round(previousCost.wood + (priceMultiplyBy * baseCost.wood)),
            pepper: Math.round(previousCost.pepper + (priceMultiplyBy * baseCost.pepper))
          }
        })
      }
    },
    increasePupilResources ({ commit, getters }) {
      const spirits = getters.getPupilSpirits
      let woodIncrease = 0
      let pepperIncrease = 0

      spirits.forEach(spirit => {
        if (spirit === 'gatherer_spirit') {
          const isOdd = Math.round(Math.random()) % 2
    
          if (isOdd) {
            woodIncrease += 1
          } else {
            pepperIncrease += 1
          }
        } else {
          if (spirit === 'fruit_gatherer_spirit') {
            pepperIncrease += 1
          } else {
            woodIncrease += 1
          }
        }
      })

      commit('INCREASE_PUPIL_PEPPER_BY', pepperIncrease)
      commit('INCREASE_PUPIL_WOOD_BY', woodIncrease)
    },
    increaseTribeResources ({ commit, getters }) {
      const wood = getters.getTribeWood
      const pepper = getters.getTribePepper

      const odds = Math.round(Math.random() * 100)

      commit('SET_TRIBE_WOOD', wood + ((odds >= 80) ? 1 : 0))
      commit('SET_TRIBE_PEPPER', pepper + ((odds >= 80) ? 1 : 0))
    },
    decreaseTribeResources ({ commit, getters }) {
      const wood = getters.getTribeWood
      const pepper = getters.getTribePepper
      const progression = getters.getTribeProgression

      const woodToConsume = Math.min(Math.round(Math.random() * 10), wood)
      const pepperToConsume = Math.min(Math.round(Math.random() * 10), pepper)

      if (wood >= woodToConsume && pepper >= pepperToConsume) {
        commit('SET_TRIBE_WOOD', wood - woodToConsume)
        commit('SET_TRIBE_PEPPER', pepper - pepperToConsume)
        commit('SET_TRIBE_PROGRESSION', progression + 0.1)
      }
    }
  }
})
