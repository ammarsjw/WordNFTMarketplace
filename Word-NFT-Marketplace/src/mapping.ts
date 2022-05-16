import {
  OwnershipTransferred as OwnershipTransferredEvent,
  Expired as ExpiredEvent,
  ERC721Received as ERC721ReceivedEvent,
  Claimed as ClaimedEvent,
  ClaimedAndNoBidsMade as ClaimedAndNoBidsMadeEvent,
  ChangedWordsNFTAddress as ChangedWordsNFTAddressEvent,
  ChangedMarketplaceFeeWallet as ChangedMarketplaceFeeWalletEvent,
  ChangedFeePercentages as ChangedFeePercentagesEvent,
  BidMade as BidMadeEvent,
  BidCancelled as BidCancelledEvent,
  AuctionMade as AuctionMadeEvent,
  ExpiredAndNoBidsMade as ExpiredAndNoBidsMadeEvent,
} from "../generated/WordsNFTMarketplace/WordsNFTMarketplace"

import {
  OwnershipTransferred,
  Expired,
  ERC721Received,
  Claimed,
  ClaimedAndNoBidsMade,
  ChangedWordsNFTAddress,
  ChangedMarketplaceFeeWallet,
  ChangedFeePercentages,
  BidMade,
  BidCancelled,
  AuctionMade,
  ExpiredAndNoBidsMade
} from "../generated/schema"

import { Bytes, BigInt } from '@graphprotocol/graph-ts'

import { loadOrCreateTransaction } from "./utils/Transactions"

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new OwnershipTransferred(transaction.id)
  entity.transaction = transaction.id
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}

export function handleExpired(event: ExpiredEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new Expired(transaction.id)
  entity.transaction = transaction.id
  entity._bidder = event.params._bidder
  entity._minter = event.params._minter
  entity._amount = event.params._amount
  entity._tokenId = event.params._tokenId
  entity.save()
}

export function handleERC721Received(event: ERC721ReceivedEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new ERC721Received(transaction.id)
  entity.transaction = transaction.id
  entity._operator = event.params._operator
  entity._to = event.params._to
  entity._tokenId = event.params._tokenId
  entity.data = event.params.data
  entity.save()
}

export function handleClaimed(event: ClaimedEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new Claimed(transaction.id)
  entity.transaction = transaction.id
  entity._bidder = event.params._bidder
  entity._minter = event.params._minter
  entity._amount = event.params._amount
  entity._tokenId = event.params._tokenId
  entity.save()
}

export function handleClaimedAndNoBidsMade(event: ClaimedAndNoBidsMadeEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new ClaimedAndNoBidsMade(transaction.id)
  entity.transaction = transaction.id
  entity._minter = event.params._minter
  entity._tokenId = event.params._tokenId
  entity.save()
}


export function handleChangedWordsNFTAddress(event: ChangedWordsNFTAddressEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new ChangedWordsNFTAddress(transaction.id)
  entity.transaction = transaction.id
  entity._wordsNFTAddress = event.params._wordsNFTAddress
  entity.save()
}

export function handleChangedMarketplaceFeeWallet(event: ChangedMarketplaceFeeWalletEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new ChangedMarketplaceFeeWallet(transaction.id)
  entity.transaction = transaction.id
  entity._marketplaceFeeWallet = event.params._marketplaceFeeWallet
  entity.save()
}

export function handleChangedFeePercentages(event: ChangedFeePercentagesEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new ChangedFeePercentages(transaction.id)
  entity.transaction = transaction.id
  entity._marketplacePercentage = event.params._marketplacePercentage
  entity._minterPercentage = event.params._minterPercentage
  entity.save()
}

export function handleBidMade(event: BidMadeEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  // let id = event.params._bidder.toHexString().concat(event.params._tokenId.toString()).concat(event.params._amount.toString());
  let id = event.params._bidder.toHexString().concat(event.params._tokenId.toString());
  let entity = new BidMade(id);
  entity.transaction = transaction.id
  entity._bidder = event.params._bidder
  entity._amount = event.params._amount
  entity._tokenId = event.params._tokenId
  entity.save()
}

export function handleBidCancelled(event: BidCancelledEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let id = transaction.id;
  let entity = new BidCancelled(id)
  entity.transaction = transaction.id
  entity._bidder = event.params._bidder
  entity._amount = event.params._amount
  entity._tokenId = event.params._tokenId
  entity.save()

  // id = event.params._bidder.toHexString().concat(event.params._tokenId.toString()).concat(event.params._amount.toString());
  id = event.params._bidder.toHexString().concat(event.params._tokenId.toString());
  let bidToRemove = BidMade.load(id);
  if (bidToRemove) {
    bidToRemove._bidder = new Bytes(0)
    bidToRemove._tokenId = new BigInt(0)
    bidToRemove._amount = new BigInt(0)
    bidToRemove.save()
    bidToRemove.unset(id)
  }
}

export function handleAuctionMade(event: AuctionMadeEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new AuctionMade(transaction.id)
  entity.transaction = transaction.id
  entity._minter = event.params._minter
  entity._mintTime = event.params._mintTime
  entity._initialExpiryTime = event.params._initialExpiryTime
  entity._tokenId = event.params._tokenId
  entity.save()
}

export function handleExpiredAndNoBidsMade(event: ExpiredAndNoBidsMadeEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new ExpiredAndNoBidsMade(transaction.id)
  entity.transaction = transaction.id
  entity._minter = event.params._minter
  entity._tokenId = event.params._tokenId
  entity.save()
}