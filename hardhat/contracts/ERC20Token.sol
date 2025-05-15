// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol';

contract ERC20Token is
    ERC20,
    ERC20Burnable,
    ERC20Pausable,
    Ownable,
    ERC20Permit
{
    constructor(
        address initialOwner,
        string memory _name,
        string memory _symbol,
        uint256 initialSupply
    ) ERC20(_name, _symbol) Ownable(initialOwner) ERC20Permit(_name) {
        if (initialSupply > 0) {
            _mint(initialOwner, initialSupply);
        }
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    //batch 기능(custom)
    function batchMint(
        address[] calldata addresses,
        uint256[] calldata amounts
    ) public onlyOwner {
        require(addresses.length == amounts.length, 'Mismatched array lengths');
        require(addresses.length <= 100, 'Too many addresses'); // Optional: gas guard

        for (uint i = 0; i < addresses.length; ++i) {
            _mint(addresses[i], amounts[i]);
        }
    }

    function batchBurn(uint256[] calldata amounts) public onlyOwner {
        for (uint i = 0; i < amounts.length; ++i) {
            _burn(msg.sender, amounts[i]);
        }
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}

contract ERC20TokenFactory {
    address[] public deployedTokens;
    event TokenCreated(
        address tokenAddress,
        string name,
        string symbol,
        uint256 initialSupply,
        address initialOwner
    );

    function createNewToken(
        address initialOwner,
        string memory _name,
        string memory _symbol,
        uint256 initialSupply
    ) public {
        ERC20Token newToken = new ERC20Token(
            initialOwner,
            _name,
            _symbol,
            initialSupply
        );
        deployedTokens.push(address(newToken));
        emit TokenCreated(
            address(newToken),
            _name,
            _symbol,
            initialSupply,
            initialOwner
        );
    }

    function getDeployedTokens() public view returns (address[] memory) {
        return deployedTokens;
    }
}
