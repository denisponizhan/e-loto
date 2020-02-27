import Web3 from 'web3';

export default async provider => {
  return new Web3(provider);
};
