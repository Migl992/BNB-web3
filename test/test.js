const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");

describe("BadgerNFT", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function contractIn() {
    // deployOneYearLockFixture
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BadgerNFT = await ethers.getContractFactory("BadgerNFT");
    const badger = await BadgerNFT.deploy();

    return { badger, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("deploys OK", async () => {
      const { badger } = await loadFixture(contractIn);
      // const address = await smartContract.address;
      console.log(badger.address);
      // expect(contract.address).not.to.equal(0x0)

      assert.notEqual(badger.address, 0x0);
      assert.notEqual(badger.address, "");
    });

    it("Should set the right owner", async function () {
      const { badger, owner } = await loadFixture(contractIn);

      expect(await badger.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", () => {
    it("mints an NFT successfully to the owner", async () => {
      const { badger, owner } = await loadFixture(
        contractIn
      );

      await badger.safeMint(owner.address); // mint an NFT to the owner

      assert.equal(await badger.balanceOf(owner.address), 1); // check that the account balance of the owner is correct having minted 1 NFT
    });

    it("mints and transfers NFT from the owner to another account", async () => {
      const { badger, owner, otherAccount } = await loadFixture(
        contractIn
      );

      await badger.safeMint(owner.address); // mint an NFT to the owner
      await badger.safeMint(owner.address); // mint an NFT to the owner

      await badger.transferFrom(owner.address, otherAccount.address, 1); // transfer the minted NFT from the owner to the otherAccount

      assert.equal(await badger.balanceOf(otherAccount.address), 1); // check that the account balance of the otherAccount is correct having received 1 NFT

      // Uncomment these to ensure that both the owner and otherAccount hold 1 NFT
      // console.log(await contract.balanceOf(owner.address));
      // console.log(await contract.balanceOf(otherAccount.address));
    });
  });
});