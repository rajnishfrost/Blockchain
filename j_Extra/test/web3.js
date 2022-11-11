const Web3 = require('web3');
const conf = require('./build/contracts/HTLC.json');
const Contract_address = conf.networks['5'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/a14a9880574d4f44b3d592dd448a5dd9"));
const contract = new web3.eth.Contract(Contract_ABI, Contract_address);
// async function abc(){
//     let a = await contract.methods.balance().call({ from: "0x864C42Cce5180b7f48CeaA36672Ea698A8334248",gas: 1000000});
//     console.log(a);
//     const orderHash = await contract.methods.withdraw("abracadabra").call({ from: "0x864C42Cce5180b7f48CeaA36672Ea698A8334248",gas: 1000000});
//     const nonce = await web3.eth.getTransactionCount('0x864C42Cce5180b7f48CeaA36672Ea698A8334248');
//     const gasprice = await web3.eth.getGasPrice();
//     const orderhash2 = await contract.methods.withdraw("abracadabra").encodeABI();
//     const tx= {
//         from: '0x040EED142694081Cc836d365228e80cC7C944C6a',
//         to: contract_Address,
//         gas: 1000000,
//         gasPrice:gasprice,
//         data:orderhash2,
//         nonce
//       }


//       const signature = await web3.eth.accounts.signTransaction(tx,"748d8ac83d9023e2d46f5b4acde8988c3b1bd6a4269172284e9ad326171bbb2d");
//       const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
//       console.log(recepit);
// }
// abc();
console.log(Contract_address);