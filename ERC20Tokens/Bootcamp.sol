// SPDX-License-Identifier: None
pragma solidity 0.8.19;


contract BootcampContract {

    uint256 number;
//Add a variable to hold the address of the deployer of the contracc
    address deployer;
// Update that variable with the deployer's address when the contract is
//deployed.
    constructor() {
        deployer = msg.sender;
    }

    function store(uint256 num) public {
        number = num;
    }


    function retrieve() public view returns (uint256){
        return number;
    }
//Write an external function to return
//1. Address 0x000000000000000000000000000000000000dEaD if called by
//the deployer
//2. The deployer's address otherwise
    function getDeployer() external view returns (address){
        if (msg.sender == deployer) {
            return 0x000000000000000000000000000000000000dEaD;
        }
        return deployer;
    }
}