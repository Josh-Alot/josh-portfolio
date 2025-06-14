// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Josh Portfolio Token
 * @author Josh
 * @notice This contract is a simple ERC20 token for the purpose of mint my Business Card NFT.
 * @dev This contract is used to represent an ERC20 Token create as payment for an NFT mint.
 */
contract JoshPortfolioToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10**18; // 1 million tokens

    /**
     * @notice Constructor for the JoshPortfolioToken contract
     * @dev Initializes the token with the initial supply and sets the owner
     * @dev The owner is the address that will be able to mint new tokens
     */
    constructor() ERC20("Josh Portfolio Token", "JPTK") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @notice Mint new tokens
     * @dev to mint new tokens
     * @dev This function is used for the contract owner to be able to mint new tokens
     */
    function mint(address to, uint256 amount) external onlyOwner() {
        _mint(to, amount);
    }

    /**
     * @notice Permite ao owner queimar tokens
     * @param amount Quantidade de tokens a serem queimados
     */
    function burn(uint256 amount) external onlyOwner {
        _burn(msg.sender, amount);
    }
}