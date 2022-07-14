const { json } = require("body-parser");
const web3 = require("../web3");
const contract = web3.contract;
const check = 100;
const main = async (req, res) => {
    var address = req.body.address;
    var value = req.body.value;
    value = value * 10 ** 18;
    calculatedTokensPassingToContract = BigInt(calculatedToken(value));
    let abc = await contract.methods.buyTokensWithEther(calculatedTokensPassingToContract).send({ from: address, value: value, gas: 100000 });
    const x = await contract.getPastEvents("TokenBuy", { fromBlock: "latest" });
    const c = {
        sender: `${x[0].returnValues.sender}`,
        receiver: `${x[0].returnValues.receiver}`,
        fundTransfered: `${x[0].returnValues.fundTransfered/10**18}`,
        tokensIssued: `${parseInt(x[0].returnValues.tokensIssued)/10**18}`,
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
function calculatedToken(value) {
    numTokens1 = 0;
    numTokens2 = 0;
    numTokens3 = 0;
    numTokens4 = 0;
     e_numTokens1 = 0;
     e_numTokens2 = 0;
     e_numTokens3 = 0;
     e_numTokens4 = 0;
     rj = 0;
    if (value > (check * 25) / 100) {
        numTokens1 = value - (check * 25) / 100;
        e_numTokens1 = (check * 25) / 100;
        rj = rj + e_numTokens1;
        if (numTokens1 > (check * 50) / 100) {
            numTokens2 = numTokens1 - (check * 50) / 100;
            e_numTokens2 = (check * 25) / 100;
            rj = rj + e_numTokens2;
        } else {
            e_numTokens2 = numTokens1 / 2;
            rj = rj + e_numTokens2;
        }
        if (numTokens2 > (check * 75) / 100) {
            numTokens3 = numTokens2 - (check * 75) / 100;
            e_numTokens3 = (check * 25) / 100;
            rj = rj + e_numTokens3;
        } else {
            e_numTokens3 = numTokens2 / 3;
            rj = rj + e_numTokens3;
        }
        if (numTokens3 >= (check * 100) / 100) {
            numTokens4 = numTokens3 - (check * 100) / 100;
            e_numTokens4 = (check * 100) / 100;
            rj = rj + e_numTokens3;
        } else {
            e_numTokens4 = numTokens3 / 4;
            rj = rj + e_numTokens4;
        }
    } else {
        rj = rj + value;
    }
    return rj;
}
module.exports = { main, getBalance };