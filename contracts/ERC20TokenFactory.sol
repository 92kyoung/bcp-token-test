// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ERC20Token.sol";

contract ERC20TokenFactory {
    address[] public deployedTokens; 

    function createNewToken(address initialOwner, string memory _name, string memory _symbol) public {
        ERC20Token newToken = new ERC20Token(initialOwner, _name, _symbol);
        deployedTokens.push(address(newToken)); 
    }

    function getDeployedTokens() public view returns (address[] memory) {
        return deployedTokens;
    }
}