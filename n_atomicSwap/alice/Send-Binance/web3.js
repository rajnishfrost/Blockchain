const Web3 = require('web3');
const conf = require('./build/contracts/HashedTimelock.json');
const Contract_address = conf.networks['97'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/"));
const contract = new web3.eth.Contract(Contract_ABI, Contract_address);
const address = "0x864C42Cce5180b7f48CeaA36672Ea698A8334248";
const pk = "748d8ac83d9023e2d46f5b4acde8988c3b1bd6a4269172284e9ad326171bbb2d";

async function newContract(){
    let a = web3.utils.keccak256("rj");
    const nonce = await web3.eth.getTransactionCount(address);
    const gasprice = await web3.eth.getGasPrice();
    const orderhash2 = await contract.methods.newContract("0xFce453aA73177E63f24530ea106ee75d478a5cb1" , a , "1668664154").encodeABI();
    const tx= {
        from: address,
        to: Contract_address,
        gas: 1000000,                             
        gasPrice:gasprice,                          
        data:orderhash2,
        nonce,
        value : web3.utils.toWei('0.1', 'ether')
      }


      const signature = await web3.eth.accounts.signTransaction(tx,pk);
      const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
      console.log(recepit);
}

async function getEvents(){
let a = await contract.getPastEvents('LogHTLCNew',{fromBlock:24610106,toBlock:'24610106',filter:{from:address}})
console.log(a);
}

async function getContract(){
  const orderhash2 = await contract.methods.getContract("0x1b57f06386a9231c29b0677d570757ac0d8dd6a64656b240087cd197932afe45").call({from : address , gas : 100000})
  console.log(orderhash2);
}



// newContract();
// getEvents();
// getContract();





