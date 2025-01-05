// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract RefugeeAid is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using Address for address payable;

    enum ListingType {
        Ask,
        Offer
    }
    enum ListingStatus {
        NonExistent,
        Active,
        Matched,
        Delivered,
        Cancelled
    }

    struct Listing {
        address creator;
        ListingType listingType;
        ListingStatus status;
        string descriptionHash; // IPFS hash of the description
        uint256 price; // payment amount (0 for free)
        uint256 duration; // Duration in seconds (0 for instant delivery)
        uint256 createdAt;
        address matchedWith; // counterparty
        uint256 deliveredAt;
    }

    struct User {
        uint256 askCount;
        uint256 offerCount;
        uint256 completedCount;
        uint256 earnings;
        bool isVerified;
    }

    mapping(uint256 => Listing) public listings;
    mapping(address => User) public users;

    uint256 public listingCounter;

    uint256 public constant MAX_DURATION = 365 days;
    uint256 public constant ACCEPTANCE_WINDOW = 7 days;

    event ListingCreated(
        uint256 indexed listingId,
        address indexed creator,
        ListingType listingType,
        string descriptionHash,
        uint256 duration,
        uint256 price,
        uint256 createdAt
    );
    event ListingCancelled(uint256 indexed listingId);
    event ListingMatched(
        uint256 indexed listingId,
        address indexed requester,
        address indexed provider
    );
    event ListingUnmatched(uint256 indexed listingId);
    event DeliveryAccepted(uint256 indexed listingId);
    event UserVerified(address indexed user, bool isVerified);
    event EarningsCollected(address indexed user, uint256 amount);
    event TokenSent(address indexed token, address indexed recipient, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function createListing(
        ListingType _type,
        string memory _descriptionHash,
        uint256 _price,
        uint256 _duration
    ) external {
        require(
            bytes(_descriptionHash).length > 0,
            "Description hash required"
        );
        require(_duration <= MAX_DURATION, "Duration too long");

        listingCounter++;
        Listing storage newListing = listings[listingCounter];
        newListing.creator = msg.sender;
        newListing.listingType = _type;
        newListing.status = ListingStatus.Active;
        newListing.descriptionHash = _descriptionHash;
        newListing.price = _price;
        newListing.duration = _duration;
        newListing.createdAt = block.timestamp;

        if (_type == ListingType.Ask) {
            users[msg.sender].askCount++;
        } else {
            users[msg.sender].offerCount++;
        }

        emit ListingCreated(
            listingCounter,
            msg.sender,
            _type,
            _descriptionHash,
            _duration,
            _price,
            block.timestamp
        );
    }

    function cancelListing(uint256 _listingId) public {
        Listing storage listing = listings[_listingId];
        require(
            listing.status == ListingStatus.Active,
            "Incorrect listing status"
        );
        require(
            msg.sender == listing.creator ||
            block.timestamp - listing.createdAt > ACCEPTANCE_WINDOW,
            "Not creator or not expired listing"
        );

        listing.status = ListingStatus.Cancelled;

        emit ListingCancelled(_listingId);
    }

    function matchListing(uint256 _listingId) external payable {
        Listing storage listing = listings[_listingId];
        require(
            listing.status == ListingStatus.Active,
            "Incorrect listing status"
        );
        require(msg.sender != listing.creator, "Cannot match own listing");
        require(msg.value == listing.price, "Invalid amount");

        listing.status = ListingStatus.Matched;
        listing.matchedWith = msg.sender;

        emit ListingMatched(_listingId, listing.creator, msg.sender);
    }

    function acceptDelivery(uint256 _listingId) external nonReentrant {
        Listing storage listing = listings[_listingId];
        require(
            listing.status == ListingStatus.Matched,
            "Incorrect listing status"
        );

        address receiver = listing.listingType == ListingType.Offer
            ? listing.matchedWith
            : listing.creator;
        address provider = listing.listingType == ListingType.Ask
            ? listing.matchedWith
            : listing.creator;
        require(msg.sender == receiver, "Not service receiver");

        listing.status = ListingStatus.Delivered;
        listing.deliveredAt = block.timestamp;

        users[receiver].completedCount++;
        users[provider].completedCount++;

        users[provider].earnings += listing.price;

        emit DeliveryAccepted(_listingId);
    }

    function collectEarnings() external nonReentrant {
        uint256 earnings = users[msg.sender].earnings;

        require(earnings > 0, "Nothing to collect");

        users[msg.sender].earnings = 0;
        _send(address(0), payable(msg.sender), earnings);

        emit EarningsCollected(msg.sender, earnings);
    }

    function getListingDetails(
        uint256 _listingId
    )
    external
    view
    returns (
        address creator,
        ListingType listingType,
        ListingStatus status,
        string memory descriptionHash,
        uint256 price,
        uint256 duration,
        uint256 createdAt,
        address matchedWith,
        uint256 deliveredAt
    )
    {
        Listing memory listing = listings[_listingId];
        return (
            listing.creator,
            listing.listingType,
            listing.status,
            listing.descriptionHash,
            listing.price,
            listing.duration,
            listing.createdAt,
            listing.matchedWith,
            listing.deliveredAt
        );
    }

    function getUserDetails(
        address _user
    )
    external
    view
    returns (
        uint256 askCount,
        uint256 offerCount,
        uint256 completedCount,
        uint256 earnings,
        bool isVerified
    )
    {
        User memory user = users[_user];
        return (
            user.askCount,
            user.offerCount,
            user.completedCount,
            user.earnings,
            user.isVerified
        );
    }

    /* OWNER FUNCTIONS */

    function verifyUser(address _user, bool _isVerified) external onlyOwner {
        users[_user].isVerified = _isVerified;

        emit UserVerified(_user, _isVerified);
    }

    function sendEth(address payable _recipient, uint256 _amount) public {
        send(address(0), _recipient, _amount);
    }

    function send(address _token, address payable _recipient, uint256 _amount) public onlyOwner {
        if (_token == address(0)) {
            uint256 balance = _amount > 0 ? _amount : address(this).balance;
            _send(address(0), _recipient, balance);
        } else {
            uint256 balance = _amount > 0 ? _amount : IERC20(_token).balanceOf(address(this));
            _send(_token, _recipient, balance);
        }
    }

    function _send(address _token, address payable _recipient, uint256 _amount) internal {
        if (_amount > 0) {
            if (_token == address(0)) {
                _recipient.sendValue(_amount);
            } else {
                IERC20(_token).safeTransfer(_recipient, _amount);
            }

            emit TokenSent(_token, _recipient, _amount);
        }
    }
}
