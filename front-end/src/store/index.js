import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account-module';
import contract from './modules/contract-module';
import staker from './modules/staker-module';
import winners from './modules/winners-module';

Vue.use(Vuex);

export const root = {
  actions: {},
  mutations: {},
  getters: {},
  state: {}
};

export default new Vuex.Store({
  ...root,
  modules: { account, contract, staker, winners }
});
