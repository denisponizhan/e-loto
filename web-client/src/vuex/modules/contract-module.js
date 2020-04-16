import t from '../types';
import abi from '@/utils/abis';

const state = {
  contract: null,
  stakesTotal: null,
  rewardBalance: null
};

const mutations = {
  [t.SET_CONTRACT_INSTANCE](state, payload) {
    state.contract = payload;
  },
  [t.SET_STAKES_TOTAL](state, payload) {
    state.stakesTotal = payload;
  },
  [t.SET_REWARD_BALANCE](state, payload) {
    state.rewardBalance = payload;
  }
};

const actions = {
  async [t.LOAD_CONTRACT_INSTANCE]({ commit, getters, rootGetters }) {
    const contract = new window.web3.eth.Contract(
      abi,
      '0x46A2A10E78929be6A706F0b53eDd50eFC39f422d'
    );
    commit(t.SET_CONTRACT_INSTANCE, contract);
  },
  async [t.LOAD_STAKES_TOTAL]({ commit, getters }) {
    const totalWei = await getters[t.GET_CONTRACT_INSTANCE].methods
      .getCurrentGameStakes()
      .call();
    const ether = window.web3.utils.fromWei(totalWei, 'ether');
    const rounded = Math.round(ether * 100) / 100;
    commit(t.SET_STAKES_TOTAL, rounded);
  },
  async [t.LOAD_REWARD_BALANCE]({ commit, getters, rootGetters }) {
    const totalWei = await getters[t.GET_CONTRACT_INSTANCE].methods
      .getRewardBalance()
      .call({ from: rootGetters[t.GET_SELECTED_ACCOUNT] });

    const ether = window.web3.utils.fromWei(totalWei, 'ether');
    const rounded = Math.round(ether * 100) / 100;
    commit(t.SET_REWARD_BALANCE, rounded);
  }
};

const getters = {
  [t.GET_CONTRACT_INSTANCE]: state => state.contract,
  [t.GET_STAKES_TOTAL]: state => state.stakesTotal,
  [t.GET_REWARD_BALANCE]: state => state.rewardBalance
};

export default {
  state,
  mutations,
  actions,
  getters
};
