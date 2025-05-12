// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';

contract ERC721Token is
    ERC721,
    ERC721Pausable,
    Ownable,
    ERC721Burnable,
    ERC721URIStorage
{
   
    uint256 private _tokenIdCounter;

    constructor(
        address initialOwner,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) Ownable(initialOwner) {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    //Override
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Pausable) returns (address) {
        return super._update(to, tokenId, auth);
    }
    //Override
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    //Override
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}

contract ERC721TokenFactory {
    address[] public deployedTokens;

    function createNewNFT(
        address initialOwner,
        string memory _name,
        string memory _symbol
    ) public {
        ERC721Token newToken = new ERC721Token(initialOwner, _name, _symbol);
        deployedTokens.push(address(newToken));
    }

    function getDeployedNFTs() public view returns (address[] memory) {
        return deployedTokens;
    }
}
