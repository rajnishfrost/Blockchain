const Web3 = require('web3');
const conf = require('./build/contracts/HashedTimelock.json');
const Contract_address = conf.networks['97'].address;
const Contract_ABI = conf.abi;
const web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s1.binance.org:8545/"));
const contract = new web3.eth.Contract(Contract_ABI, Contract_address);
const address = "0x864C42Cce5180b7f48CeaA36672Ea698A8334248";
const pk = "748d8ac83d9023e2d46f5b4acde8988c3b1bd6a4269172284e9ad326171bbb2d";
async function abc(){
    let a = web3.utils.keccak256("rj");
    const nonce = await web3.eth.getTransactionCount(address);
    const gasprice = await web3.eth.getGasPrice();
    const orderhash2 = await contract.methods.newContract("0xFce453aA73177E63f24530ea106ee75d478a5cb1" , a , "1668166050").encodeABI();
    const tx= {
        from: address,
        to: Contract_address,
        gas: 1000000,                             // contract id 0x942e18aca71295b3d035b8ef623f752386ffcff0cd0c672b6f675a86d95d3825 string "rj"
        gasPrice:gasprice,                          // hash keccak256 0x136e60187bf24defea230aaf47a6a0808c0ea67ce37d2e5f4f09f84b71a222cf
        data:orderhash2,
        nonce,
        value : web3.utils.toWei('0.001', 'ether')
      }


      const signature = await web3.eth.accounts.signTransaction(tx,pk);
      const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
      console.log(recepit);


}

async function bb(){
let a = await contract.getPastEvents('LogHTLCNew',{fromBlock:0,toBlock:'latest',filter:{from:address}})
console.log(a);
}


async function kk(){
    const a = web3.utils.sha3Raw("rj");
    const nonce = await web3.eth.getTransactionCount(address);
    const gasprice = await web3.eth.getGasPrice();
    const orderhash2 = await contract.methods.withdraw( "0x942e18aca71295b3d035b8ef623f752386ffcff0cd0c672b6f675a86d95d3825" , a ).encodeABI();
    const tx= {
        from: "0xFce453aA73177E63f24530ea106ee75d478a5cb1",
        to: Contract_address,
        gas: 1000000,
        gasPrice:gasprice,
        data:orderhash2,
        nonce,
      }


      const signature = await web3.eth.accounts.signTransaction(tx,"61f84609b0c5c7cf36f01eb84af270c109bfcdd790db99af5fc4bec2315bc313");
      const recepit = await web3.eth.sendSignedTransaction(signature.rawTransaction);
      console.log(recepit);
}

// abc();
bb();
// kk();
