import Vue from 'vue'
import Vuex from 'vuex'

import {getUsers, getDetailUser} from "../services/request";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingList: false,
    listUsers: [],
    userInfo: {},
    options: {
      count: 25,
      page: 1,
    },
    maxUsers: 500,
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
    changeOptions(state, data) {
      const {prop, value} = data
      state.options[prop] = value
    },
  },
  actions: {
    async getListUsers({state, commit}) {
      commit('changeLoadingList', true)

      const result = await getUsers(state.options)
      commit('changeListUsers', result)

      commit('changeLoadingList', false)
    },
    async getDetailUser({commit}, id) {
      commit('changeLoadingList', true)

      const result = await getDetailUser(id)
      commit('changeUserInfo', result)

      commit('changeLoadingList', false)
    },
  },
  modules: {
  }
})
