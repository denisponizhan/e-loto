const E_loto = artifacts.require('E_loto');
const truffleAssert = require('truffle-assertions');

contract('E_loto', async accounts => {
  let e_loto = {};

  it('Valid bet should not revert', async () => {
    e_loto = await E_loto.deployed();

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
        from: accounts[4],
        value: web3.utils.toWei('0.015', 'ether')
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(5, {
        from: accounts[5],
        value: web3.utils.toWei('0.015', 'ether')
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(6, {
        from: accounts[6],
        value: web3.utils.toWei('0.015', 'ether')
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(7, {
        from: accounts[7],
        value: web3.utils.toWei('0.015', 'ether')
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(8, {
        from: accounts[8],
        value: web3.utils.toWei('0.015', 'ether')
      }),
      'Valid bet should be placed'
    );

    await truffleAssert.passes(
      e_loto.placeStake(9, {
        from: accounts[9],
        value: web3.utils.toWei('0.015', 'ether')
      }),
      'Valid bet should be placed'
    );
  });

  it('Winners amount should be determined', async () => {
    const result = await e_loto.determineWinners();
    assert.isTrue(
      result.receipt.status,
      'Winners amount should be a number between 0 and 10'
    );
  });

  it('Should return a valid balance of contract', async () => {
    const result = await web3.eth.getBalance(e_loto.address);

    assert.isAbove(
      Number(result.toString()),
      0,
      'Balance should be greater than 0'
    );
  });

  it('Should withdraw rewards to winners', async () => {
    const winners = await e_loto.getWinners();

    for (let i = 0; i < winners.length; i++) {
      const initBalance = await web3.eth.getBalance(winners[i]);

      await e_loto.withdraw({
        from: winners[i]
      });

      const newBalance = await web3.eth.getBalance(winners[i]);

      assert.isAbove(
        Number(newBalance),
        Number(initBalance),
        'After reward new balance should be greater than init balance'
      );
    }
  });
});
