import web3 from '@/utils/web3';
import e_loto from '../../../../truffle/build/contracts/E_loto.json';

const contract = new web3.eth.Contract(
  e_loto.abi,
  '0x104708fC718AFD6fed760B2b397D1241A3cBFb36'
);

const state = {
  contract: null
};

const mutations = {};

const actions = {
  async placeStake({ commit, getters, rootGetters }) {
    try {
      await contract.methods.placeStake('1').send({
        from: rootGetters.getCoinbase,
        value: web3.utils.toWei('0.015', 'ether')
      });
    } catch (e) {
      console.error(e);
    }
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
