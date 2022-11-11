const Web3 = require('web3');
const conf = require('./build/contracts/HTLC.json');
const Contract_address = conf.networks['11155111'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/4a60f6bfb6fa4ea8b043a3161c109233"));
const contract = new web3.eth.Contract(Contract_ABI, Contract_address);
async function abc(){
    let a = await contract.methods.balance().call({ from: "0xCB1725C97b32A3c9FB44dC3500f8E4b0743d479a"});
    console.log(a);
    const orderHash = await contract.methods.withdraw("abracadabra").call({ from: "0xCB1725C97b32A3c9FB44dC3500f8E4b0743d479a",gas: 1000000});
    const nonce = await web3.eth.getTransactionCount('0xCB1725C97b32A3c9FB44dC3500f8E4b0743d479a');
    const gasprice = await web3.eth.getGasPrice();
    const orderhash2 = await contract.methods.withdraw("abracadabra").encodeABI();
    const tx= {
        from: '0xCB1725C97b32A3c9FB44dC3500f8E4b0743d479a',
        to: contract_Address,
        gas: 1000000,
        gasPrice:gasprice,
        data:orderhash2,
        nonce
      }


      const signature = await web3.eth.accounts.signTransaction(tx,"80dff9571b07112862beea13f1c0bfb927cddc945c3abec109348de265d0c0a7");
      const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
      console.log(recepit);
}
abc();
