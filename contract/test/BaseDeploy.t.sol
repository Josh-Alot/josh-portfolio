// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30 < 0.9.0;

import "forge-std/Script.sol";
import "../src/JoshPortfolioToken.sol";
import "../src/JoshBusinessCardNFT.sol";

contract BaseDeployTest is Script {
    function run() external {
        address tokenAddress = vm.envAddress("TOKEN_ADDRESS");
        address nftAddress = vm.envAddress("NFT_ADDRESS");
        uint256 privateKey = vm.envUint("PRIVATE_KEY");

        JoshPortfolioToken token = JoshPortfolioToken(tokenAddress);
        JoshBusinessCardNFT nft = JoshBusinessCardNFT(nftAddress);

        console.log("=== TESTING THE DEPLOYED CONTRACTS ===");

        vm.startBroadcast(privateKey);

        // 1. Approve tokens for the NFT
        uint256 tokenPrice = nft.tokenPrice();
        token.approve(address(nft), tokenPrice);
        console.log("\u2705 Approved", tokenPrice / 10**18, "JPTK for NFT contract");

        // 2. Mint a test NFT
        nft.mintBusinessCard("Test User", "Testing Deployment on Base!");

        // 3. Checks balance
        uint256 nftBalance = nft.balanceOf(vm.addr(privateKey));
        console.log("\u2705 NFT Balance:", nftBalance);

        // 4. Checks metadata (take care on the gas limit)
        if (nftBalance > 0) {
            try nft.tokenURI(0) returns (string memory uri) {
                console.log("\u2705 Token URI generated successfully");
                console.log("URI:", uri);
            } catch {
                console.log("\u274C Failed to generate token URI");
            }
        }

        vm.stopBroadcast();

        console.log("=== TEST COMPLETED ===");
    }
}