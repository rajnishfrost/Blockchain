const { json } = require("body-parser");
const web3 = require("../web3");
const contract = web3.contract;
const main = async (req, res) => {
    address = req.body.address;
    value = req.body.value;
    value = value * 10 ** 18;
    let abc = await contract.methods.buyTokensWithEther().send({ from: address, value: value, gas: 100000 });
    const x = await contract.getPastEvents("TokenBuy", { fromBlock: "latest" });
    const c = {
        sender: `${x[0].returnValues.sender}`,
        receiver: `${x[0].returnValues.receiver}`,
        fundTransfered: `${x[0].returnValues.fundTransfered / 10 ** 18}`,
        tokensIssued: `${parseInt(x[0].returnValues.tokensIssued) / 10 ** 18}`,
    };
    if (abc.status == true)
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