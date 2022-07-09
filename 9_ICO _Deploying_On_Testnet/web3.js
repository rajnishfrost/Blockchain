const Web3 = require("web3");
const confgr = require("./build/contracts/ICO.json");
const contractAddress = confgr.networks['3'].address;
const contractABI = confgr.abi;
const web3 = new Web3('https://ropsten.infura.io/v3/518453f766a04d49b5885b25b7b88cc0');
var contract = new web3.eth.Contract(contractABI, contractAddress);
module.exports = {contract , contractAddress};