import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const ITEMS_BASE_PRICE = {
  lama: {
    wood: 20,
    pepper: 30
  },
  spirit: {
    wood: 25,
    pepper: 15
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
          description: 'Reduce the delay between each travel between the forest and the caravan.',
          stats: {
            cooldown_reduction: 1000
          },
          cost: ITEMS_BASE_PRICE.lama
        },
        {
          key: 'spirit',
          name: 'Esprit',
          description: 'Help the pupil by collecting wood and pepper automatically.',
          cost: ITEMS_BASE_PRICE.spirit
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
      const wood = getters.getTribeWood
      const pepper = getters.getTribePepper

      commit('SET_TRIBE_WOOD', wood + pupilWood)
      commit('SET_TRIBE_PEPPER', pepper + pupilPepper)
      commit('SET_PUPIL_WOOD', 0)
      commit('SET_PUPIL_PEPPER', 0)
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

      const woodToConsume = 2
      const pepperToConsume = 2

      if (wood >= woodToConsume && pepper >= pepperToConsume) {
        commit('SET_TRIBE_WOOD', wood - woodToConsume)
        commit('SET_TRIBE_PEPPER', pepper - pepperToConsume)
        commit('SET_TRIBE_PROGRESSION', progression + 0.1)
      }
    }
  }
})
