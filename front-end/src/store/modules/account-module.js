import web3 from '@/utils/web3';

const state = {
  coinbase: null,
  balance: null
};

const mutations = {
  setCoinbase(state, payload) {
    state.coinbase = payload;
  },
  setBalance(state, payload) {
    state.balance = payload;
  }
};

const actions = {
  async loadCoinbase({ commit }) {
    const coinbase = await web3.eth.getCoinbase();
    commit('setCoinbase', coinbase);
  },
  async loadBalance({ commit, getters }) {
    const balance = await web3.eth.getBalance(getters.getCoinbase);
    commit('setBalance', balance);
  }
};

const getters = {
  getCoinbase: state => state.coinbase,
  getBalance: state => state.balance
};

export default {
  state,
  mutations,
  actions,
  getters
};
