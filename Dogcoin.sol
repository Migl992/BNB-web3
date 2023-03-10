// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;
//Create a contract called DogCoin.
contract Dogcoin {
    string public name = "Doggocoin";
    string public symbol = "DOG";
//Declare an address variable called owner . this address will be allowed to change the total supply
    address public owner;
//Create an event that emits the new value whenever the total supply changes. When the supply changes, emit this event.
    event TotalSupplyChanged(uint256 totalSupply, string message);
    event DisplayTransfer(uint256 amount, address recipient);
//Create a constructor to initialise the state of the contract and within the constructor, store the owner's address.
// change the constructor, to give all of the total supply to the owner of the contract.
    constructor() {
        owner = msg.sender;
        balances[owner] = totalSupply;
    }
//Create a modifier which only allows an owner to execute certain functions.
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }  
// In order to keep track of user balances, we need to associate a user's
// address with the balance that they have.
// a) What is the best data structure to hold this association ?
// b) Using your choice of data structure, set up a variable called balances to
// keep track of the number of tokens that a user has.
//  We want to allow the balances variable to be read from the contract, there
// are 2 ways to do this.
// What are those ways ?
// Use one of the ways to make your balances variable visible to users of the
// contract.
    mapping (address => uint256) public balances;
// We want to keep a record for each user's transfers. Create a struct called
// movement that stores the transfer amount and the recipient's address.
    struct movement {
        address recipient;
        uint256 amount;  
    }
// We want to have a movement array for each user sending the payment.
// Create a mapping which returns an array of movements structs when given this
// user's address
    mapping (address => movement[]) movements;


//Create a variable to hold the total supply, with an initial amount of 2 million
    uint256 public totalSupply = 2000000;
//Make a public function that returns the total supply.
    function returnTotalSupply() public view returns (uint256) {
        return totalSupply;
    }
// Make a public function that can increase the total supply in steps of 1000.
// Make your change total supply function public , but add your modifier so that only the owner can execute it.
    function increaseTotalSupply() public onlyOwner{
        uint amountToIncrease = 1000;
        totalSupply += amountToIncrease;
        emit TotalSupplyChanged(totalSupply, "Total supply increased by 1000");
    }
// add a public function called transfer to allow a user to transfer their
// tokens to another address. This function should have 2 parameters :the amount to transfer and the recipient address.
// Add an event to the transfer function to indicate that a transfer has taken
// place, it should log the amount and the recipient address.
    function transfer(address recipient, uint256 amount) public{
        require(balances[msg.sender] >= amount, "You do not have enough tokens");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        movements[msg.sender].push(movement({ amount: amount, recipient: recipient }));
        emit DisplayTransfer(amount, recipient);
        

    }


}
