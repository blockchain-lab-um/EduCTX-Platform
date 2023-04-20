var EduCTXca = artifacts.require("./ca/EduCTXca");
const truffleAssert = require('truffle-assertions');
const init = require('../other/init_test');

contract("Eductxca.sol tests", async accounts => {

    const systemOwner = accounts[0]
    const caAddress1 = accounts[0];
    const caAddress2 = accounts[1];
    const authorizedAddress1CA1 = accounts[2];
    const authorizedAddress1CA2 = accounts[3];

    before(async () => {
        await init.initCa(systemOwner);
    });

    it("Transaction must succeed - system owner added CA to ca address list", async () => {
        const instance = await EduCTXca.deployed();
        await instance.addCa(caAddress1, "IPFSURI", { from: systemOwner });
        const isCa = await instance.isCa.call(caAddress1);
        const caMetadata = await instance.getCaMetadataURI.call(caAddress1);
        const caArray = await instance.getAllCa();
        assert.equal(
            caArray.length,
            1,
            "Not the expected length"
        );
        assert.equal(
            isCa,
            true,
            "Added address is not on CA address list"
        );
        assert.equal(
            caMetadata,
            "IPFSURI",
            "Metadata does not match"
        );
    });

    it("Transaction must revert - address who wants to add CA is not system owner", async () => {
        const instance = await EduCTXca.deployed();
        await truffleAssert.reverts(
            instance.addCa(caAddress1, "IPFSURI", { from: caAddress1 })
        );
    });

    it("Transaction must revert - address already exists on CA list", async () => {
        const instance = await EduCTXca.deployed();
        await truffleAssert.reverts(
            instance.addCa(caAddress1, "IPFSURI", { from: systemOwner })
        );
    });

    it("Transaction must succeed - system owner remove CA to from address list", async () => {
        const instance = await EduCTXca.deployed();
        let isCa = await instance.isCa.call(caAddress1);
        assert.equal(
            isCa,
            true,
            "Added address is on not"
        );
        await instance.removeCa(caAddress1, { from: systemOwner });
        isCa = await instance.isCa.call(caAddress1);
        const allCa = await instance.getAllCa();
        assert.equal(
            isCa,
            false,
            "Added address is on CA address list"
        );

        assert.equal(
            allCa,
            0,
            "Added address is on CA address list"
        );
    });

    it("Transaction must revert - address who wants to remove from list is not system owner", async () => {
        const instance = await EduCTXca.deployed();
        await truffleAssert.reverts(
            instance.removeCa(caAddress1, { from: caAddress1 })
        );
    });

    it("Transaction must revert - system owner can't add authorized address on list", async () => {
        const instance = await EduCTXca.deployed();
        await truffleAssert.reverts(
            instance.addAuthorizedAddress(caAddress1, { from: systemOwner })
        );
    });

    it("Transaction must succeed - CA added address as authorized", async () => {
        const instance = await EduCTXca.deployed();
        await instance.addCa(caAddress1, "IPFSURI", { from: systemOwner });
        await instance.addAuthorizedAddress(authorizedAddress1CA1, { from: caAddress1 });
        const isAuthorized = await instance.isAuthorizedAddress.call(authorizedAddress1CA1);
        const address = await instance.getAuthorizedAddressCa.call(authorizedAddress1CA1);
        assert.equal(
            isAuthorized,
            true,
            "Added address is not authorized"
        );
        assert.equal(
            address,
            caAddress1,
            "Addresess are not equal"
        );
    });

    it("Transaction must revert - CA can only delete the address that it itself authorize", async () => {
        const instance = await EduCTXca.deployed();
        await instance.addCa(caAddress2, "IPFSURI", { from: systemOwner });
        await truffleAssert.reverts(
            instance.removeAuthorizedAddress(authorizedAddress1CA1, { from: caAddress2 })
        );
    });

    it("Transaction must succeed - CA can delete the address that it itself authorize", async () => {
        const instance = await EduCTXca.deployed();
        await instance.removeAuthorizedAddress(authorizedAddress1CA1, { from: caAddress1 });
        const isAuthorized = await instance.isAuthorizedAddress.call(authorizedAddress1CA1);
        assert.equal(
            isAuthorized,
            false,
            "Added address is on CA address list"
        );
    });

    it("Transaction must succeed - if CA is removed, it's authorized addresses became unauthorized", async () => {
        const instance = await EduCTXca.deployed();
        await instance.addAuthorizedAddress(authorizedAddress1CA2, { from: caAddress2 });
        await instance.removeCa(caAddress2, { from: systemOwner });
        const isAuthorized = await instance.isAuthorizedAddress.call(authorizedAddress1CA2);
        assert.equal(
            isAuthorized,
            false,
            "Added address is on CA address list"
        );
    });

    it("Transaction must succeed - CA can change its metadata URI", async () => {
        const instance = await EduCTXca.deployed();
        await instance.changeMetadataURI("new metadata uri", { from: caAddress1 })
        const caMetaDataURI = await instance.getCaMetadataURI(caAddress1);
        assert.equal(
            caMetaDataURI,
            "new metadata uri",
            "Metadata uri is not equal"
        );
    });

    it("Transaction must fail - Only CA can change its metadata URI", async () => {
        const instance = await EduCTXca.deployed();
        await truffleAssert.reverts(
            instance.changeMetadataURI("new metadata uri", { from: authorizedAddress1CA2 })
        );
    });

});