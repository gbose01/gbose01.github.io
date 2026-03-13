---
title: "Building MYNT - Minting NFTs for Startups on Polygon"
date: "2021-08-15"
description: "How I got my hands dirty with NFT minting in the summer of 2021, and why I chose Polygon for low fees and fast confirmations."
---

# Building MYNT: Minting NFTs for Startups on Polygon

**Summer 2021** — NFT mania was at its peak. Every day, you'd hear about another digital artist making millions, Bored Apes selling for six figures, and every brand under the sun rushing to launch their own collections. 

I wanted in. Not just as a buyer — I wanted to understand the technology from the inside out. I wanted to **issue** my own NFTs and **trade** them myself. I wanted to learn exactly how an NFT works under the hood: the smart contracts, the metadata, the minting process, and the deployment to a live blockchain.

That's how **MYNT** was born.

## Why Polygon?

When deciding where to deploy, Ethereum mainnet was out of the question. Gas fees in summer 2021 were absolutely insane — $50, $100, sometimes $200+ just to mint a single NFT. For a learning project? No thanks.

**Polygon** (formerly Matic Network) was the obvious choice:

- **Near-zero gas fees** — A fraction of a cent per transaction
- **Fast block times** — ~2 seconds vs ~15 minutes on Ethereum
- **EVM compatible** — Same tools, same smart contracts, just cheaper and faster
- **Alchemy support** — Great infrastructure with reliable RPC endpoints

Polygon let me iterate quickly without blowing through my savings.

## The Tech Stack

- **Hardhat** — Development environment for compiling, testing, and deploying Solidity contracts
- **Alchemy** — RPC provider for connecting to Polygon mainnet
- **OpenZeppelin** — Battle-tested ERC-721 contract templates
- **IPFS** — Decentralized storage for NFT metadata

### The Smart Contract

The contract is a simple ERC-721 implementation using OpenZeppelin's battle-tested libraries:

```solidity
contract MyNFT is ERC721, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping (uint256 => string) private _tokenURIs;
  
  function mint(address recipient, string memory uri) public returns (uint256) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(recipient, newItemId);
    _setTokenURI(newItemId, uri);
    return newItemId;
  }
}
```

Only the owner can mint new tokens, and each token gets its own metadata URI pointing to IPFS.

## What I Learned

1. **NFTs aren't just JPEGs** — They're smart contracts with metadata pointers. The image is just one part.
2. **Gas optimization matters** — On mainnet, inefficient code costs real money. Polygon made experimentation affordable.
3. **IPFS is essential** — You can't store images on-chain affordably. IPFS + a pinning service is the standard approach.
4. **Alchemy makes life easy** — Their infrastructure handled the Polygon RPC reliably without me needing to run my own node.

## The Result

MYNT lets founders create NFT representations of their startups — think of it as a digital "founder card" or startup equity tokenized as an NFT. Each startup gets:
- A tier (Gold, Silver, Platinum)
- A category
- Description and imagery stored on IPFS

The contract is deployed to Polygon mainnet, and minting costs practically nothing.

---

*This was a summer 2021 learning project. The NFT space has evolved a lot since then, but the fundamentals remain the same.*
