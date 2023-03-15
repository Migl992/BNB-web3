const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("BadgerNFT", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function contractIn() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BadgerNFT = await hre.ethers.getContractFactory("BadgerNFT");
    const Badger = await BadgerNFT.deploy();

    return { Badger, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Deploy ok", async function () {
      const { Badger } = await loadFixture(contractIn);

      console.log(Badger.address);
    });

    it("Should set the right owner", async function () {
      const { Badger , owner} = await loadFixture(contractIn);

      expect(await Badger.owner()).to.equal(owner.address);
    });
  });
  describe("Minting", () => {
    it("mints an NFT successfully to the owner", async () => {
      const { Badger, owner} = await loadFixture(
        contractIn 
      );

      await Badger.safeMint(owner.address); // mint an NFT to the owner

      assert.equal(await Badger.balanceOf(owner.address), 1); // check that the account balance of the owner is correct having minted 1 NFT
    });

    it("mints and transfers NFT successfully from the owner to another account", async () => {
      const { Badger, owner, otherAccount } = await loadFixture(
        contractIn
      );

      await Badger.safeMint(owner.address); // mint an NFT to the owner
      await Badger.safeMint(owner.address); // mint an NFT to the owner

      await Badger.transferFrom(owner.address, otherAccount.address, 1); // transfer the minted NFT from the owner to the otherAccount

      assert.equal(await Badger.balanceOf(otherAccount.address), 1); // check that the account balance of the otherAccount is correct having received 1 NFT

      // Uncomment these to ensure that both the owner and otherAccount hold 1 NFT
      // console.log(await contract.balanceOf(owner.address));
      // console.log(await contract.balanceOf(otherAccount.address));
    });
  });
});



