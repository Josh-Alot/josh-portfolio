// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30 < 0.9.0;

import "forge-std/Script.sol";

contract BaseDeployScript is Script {
    JoshPortfolioToken paymentToken;
    JoshBusinessCardNFT nft;

    function run() public {
        address deployer = vm.addr(vm.envUint("PRIVATE_KEY")); // gets the private key from the .env file

        console.log("=== JOSH PORTFOLIO DEPLOY ON BASE ===");
        console.log("Deployer: ", deployer);
        console.log("Deployer balance: ", deployer.balance);

        vm.startBroadcast();

        // 1. Deploying the Josh Portfolio Token Contract
        console.log("Deploying Josh Portfolio Token Contract...");
        paymentToken = new JoshPortfolioToken();
        console.log("✅ Josh Portfolio Token Contract deployed at: ", address(paymentToken));

        // 2. Deploying the Josh Business Card NFT Contract
        console.log("Deploying Josh Business Card NFT Contract...");
        nft = new JoshBusinessCardNFT(address(paymentToken));
        console.log("✅ Josh BusinessCard NFT Contract deployed at: ", address(nft));

        // 3. Testing the token deployed
        console.log("Setting up initial configurations... ");
        uint256 testTokens = 10_000 * 10**18;
        paymentToken.transfer(deployer, testTokens);
        console.log("✅ Transferred", testTokens / 10**18, "JPTK tokens to deployer");

        vm.stopBroadcast();

        // 4. Post deploy validations
        console.log("\n=== POST DEPLOY VALIDATIONS ===");
        console.log("Token name: ", paymentToken.name());
        console.log("Token symbol: ", paymentToken.symbol());
        console.log("Token total supply: ", paymentToken.totalSupply());
        console.log("================================");
        console.log("NFT name: ", nft.name());
        console.log("NFT symbol: ", nft.symbol());
        console.log("NFT token price: ", nft.tokenPrice());

        console.log("\n=== DEPLOYMENT SUMMARY ===");
        console.log("Network: Base");
        console.log("JPTK Token address: ", address(paymentToken));
        console.log("Business Card NFT address: ", address(nft));
        console.log("Total gas used: run 'cast receipt <txHash>' to check\n");

        // 5. Verification instructions
        console.log("=== VERIFICATION COMMANDS ===");
        console.log("forge verify-contract", address(paymentToken), "src/JoshPortfolioToken.sol:JoshPortfolioToken --chain base");
        console.log("forge verify-contract", address(nft), "src/JoshBusinessCardNFT.sol:JoshBusinessCardNFT --chain base");


        // TODO: create de deploy test file
    }
}