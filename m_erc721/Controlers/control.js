const express = require('express');
const w = require('../web_new');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const acc = w.contract;

const address = "0xfa94EC8383AD6363Ad6950f3A0f9F10cE4D1BFCf"; 

const main = async(req , res) =>{
    res.send("hello peter");
}


const mintToken = async (req, res) => {
      let url = req.headers.url;
      let amount = req.headers.amount ;
      let price =req.headers.price; 
      await acc.methods.mintToken(String(url) , Number(amount) , Number(price)).send({ from: address , gas: 1000000});
      const newItemId = await acc.methods.mintToken(String(url) , Number(amount) , Number(price)).call({ from: address,gas: 1000000});
      console.log(url , amount , price);
      res.send(newItemId);
}



module.exports = { main, mintToken };