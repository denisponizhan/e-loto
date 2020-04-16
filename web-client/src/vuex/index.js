import Vue from 'vue';
import Vuex from 'vuex';
import Web3 from 'web3';

import account from './modules/account-module';
import contract from './modules/contract-module';
import staker from './modules/stakes-module';
import winners from './modules/winners-module';

import t from './types';
import { CONNECTED, NOT_CONNECTED } from '@/utils/constants';

Vue.use(Vuex);

export const root = {
  state: {
    connectionStatus: null,
    selectedAccount: null,
    networkId: null,
    accountBalance: null
  },

  mutations: {
    [t.SET_CONNECTION_STATUS](state, payload) {
      state.connectionStatus = payload;
    },
    [t.SET_SELECTED_ACCOUNT](state, payload) {
      state.selectedAccount = payload;
    },
    [t.SET_NETWORK_ID](state, payload) {
      state.networkId = payload;
    },
    [t.SET_ACCOUNT_BALANCE](state, payload) {
      state.accountBalance = payload;
    }
  },

  actions: {
    async [t.INIT]({ dispatch }) {
      await dispatch(t.ENABLE_ETHEREUM);
      dispatch(t.LOAD_NETWORK_ID);
      dispatch(t.LOAD_ACCOUNT_BALANCE);
      dispatch(t.LOAD_CONTRACT_INSTANCE);
      dispatch(t.LOAD_STAKES_TOTAL);
      dispatch(t.LOAD_REWARD_BALANCE);
    },
    async [t.ENABLE_ETHEREUM]({ dispatch, commit }) {
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        ethereum.autoRefreshOnNetworkChange = false;

        try {
          const accounts = await ethereum.enable();

          commit(t.SET_CONNECTION_STATUS, CONNECTED);
          commit(t.SET_SELECTED_ACCOUNT, accounts[0]);

          ethereum.on('accountsChanged', accounts => {
            commit(t.SET_SELECTED_ACCOUNT, accounts[0]);
            dispatch(t.LOAD_ACCOUNT_BALANCE);
          });
        } catch (e) {
          commit(t.SET_CONNECTION_STATUS, NOT_CONNECTED);
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
      } else {
        console.log(
          'Non-Ethereum browser detected. You should consider trying MetaMask!'
        );
        commit(t.SET_CONNECTION_STATUS, NOT_CONNECTED);
        return;
      }
    },
    async [t.LOAD_NETWORK_ID]({ dispatch, commit }) {
      const networkId = ethereum.networkVersion;

      commit(t.SET_NETWORK_ID, networkId);
      ethereum.on('networkChanged', chainId => {
        commit(t.SET_NETWORK_ID, chainId);
        dispatch(t.LOAD_ACCOUNT_BALANCE);
      });
    },
    async [t.LOAD_ACCOUNT_BALANCE]({ commit, rootGetters }) {
      const wei = await window.web3.eth.getBalance(
        rootGetters[t.GET_SELECTED_ACCOUNT]
      );
      const ether = window.web3.utils.fromWei(wei, 'ether');
      const rounded = Math.round(ether * 100) / 100;
      commit(t.SET_ACCOUNT_BALANCE, rounded);
    }
  },

  getters: {
    [t.GET_CONNECTION_STATUS]: state => state.connectionStatus,
    [t.GET_SELECTED_ACCOUNT]: state => state.selectedAccount,
    [t.GET_NETWORK_ID]: state => state.networkId,
    [t.GET_ACCOUNT_BALANCE]: state => state.accountBalance
  }
};

export default new Vuex.Store({
  ...root,
  modules: {
    account,
    contract,
    staker,
    winners
  }
});
