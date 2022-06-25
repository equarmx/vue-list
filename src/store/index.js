import Vue from 'vue'
import Vuex from 'vuex'

import {getUsers, getDetailUser} from "../services/request";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingList: false,
    listUsers: [],
    userInfo: {},
  },
  mutations: {
    changeListUsers(state, array) {
      state.listUsers = []
      state.listUsers = array
    },
    changeLoadingList(state, value) {
      state.loadingList = value
    },
    changeUserInfo(state, object) {
      state.userInfo = {}
      state.userInfo = object
    },
  },
  actions: {
    async getListUsers({commit}, params) {
      commit('changeLoadingList', true)

      const result = await getUsers(params)

      console.log(result)

      commit('changeListUsers', result)
    },
    async getDetailUser({commit}, id) {
      commit('changeLoadingList', true)

      const result = await getDetailUser(id)

      console.log(result)

      commit('changeUserInfo', result)
    },
  },
  modules: {
  }
})
