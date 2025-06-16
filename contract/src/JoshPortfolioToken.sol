// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JoshPortfolioToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10**18;

    constructor() ERC20("Josh Portfolio Token", "JPTK") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) external onlyOwner() {
        _mint(to, amount);
    }


    function burn(uint256 amount) external onlyOwner {
        _burn(msg.sender, amount);
    }
}