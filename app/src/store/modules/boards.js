import Vue from 'vue';
import Vuex from 'vuex';

import backendUtils from '../../js/backend-utils';
// import Graph from '../../js/models/graph'; // path needs to be fixed

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    boards: []
  },
  getters: {},
  mutations: {
    setBoards: function (state, payload) {
      state.boards = payload.boards;
    },
    addBoard: function (state, payload) {
      state.boards.push(payload.board);
    }
  },
  actions: {
    setBoardsByUser: function ({ dispatch }, payload) {
      // TODO: iterate over all user graphs in all user boards

      backendUtils
        .getEntity('?type=Board&q=refUser==' + payload.user.id)
        .then(response => {
          dispatch('setBoards', { boards: response.data });
        });
    },
    setBoards: function ({ dispatch, commit }, payload) {
      commit('setBoards', { boards: payload.boards });
      payload.boards.forEach((board, i) => {
        dispatch('graphs/addGraphsByBoard', { board: board }, { root: true });
      });
    }
  }
};
