// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ICO {
    mapping(address => uint256) balances; // mapping(address => uint256)  _balances;
    address payable tokenFundsAddress; // Address of the wallet holding the token funds when they are first created
    uint256 amountRaised; // Keep track of ETH funds raised
    uint256 check;
    // This generates a public event on the blockchain that will notify listening clients
    event TokenBuy(
        address indexed sender,
        address indexed receiver,
        uint256 fundTransfered,
        uint256 tokensIssued
    );
    uint gbtoken = 1*1 ether;
    constructor(uint256 initialSupply) {
        balances[msg.sender] = initialSupply * gbtoken;
        check = initialSupply * gbtoken;
        tokenFundsAddress = payable(msg.sender);
    }

    function getBalance(address addr) public view returns (uint256) {
        return balances[addr];
    }

    function transfer(uint256 calculatedTokensPassingToContract) public payable {
        tokenFundsAddress.transfer(msg.value);
        balances[tokenFundsAddress] -= (calculatedTokensPassingToContract);
        balances[msg.sender] += (calculatedTokensPassingToContract);
        amountRaised += msg.value;
        emit TokenBuy(msg.sender, tokenFundsAddress, msg.value, calculatedTokensPassingToContract);
    }

    function buyTokensWithEther(uint calculatedTokensPassingToContract) public payable {
        if(msg.value > ((check * 25)/100)*10 ){
            revert("Tu aamir hai bhai humse na hopyega");
        }
        else{
           if(balances[tokenFundsAddress]>(check*75)/100 && balances[tokenFundsAddress] <= (check*100)/100){
           transfer(calculatedTokensPassingToContract);
           }
           else if( balances[tokenFundsAddress]>(check*50)/100 && balances[tokenFundsAddress] <= (check*75)/100){
            transfer(calculatedTokensPassingToContract/2);
           }
           else if( balances[tokenFundsAddress] > (check*25)/100 && balances[tokenFundsAddress] <= ((check*50)/100)){
               transfer(calculatedTokensPassingToContract/3);
           }
           else if(balances[tokenFundsAddress] > (check*1)/100 && balances[tokenFundsAddress] <= (check*25)/100){
               transfer(calculatedTokensPassingToContract/4);
           }
        }
    }
}