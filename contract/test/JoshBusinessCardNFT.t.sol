// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "forge-std/Test.sol";
import "../src/JoshPortfolioToken.sol";
import "../src/JoshBusinessCardNFT.sol";

contract JoshBusinessCardNFTTest is Test {
    JoshPortfolioToken public token;
    JoshBusinessCardNFT public businessCard;
    
    address public owner = address(0x1);
    address public user = address(0x2);
    
    function setUp() public {
        vm.startPrank(owner);
        
        // Deploy contracts
        token = new JoshPortfolioToken();
        businessCard = new JoshBusinessCardNFT(address(token));
        
        // Give some tokens to user for testing
        token.transfer(user, 1000 * 10**18);
        
        vm.stopPrank();
    }
    
    function test_TokenDeployment() view public {
        assertEq(token.name(), "Josh Portfolio Token");
        assertEq(token.symbol(), "JPTK");
        assertEq(token.totalSupply(), 1_000_000 * 10**18);
    }
    
    function test_BusinessCardDeployment() view public {
        assertEq(businessCard.name(), "Josh Business Card NFT");
        assertEq(businessCard.symbol(), "JBCNFT");
        assertEq(businessCard.tokenPrice(), 100 * 10**18);
    }
    
    function test_BusinessCardConstants() view public {
        // Testando as constantes do Josh
        assertEq(businessCard.JOSH_NAME(), "Josh");
        assertEq(businessCard.JOSH_TITLE(), "Frontend & Web3 Developer");
        assertTrue(bytes(businessCard.JOSH_PORTFOLIO()).length > 0);
        assertTrue(bytes(businessCard.JOSH_EMAIL()).length > 0);
        assertTrue(bytes(businessCard.JOSH_GITHUB()).length > 0);
        assertTrue(bytes(businessCard.JOSH_LINKEDIN()).length > 0);
    }
    
    function test_MintBusinessCard() public {
        vm.startPrank(user);
        
        // Approve tokens
        token.approve(address(businessCard), 100 * 10**18);
        
        // Mint business card
        businessCard.mintBusinessCard(
            "John Doe",
            "Nice to meet you!"
        );
        
        // Check NFT was minted
        assertEq(businessCard.balanceOf(user), 1);
        assertEq(businessCard.ownerOf(0), user);
        
        // Check metadata
        (
            string memory recipientName,
            string memory personalMessage,
            uint256 mintedAt,
            address minter
        ) = businessCard.businessCards(0);
        
        assertEq(recipientName, "John Doe");
        assertEq(personalMessage, "Nice to meet you!");
        assertEq(minter, user);
        assertGt(mintedAt, 0);
        
        vm.stopPrank();
    }
    
    function test_PaymentTransfer() public {
        uint256 ownerBalanceBefore = token.balanceOf(owner);
        uint256 userBalanceBefore = token.balanceOf(user);
        
        vm.startPrank(user);
        token.approve(address(businessCard), 100 * 10**18);
        
        businessCard.mintBusinessCard(
            "Jane Doe",
            "Looking forward to working together!"
        );
        vm.stopPrank();
        
        // Check payment was transferred
        assertEq(token.balanceOf(owner), ownerBalanceBefore + 100 * 10**18);
        assertEq(token.balanceOf(user), userBalanceBefore - 100 * 10**18);
    }
    
    function test_MultipleMintsAndTokenIds() public {
        address alice = address(0x10);
        address bob = address(0x11);
        
        // Give tokens to test users
        vm.startPrank(owner);
        token.transfer(alice, 200 * 10**18);
        token.transfer(bob, 200 * 10**18);
        vm.stopPrank();
        
        // Alice mints first NFT (tokenId = 0)
        vm.startPrank(alice);
        token.approve(address(businessCard), 100 * 10**18);
        businessCard.mintBusinessCard("Alice Smith", "Hello from Alice!");
        vm.stopPrank();
        
        // Bob mints second NFT (tokenId = 1)
        vm.startPrank(bob);
        token.approve(address(businessCard), 100 * 10**18);
        businessCard.mintBusinessCard("Bob Johnson", "Hi Josh!");
        vm.stopPrank();
        
        // Check ownership
        assertEq(businessCard.balanceOf(alice), 1);
        assertEq(businessCard.balanceOf(bob), 1);
        assertEq(businessCard.ownerOf(0), alice);
        assertEq(businessCard.ownerOf(1), bob);
        
        // Check individual metadata
        (string memory name1, string memory msg1,,) = businessCard.businessCards(0);
        (string memory name2, string memory msg2,,) = businessCard.businessCards(1);
        
        assertEq(name1, "Alice Smith");
        assertEq(msg1, "Hello from Alice!");
        assertEq(name2, "Bob Johnson");
        assertEq(msg2, "Hi Josh!");
    }
    
    function test_InsufficientTokensFails() public {
        // User has 1000 tokens, let's transfer most away
        vm.startPrank(user);
        token.transfer(owner, 950 * 10**18); // User now has only 50 tokens
        
        token.approve(address(businessCard), 100 * 10**18);
        
        // Should fail because user doesn't have 100 tokens
        vm.expectRevert();
        businessCard.mintBusinessCard("Test User", "Should fail");
        
        vm.stopPrank();
    }
    
    function test_PriceChangeByOwner() public {
        // Only owner can change price
        vm.prank(owner);
        businessCard.setTokenPrice(200 * 10**18);
        
        assertEq(businessCard.tokenPrice(), 200 * 10**18);
        
        // Test minting with new price
        vm.startPrank(user);
        token.approve(address(businessCard), 200 * 10**18);
        businessCard.mintBusinessCard("Test User", "New price test");
        assertEq(businessCard.balanceOf(user), 1);
        vm.stopPrank();
    }
    
    function test_NonOwnerCannotChangePrice() public {
        vm.prank(user);
        vm.expectRevert();
        businessCard.setTokenPrice(50 * 10**18);
    }
} 