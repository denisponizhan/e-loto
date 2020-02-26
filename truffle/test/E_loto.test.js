const E_loto = artifacts.require('E_loto');
const truffleAssert = require('truffle-assertions');

contract('E_loto', async accounts => {
  let e_loto = {};

  it('Valid bet should not revert', async () => {
    e_loto = await E_loto.at('0x239CC7Fc339F854E32b51937Afa38a3EE5Acd4fd');

    const accounts = await web3.eth.getAccounts();

    await truffleAssert.passes(
      e_loto.placeStake(0, {
        from: accounts[0],
        value: web3.utils.toWei('0.015', 'ether')
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(0, {
        from: accounts[1],
        value: web3.utils.toWei('0.015', 'ether')
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(0, {
        from: accounts[2],
        value: web3.utils.toWei('0.015', 'ether')
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(0, {
        from: accounts[3],
        value: web3.utils.toWei('0.015', 'ether')
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(0, {
        from: accounts[3],
        value: web3.utils.toWei('0.015', 'ether')
      }),
      'Valid bet should be placed'
    );
  });
});
