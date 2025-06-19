// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30 < 0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

/**
 * @title Josh Business Card NFT
 * @author Josh
 * @notice This contract is a simple ERC721 token for the purpose of mint my Business Card NFT.
 * @dev This contract is used to represent an ERC721 Token created to mint an NFT.
 */
contract JoshBusinessCardNFT is ERC721, Ownable {
    IERC20 public immutable paymentToken;
    uint256 public tokenPrice = 100 * 10 ** 18;
    uint256 private _currentIndex;

    string public constant JOSH_NAME = "Josh";
    string public constant JOSH_TITLE = "Frontend & Web3 Developer";
    string public constant JOSH_PORTFOLIO = "https://josh-alot.sh";
    string public constant JOSH_GITHUB = "https://github.com/Josh-Alot";
    string public constant JOSH_LINKEDIN =
        "https://linkedin.com/in/lucasmendes2020";
    string public constant JOSH_EMAIL = "josh@example.com";
    string public constant JOSH_BIO =
        "Frontend developer with passion for Web3 technology";

    struct BusinessCardMetadata {
        string recipientName;
        string personalMessage;
        uint256 mintedAt;
        address minter;
    }

    mapping(uint256 => BusinessCardMetadata) public businessCards;

    event BusinessCardMinted(
        uint256 indexed tokenId,
        address indexed minter,
        string recipientName
    );

    constructor(
        address _paymentToken
    ) ERC721("Josh Business Card NFT", "JBCNFT") Ownable(msg.sender) {
        paymentToken = IERC20(_paymentToken);
    }

    function mintBusinessCard(
        string calldata recipientName,
        string calldata personalMessage
    ) external {
        require(
            paymentToken.transferFrom(msg.sender, owner(), tokenPrice),
            "Payment failed"
        );

        uint256 tokenId;
        unchecked {
            tokenId = _currentIndex++;
        }
        _safeMint(msg.sender, tokenId);

        businessCards[tokenId] = BusinessCardMetadata({
            recipientName: recipientName,
            personalMessage: personalMessage,
            mintedAt: block.timestamp,
            minter: msg.sender
        });

        emit BusinessCardMinted(tokenId, msg.sender, recipientName);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);
        BusinessCardMetadata storage metadata = businessCards[tokenId];

        string memory json = string(
            abi.encodePacked(
                '{"name": "',
                JOSH_NAME,
                " - Business Card #",
                Strings.toString(tokenId),
                '",',
                '"description": "',
                bytes(metadata.personalMessage).length > 0
                    ? string(abi.encodePacked())
                    : string(
                        abi.encodePacked(
                            "Josh's digital business card for ",
                            metadata.recipientName
                        )
                    ),
                '",',
                '"image": "https://your-portfolio-domain.com/business-card-image.png",', // TODO: get some random color for the background
                '"external_url": "',
                JOSH_PORTFOLIO,
                '",',
                '"attributes": [',
                '{"trait_type": "Name", "value": "',
                JOSH_NAME,
                '"},',
                '{"trait_type": "Title", "value": "',
                JOSH_TITLE,
                '"},',
                '{"trait_type": "Portfolio", "value": "',
                JOSH_PORTFOLIO,
                '"},',
                '{"trait_type": "GitHub", "value": "',
                JOSH_GITHUB,
                '"},',
                '{"trait_type": "LinkedIn", "value": "',
                JOSH_LINKEDIN,
                '"},',
                '{"trait_type": "Email", "value": "',
                JOSH_EMAIL,
                '"},',
                '{"trait_type": "Recipient", "value": "',
                metadata.recipientName,
                '"},',
                '{"trait_type": "Minted At", "value": "',
                Strings.toString(metadata.mintedAt),
                '"}',
                "]}"
            )
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(bytes(json))
                )
            );
    }

    function getTotalSupply() external view returns (uint256) {
        return _currentIndex;
    }

    function setTokenPrice(uint256 _newPrice) external onlyOwner {
        tokenPrice = _newPrice;
    }
}
