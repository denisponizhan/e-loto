export default {
  port: process.env.PORT,
  ethereum: {
    provider: process.env.PROVIDER,
    contract: process.env.CONTRACT_ADDRESS,
    admin: {
      address: process.env.ADMIN_ADDRESS,
      private: process.env.ADMIN_PRIVATE_KEY
    },
    gasLimit: process.env.GAS_LIMIT,
    gasPrice: process.env.GAS_PRICE
  }
};
