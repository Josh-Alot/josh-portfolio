// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title Josh Business Card NFT
 * @author Josh
 * @notice This contract is a simple ERC721 token for the purpose of mint my Business Card NFT.
 * @dev This contract is used to represent an ERC721 Token created to mint an NFT.
 */
contract JoshBusinessCardNFT is ERC721, ERC721URIStorage, Ownable {
    IERC20 public paymentToken;
    uint256 public tokenPrice = 100 * 10**18; // 100 PTK por NFT
    uint256 private _tokenIdCounter;

    string public constant JOSH_NAME = "Josh";
    string public constant JOSH_TITLE = "Frontend & Web3 Developer";
    string public constant JOSH_PORTFOLIO = "https://josh-alot.sh";
    string public constant JOSH_GITHUB = "https://github.com/Josh-Alot";
    string public constant JOSH_LINKEDIN = "https://linkedin.com/in/lucasmendes2020";
    string public constant JOSH_EMAIL = "josh@example.com";
    string public constant JOSH_BIO = "Frontend developer with passion for Web3 technology";
    
    struct BusinessCardMetadata {
        string recipientName;     // Nome de quem está recebendo o cartão
        string personalMessage;   // Mensagem personalizada
        uint256 mintedAt;         // Timestamp
        address minter;           // Quem mintou
    }

    mapping(uint256 => BusinessCardMetadata) public businessCards;

    event BusinessCardMinted(uint256 indexed tokenId, address indexed minter, string recipientName);

    constructor(address _paymentToken) ERC721("Josh Business Card NFT", "JBCNFT") Ownable(msg.sender) {
        paymentToken = IERC20(_paymentToken);
    }

    function mintBusinessCard(string memory recipientName, string memory personalMessage) external {
        require(paymentToken.transferFrom(msg.sender, owner(), tokenPrice), "Payment failed");

        uint256 tokenId = _tokenIdCounter++;
        _safeMint(msg.sender, tokenId);

        businessCards[tokenId] = BusinessCardMetadata({
            recipientName: recipientName,
            personalMessage: personalMessage,
            mintedAt: block.timestamp,
            minter: msg.sender
        });

        string memory uri = generateTokenURI(tokenId);
        _setTokenURI(tokenId, uri);

        emit BusinessCardMinted(tokenId, msg.sender, recipientName);
    }

    function generateTokenURI(uint256 tokenId) internal view returns (string memory) {
        BusinessCardMetadata memory metadata = businessCards[tokenId];
        
        string memory description = bytes(metadata.personalMessage).length > 0
            ? string(abi.encodePacked("Josh's digital business card for ", metadata.recipientName, ". Personal message: ", metadata.personalMessage))
            : string(abi.encodePacked("Josh's digital business card for ", metadata.recipientName));

        string memory json = string(abi.encodePacked(
            '{"name": "', JOSH_NAME, ' - Business Card #', Strings.toString(tokenId), '",',
            '"description": "', description, '",',
            '"image": "https://your-portfolio-domain.com/business-card-image.png",',
            '"external_url": "', JOSH_PORTFOLIO, '",',
            '"attributes": [',
                '{"trait_type": "Name", "value": "', JOSH_NAME, '"},',
                '{"trait_type": "Title", "value": "', JOSH_TITLE, '"},',
                '{"trait_type": "Portfolio", "value": "', JOSH_PORTFOLIO, '"},',
                '{"trait_type": "GitHub", "value": "', JOSH_GITHUB, '"},',
                '{"trait_type": "LinkedIn", "value": "', JOSH_LINKEDIN, '"},',
                '{"trait_type": "Email", "value": "', JOSH_EMAIL, '"},',
                '{"trait_type": "Recipient", "value": "', metadata.recipientName, '"},',
                '{"trait_type": "Minted At", "value": "', Strings.toString(metadata.mintedAt), '"}',
            ']}'
        ));

        return string(abi.encodePacked("data:application/json;base64,", _base64Encode(bytes(json))));
    }

    function setTokenPrice(uint256 _newPrice) external onlyOwner {
        tokenPrice = _newPrice;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _base64Encode(bytes memory data) internal pure returns (string memory) {
        string memory base64Table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

        if(data.length == 0) return "";

        string memory result = new string(4 * ((data.length + 2) / 3));
        bytes memory resultInBytes = bytes(result);

        uint256 i = 0;
        uint256 j = 0;

        for(; i + 3 <= data.length; i += 3) {
            uint256 a = uint256(uint8(data[i]));
            uint256 b = uint256(uint8(data[i + 1]));
            uint256 c = uint256(uint8(data[i + 2]));

            uint256 bitmap = (a << 16) | (b << 8) | c;

            resultInBytes[j++] = bytes1(uint8(bytes(base64Table)[bitmap >> 18]));
            resultInBytes[j++] = bytes1(uint8(bytes(base64Table)[(bitmap >> 12) & 63]));
            resultInBytes[j++] = bytes1(uint8(bytes(base64Table)[(bitmap >> 6) & 63]));
            resultInBytes[j++] = bytes1(uint8(bytes(base64Table)[bitmap & 63]));
        }

        if (data.length % 3 != 0) {
            uint256 a = uint256(uint8(data[i]));
            uint256 b = i + 1 < data.length ? uint256(uint8(data[i + 1])) : 0;

            uint256 bitmap = (a << 16) | (b << 8);

            resultInBytes[j++] = bytes1(uint8(bytes(base64Table)[bitmap >> 18]));
            resultInBytes[j++] = bytes1(uint8(bytes(base64Table)[(bitmap >> 12) & 63]));

            if (data.length % 3 == 2) {
                resultInBytes[j++] = bytes1(uint8(bytes(base64Table)[(bitmap >> 6) & 63]));
            } else {
                resultInBytes[j++] = "=";
            }

            resultInBytes[j++] = "=";
        }

        return result;
    }
}