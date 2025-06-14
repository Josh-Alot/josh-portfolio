// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "forge-std/Script.sol";
import "../src/JoshPortfolioToken.sol";
import "../src/JoshBusinessCardNFT.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        // 1. Deploy Josh Token primeiro
        JoshPortfolioToken token = new JoshPortfolioToken();
        console.log("Josh Token deployed at:", address(token));
        
        // 2. Deploy Business Card NFT
        JoshBusinessCardNFT businessCard = new JoshBusinessCardNFT(address(token));
        console.log("Josh Business Card NFT deployed at:", address(businessCard));
        
        // 3. Opcional: Transferir alguns tokens para teste
        token.transfer(msg.sender, 10000 * 10**18); // 10k tokens para teste
        console.log("Transferred 10k JOSH tokens to deployer for testing");
        
        vm.stopBroadcast();
        
        console.log("=== DEPLOYMENT SUMMARY ===");
        console.log("Network: Use 'forge script script/Deploy.s.sol --rpc-url <RPC_URL> --broadcast'");
        console.log("JOSH Token:", address(token));
        console.log("Business Card NFT:", address(businessCard));
    }
} 