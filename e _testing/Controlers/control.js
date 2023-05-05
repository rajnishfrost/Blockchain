// from 0xFce453aA73177E63f24530ea106ee75d478a5cb1
// to 0x06FFdb895116eAccbEd57460C6EE1693eb13c3Bf

const express = require("express");
const Web3 = require("web3");
const accounts = require("web3-eth-accounts");

// const model = require("../Models/models");
// const Provider = require('@truffle/hdwallet-provider');
// const address1 = '0xFce453aA73177E63f24530ea106ee75d478a5cb1';
// const privateKey = '61f84609b0c5c7cf36f01eb84af270c109bfcdd790db99af5fc4bec2315bc313';
// const provider1 = 'https://rinkeby.infura.io/v3/cba9c1d8b5ab4c2193bbd20ed721f374';
// const web3 = new Web3(provider1);

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const cons = require("../build/contracts/ERC20Basic.json");
const ContractAddress = cons.networks[5777].address;
const ABi = cons.abi;
const cont1 = new web3.eth.Contract(ABi, ContractAddress);

const transfer = async (req, res) => {
    const PRIVATE_KEY = req.body.private_key;
    const from = req.body.from;
    const to = req.body.to;
    const _value = req.body.value;
    const _nonce = await web3.eth.getTransactionCount(from);
    const transfer1 = await cont1.methods.transfer(to, _value);
    const data = transfer1.encodeABI();
    const transaction =
    {
        from: from,
        nonce: _nonce,
        gasPrice: "200000",
        gas: "300000",
        to: ContractAddress,
        data: data,
        _value,

    };
    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    const reciept = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    // console.log(reciept);
    res.send(reciept);
    const MyEvent = reciept.logs[0].topics;
    console.log("MyEvent",MyEvent);
    console.log("signedTx",signedTx);
//     res.send(signedTx);
};


const balanceOf = async (req, res) => {
    balance = await cont1.methods.balanceOf(req.body.data).call({ from: req.body.from });
    res.send(balance);
    // console.log(req.body.data);
};

const totalSupply = async(req , res) => {
    let totalSupply = await cont1.methods.totalSupply().call({from : req.body.from});
    res.status(200).send(totalSupply)
}

module.exports = { transfer, balanceOf , totalSupply};