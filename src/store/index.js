import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  plugins: [createPersistedState()],
  mutations: {
    saveEditedContent(state) {
      if (state.editedContent.id) {
        axios.post(`http://localhost:5050/activities/${state.editedContent.id}`, state.editedContent)
      } else {
        const result = axios.post(`http://localhost:5050/activities`, state.editedContent)
        if (result.data && result.data.id) {
          state.editedContent.id = result.data.id
        } else {
          console.log('NO Result Data')
        }
      }
    },
    fetchEditedContent(state, data) {
      state.editedContent = data
    },
    dispatchOnce(state, condition) {
      state.dispatchOnce = condition
    },
    changeActive(state, condition) {
      state.isActive = condition
    }
  },
  actions: {
    async saveEditedContent({
      commit
    }) {
      commit('saveEditedContent')
    },
    async fetchEditedContent({
      commit
    }, id) {
      const response = await axios.get(`http://localhost:5050/activities/new`)
      commit('fetchEditedContent', response.data)
    },
    async dispatchOnce({
      commit
    }, condition) {
      commit('dispatchOnce', condition)
    },
    async changeActive({
      commit
    }, condition) {
      commit('changeActive', condition)
    }
  }
})
