import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Mint as MintEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  SetMarketplaceActive as SetMarketplaceActiveEvent,
  SetMarketplaceContractAddress as SetMarketplaceContractAddressEvent,
  Transfer as TransferEvent
} from "../generated/WordsNFT/WordsNFT"

import {
  Approval,
  ApprovalForAll,
  Mint,
  OwnershipTransferred,
  SetMarketplaceActive,
  SetMarketplaceContractAddress,
  Transfer
} from "../generated/schema"

import { Bytes, BigInt } from '@graphprotocol/graph-ts'

import { loadOrCreateTransaction } from "./utils/Transactions"

export function handleApproval(event: ApprovalEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new Approval(transaction.id)
  entity.transaction = transaction.id
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new ApprovalForAll(transaction.id)
  entity.transaction = transaction.id
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved
  entity.save()
}

export function handleMint(event: MintEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new Mint(transaction.id)
  entity.transaction = transaction.id
  entity.minter = event.params.minter
  entity.tokenId = event.params.tokenId
  entity.mintedTo = event.params.mintedTo
  entity.word = event.params.word
  entity.uri = event.params.uri
  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new OwnershipTransferred(transaction.id)
  entity.transaction = transaction.id
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}

export function handleSetMarketplaceActive(event: SetMarketplaceActiveEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new SetMarketplaceActive(transaction.id)
  entity.transaction = transaction.id
  entity.status = event.params.status
  entity.save()
}

export function handleSetMarketplaceContractAddress(event: SetMarketplaceContractAddressEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new SetMarketplaceContractAddress(transaction.id)
  entity.transaction = transaction.id
  entity.contractAddress = event.params.contractAddress
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block);
  let entity = new Transfer(transaction.id)
  entity.transaction = transaction.id
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.save()
}