App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    window.ethereum.enable();
    return App.initWeb3();
    
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      web3 = new Web3(App.web3Provider);
      
    }
    App.initRobotContract();
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Robot_Token.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var Robot_TokenArtifact = data;
      App.contracts.Robot_Token = TruffleContract(Robot_TokenArtifact);
      

      // Set the provider for our contract.
      App.contracts.Robot_Token.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    });

    return App.bindEvents();
  },

  initRobotContract: function() {
    $.getJSON('RobotContract.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var RobotContract = data;
      App.contracts.RobotContract = TruffleContract(RobotContract);
      

      // Set the provider for our contract.
      App.contracts.RobotContract.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  


  bindEvents: function() {
    $(document).on('click', '#transferButton', App.handleTransfer);
    $(document).on('click', '#syncButton', App.syncRobot);
  },

  handleTransfer: function(event) {
    event.preventDefault();

    var amount = parseInt($('#RBTransferAmount').val());
    var toAddress = $('#RBTransferAddress').val();

    console.log('Transfer ' + amount + ' TT to ' + toAddress);

    var robotTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Robot_Token.deployed().then(function(instance) {
        robotTokenInstance = instance;

        return robotTokenInstance.transfer(toAddress, amount, {from: account, gas: 100000});
      }).then(function(result) {
        alert('Transfer Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

    syncRobot: function(event) {
      event.preventDefault();
      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
      var account = accounts[0];
      web3.eth.defaultAccount=account;
      var robotContractInstance;

    console.log('Robot syncing..');
      App.contracts.RobotContract.deployed().then(function(instance) { 
      robotContractInstance =   instance
      return robotContractInstance.GetName().call();
      }).then(function(result){
       console.log(result)
      
        
      }).catch(function(err) {
        console.log(err.message);
      });
      
   
     
      
    });
  },

  getBalances: function() {
    console.log('Getting balances...');

    var robotTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Robot_Token.deployed().then(function(instance) {
        robotTokenInstance = instance;
        

        return robotTokenInstance.balanceOf(account);
      }).then(function(result) {
        balance = result.c[0];

        $('#RBTBalance').text(balance);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
