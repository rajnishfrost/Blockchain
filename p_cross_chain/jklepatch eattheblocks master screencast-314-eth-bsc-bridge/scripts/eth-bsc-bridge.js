const Web3 = require('web3');
const BridgeEth = require('../build/contracts/BridgeEth.json');//avalanche
const BridgeBsc = require('../build/contracts/BridgeBsc.json');//poly

const web3Eth = new Web3('https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc');
const web3Bsc = new Web3('HTTP://127.0.0.1:7545');
const adminPrivKey = 'cb4897025cb2a5852c9d7852802a60af5e02f6098ed254aecc4394cb39d416fc';
const { address: admin } = web3Bsc.eth.accounts.wallet.add(adminPrivKey);

const bridgeEth = new web3Eth.eth.Contract(
  BridgeEth.abi,
  BridgeEth.networks['11111'].address
);

const bridgeBsc = new web3Bsc.eth.Contract(
  BridgeBsc.abi,
  BridgeBsc.networks['5777'].address
);

bridgeEth.events.Transfer(
  {fromBlock: 0, step: 0}
)
.on('data', async event => {
  console.log(event);
  const { from, to, amount, date, nonce } = event.returnValues;

  const tx = bridgeBsc.methods.mint(to, amount, nonce);
  const [gasPrice, gasCost] = await Promise.all([
    web3Bsc.eth.getGasPrice(),
    tx.estimateGas({from: admin}),
  ]);
  const data = tx.encodeABI();
  const txData = {
    from: admin,
    to: bridgeBsc.options.address,
    data,
    gas: gasCost,
    gasPrice
  };
  const receipt = await web3Bsc.eth.sendTransaction(txData);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`
    Processed transfer:
    - from ${from} 
    - to ${to} 
    - amount ${amount} tokens
    - date ${date}
  `);
});
