export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  ethereum: {
    contract: process.env.CONTRACT_ADDRESS,
    provider: process.env.WEB3_PROVIDER
  }
});
