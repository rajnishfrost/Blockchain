const Web3 = require("web3");
const confgr = require("./build/contracts/ICO.json");
const contractAddress = confgr.networks['5777'].address;
const contractABI = confgr.abi;
const web3 = new Web3('HTTP://127.0.0.1:7545');
var contract = new web3.eth.Contract(contractABI, contractAddress);
module.exports = {contract};