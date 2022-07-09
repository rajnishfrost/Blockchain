const { json } = require("body-parser");
const Web3 = require("web3");
const web3 = new Web3('https://ropsten.infura.io/v3/518453f766a04d49b5885b25b7b88cc0');
const web32 = require("../web3");
const contract = web32.contract;
const contractAddress = web32.contractAddress;
const main = async (req, res) => {
    address = req.body.address;
    value = req.body.value;
    value = value * 10 ** 18;
    let abc = await contract.methods.buyTokensWithEther();
//=============================================================================
const PRIVATE_KEY = "e717b5b07b629d04f6e26be4e30c595027ef1fb93d419cd9902ea69f28f19a0d";
const _nonce = await web3.eth.getTransactionCount(`${address}`);
const  gaprice  =await web3.eth.getGasPrice();
const data = abc.encodeABI();
const transaction =
{
    from: `${address}`,
    nonce: _nonce,
    gasPrice: gaprice,
    gas: "300000",
    to: contractAddress,
    data: data,
    value : value,

};
const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
const reciept = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
// console.log(reciept)
// res.send(reciept);
// const MyEvent = reciept.logs[0].topics;
// console.log(MyEvent);
// console.log(signedTx);
// // res.send(signedTx);


//===============================================================================
    const x = await contract.getPastEvents("TokenBuy", { fromBlock: "latest" });
    const c = {
        sender: `${x[0].returnValues.sender}`,
        receiver: `${x[0].returnValues.receiver}`,
        fundTransfered: `${x[0].returnValues.fundTransfered / 10 ** 18}`,
        tokensIssued: `${parseInt(x[0].returnValues.tokensIssued) / 10 ** 18}`,
    };
    if (reciept.status == true)
        res.send(c);
    else
        res.send("transaction Failed")
}
const getBalance = async (req, res) => {
    let address = req.body.address;
    let a = await contract.methods.getBalance(address).call({ from: address });
    a = parseInt(a);
    a = a / 10 ** 18;
    a = String(a);
    res.send(a);
}
module.exports = { main, getBalance };