

const RobotToken = artifacts.require('DappToken')
const RobotContract = artifacts.require('TokenFarm')



function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}


  let robotContract,robotToken

  before(async () => {
    // Load Contracts
    robotToken = await RobotToken.new()
    robotContract = await RobotContract.new()
  })

  describe('Robot Contract deployment', async () => {
    it('has a name', async () => {
      const name = await robotContract.name()
      assert.equal(name, 'Robot Contract')
    })
  })

  describe('Robot Token deployment', async () => {
    it('has supply', async () => {
      const supply = await robotToken.TokenSupply()
      assert.equal(supply, 100000000)
    })
  })


