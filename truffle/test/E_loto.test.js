const E_loto = artifacts.require('E_loto');
const truffleAssert = require('truffle-assertions');

contract('E_loto', async (accounts) => {
  let e_loto = {};

  it('Valid bet should not revert', async () => {
    e_loto = await E_loto.at('0x46A2A10E78929be6A706F0b53eDd50eFC39f422d');

    const accounts = await web3.eth.getAccounts();

    await truffleAssert.passes(
      e_loto.placeStake(0, {
        from: accounts[0],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(1, {
        from: accounts[1],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(2, {
        from: accounts[2],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(2, {
        from: accounts[3],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(2, {
        from: accounts[4],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(5, {
        from: accounts[5],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(6, {
        from: accounts[6],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(7, {
        from: accounts[7],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(5, {
        from: accounts[8],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(5, {
        from: accounts[9],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(0, {
        from: accounts[10],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(1, {
        from: accounts[11],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(2, {
        from: accounts[12],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(1, {
        from: accounts[13],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(0, {
        from: accounts[14],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(5, {
        from: accounts[15],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(6, {
        from: accounts[16],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(5, {
        from: accounts[17],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(8, {
        from: accounts[18],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(9, {
        from: accounts[19],
        value: web3.utils.toWei('0.005', 'ether'),
      }),
      'Valid bet should be placed'
    );
  });
});
