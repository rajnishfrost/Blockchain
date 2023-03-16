const Web3 = require('web3');
const conf = require('./build/contracts/HashedTimelock.json');
const Contract_address = conf.networks['97'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/"));
const contract = new web3.eth.Contract(Contract_ABI, Contract_address);
const address = "0x659c55Af1C9035F14C10f5b3765D8469dECB09a8";
const pk = "658d9dba16bb028dc6b79b8cc2fcda09ad95a33e00622fa1dfbea17227e7c129";

async function newContract(){
    let a = web3.utils.keccak256("rj");
    const nonce = await web3.eth.getTransactionCount(address);
    const gasprice = await web3.eth.getGasPrice();
    const orderhash2 = await contract.methods.newContract("0x4b1f4E927afbA64a826249bBbA405140d093E036" , a , "1670330103").encodeABI();
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





