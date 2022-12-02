// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;

contract CoinFlip {

    address payable owner ;
    address payable user ;
    mapping(address => uint256) account ;

    constructor(){
        owner = payable (msg.sender);
    }

    function fundOwner() public payable returns(bool){
        require(msg.sender == owner , "You are Not Owner");
        require(msg.value != 0 , "Fund The Contract");
        account[msg.sender] += msg.value ;
        return true ;
    }

    function bet() public payable returns(bool){
        user = payable(msg.sender);
        require(user != owner , "Owner Can't Call This Function");
        require(account[owner] > 0 , "Owner Have Not Funded The Contract");
        require(account[owner] >= 2*(msg.value) ," Enter Half Amount Of Your Current Amount");
        require(msg.value != 0 , "Fund Your Wallet");
        account[user] = msg.value ;
        account[owner] += msg.value ;
        return true ;
    }

    function flip() public returns (string memory) {
        require(account[user] > 0 , "Fund Your Wallet" );
        require(account[owner] > 0 , "Owner Have Not Funded The Contract");
        require(account[user]*2 <= account[owner] , "Enter Half Amount Of Your Current Amount");
        uint256 nova = block.timestamp;
        uint256 randNonce = 0;
        uint256 random = uint256(keccak256(abi.encodePacked(nova, msg.sender, randNonce))) % 100;
        randNonce++;
        uint256 random2 = uint256(keccak256(abi.encodePacked(random, msg.sender, randNonce))) % 100;
        if (random2 > 59) {
            uint256 ls = account[user];
            user.transfer(ls*2);
            account[owner] = account[owner] - 2*ls ;
            account[user] =  0 ; //comment on production
            return "User Win";
        } else {
            account[user] = 0;
            return "User Loose";
        }
    }

    function ownerfund() public view returns(uint){
        return account[owner];
    }

    function userFund_() public view returns(uint){
        return account[user];
    }
}

