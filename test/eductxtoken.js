const EductxToken = artifacts.require("./EduCTXtoken");
const RegisteredUser = artifacts.require("./RegisteredUser");
const EduCTXca = artifacts.require("./ca/EduCTXca");
const truffleAssert = require('truffle-assertions');
const ethUtil = require('ethereumjs-util');
const init = require('../other/init_test');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
var privateKeys = [
    '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3',
    '0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f',
    '0x0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1',
    '0xc88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c',
    '0x388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418',
    '0x659cbb0e2411a44db63778987b1e22153c086a95eb6b18bdf89de078917abc63',
    '0x82d052c865f5763aad42add438569276c00d3d88a2d062d36b2bae914d58b8c8',
    '0xaa3680d5d48a8283413f7a108367c7299ca73f553735860a87b08f39395618b7',
    '0x0f62d96d6675f32685bbdb8ac13cda7c23436f63efbb9d07700d8669ff12b7c4',
    '0x8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5'
];


contract("EductxToken.sol issuing and revoking tests", async accounts => {

    const systemOwner = accounts[0];

    const user1 = accounts[1];
    const pubKey1 = new Buffer(ethUtil.privateToPublic(privateKeys[1]));
    const userPub1 = '0x' + pubKey1.toString('hex');

    const ca1 = accounts[2];

    const ca1Authorized1 = accounts[3];

    before(async () => {

        await init.initEduCTXtoken(systemOwner);
        await init.initRegisteredUser(systemOwner);
        await init.initCa(systemOwner);

    });


    // CERTIFICATE IS ISSUED, TOKENID: 1
    it("Transaction must succeed - certificate is issued", async () => {
        const instanceEductxToken = await EductxToken.deployed();
        const instanceRegisteredUser = await RegisteredUser.deployed();
        const instanceEduCTXca = await EduCTXca.deployed();
        await instanceRegisteredUser.registerUser(user1, userPub1, 12345678, { from: user1 });
        const totalSupplyBefore = await instanceEductxToken.totalSupply.call();
        const userID = await instanceRegisteredUser.getIDbyAddress.call(user1);
        await instanceEduCTXca.addCa(ca1, "hash", { from: systemOwner });
        const isCa = await instanceEduCTXca.isCa(ca1);
        let issuedCerts = await instanceEductxToken.getIssuedTokensByCa(ca1);
        assert.equal(
            isCa,
            true,
            "Address is not ca."
        );

        assert.equal(
            issuedCerts.length,
            0,
            "Number of issued certs are not 0."
        );

        await instanceEductxToken.issueCertificate(userID, "hash", "uri", { from: ca1 });
        const totalSupplyAfter = await instanceEductxToken.totalSupply();
        issuedCerts = await instanceEductxToken.getIssuedTokensByCa(ca1);
        assert.equal(
            totalSupplyAfter.toNumber(),
            totalSupplyBefore.toNumber() + 1,
            "Supply did not raise"
        );

        assert.equal(
            issuedCerts.length,
            1,
            "Number of issued certs are not 1."
        );
    });

    it("Transaction must fail - user si not registered yet", async () => {
        const instanceEductxToken = await EductxToken.deployed();

        await truffleAssert.reverts(
            instanceEductxToken.issueCertificate(2, "hash", "uri", { from: ca1 })
        );
    });

    it("Transaction must fail - account is not CA", async () => {
        const instanceEductxToken = await EductxToken.deployed();

        await truffleAssert.reverts(
            instanceEductxToken.issueCertificate(1, "hash", "uri", { from: accounts[9] })
        );
    });

    it("Transaction must fail - account is not authorized by ca for issuing", async () => {
        const instanceEductxToken = await EductxToken.deployed();

        await truffleAssert.reverts(
            instanceEductxToken.issueCertificateAuthorizedAddress(1, "hash", "uri", { from: ca1 })
        );
    });

    // CERTIFICATE IS ISSUED, TOKENID: 2

    it("Transaction must succeed - certificate is issued by authorized address", async () => {

        const instanceEductxToken = await EductxToken.deployed();
        const instanceRegisteredUser = await RegisteredUser.deployed();
        const instanceEduCTXca = await EduCTXca.deployed();
        let issuedCertsByAuthorizedAddress = await instanceEductxToken.getIssuedTokensByAuthorizedAddress(ca1Authorized1);
        const totalSupplyBefore = await instanceEductxToken.totalSupply.call();
        const userID = await instanceRegisteredUser.getIDbyAddress.call(user1);
        await instanceEduCTXca.addAuthorizedAddress(ca1Authorized1, { from: ca1 });
        const isAuthoried = await instanceEduCTXca.isAuthorizedAddress(ca1Authorized1);
        let issuedCerts = await instanceEductxToken.getIssuedTokensByCa(ca1);

        assert.equal(
            isAuthoried,
            true,
            "Address is not authorized."
        );
        assert.equal(
            issuedCerts.length,
            1,
            "Number of issued certs are not 1."
        );

        assert.equal(
            issuedCertsByAuthorizedAddress.length,
            0,
            "Number of issued certs by authorized address is not 0."
        );
        await instanceEductxToken.issueCertificateAuthorizedAddress(userID, "hash", "uri", { from: ca1Authorized1 });
        issuedCerts = await instanceEductxToken.getIssuedTokensByCa(ca1);
        issuedCertsByAuthorizedAddress = await instanceEductxToken.getIssuedTokensByAuthorizedAddress(ca1Authorized1);
        const totalSupplyAfter = await instanceEductxToken.totalSupply();
        assert.equal(
            totalSupplyAfter.toNumber(),
            totalSupplyBefore.toNumber() + 1,
            "Supply did not raise"
        );
        assert.equal(
            issuedCerts.length,
            2,
            "Number of issued certs are not 2."
        );
        assert.equal(
            issuedCertsByAuthorizedAddress.length,
            1,
            "Number of issued certs by authorized address is not 1."
        );
    });

    it("Transaction must fail - certificate cannot be removed, becaue it does not exists", async () => {
        const instanceEductxToken = await EductxToken.deployed();

        await truffleAssert.reverts(
            instanceEductxToken.revokeCertificate(3, { from: ca1 })
        );
    });

    it("Transaction must fail - certificate cannot be removed by any other user then CA, that issued", async () => {
        const instanceEductxToken = await EductxToken.deployed();

        await truffleAssert.reverts(
            instanceEductxToken.revokeCertificate(2, { from: user1 })
        );
        await truffleAssert.reverts(
            instanceEductxToken.revokeCertificate(2, { from: systemOwner })
        );
        await truffleAssert.reverts(
            instanceEductxToken.revokeCertificate(2, { from: ca1Authorized1 })
        );
    });

    // CERTIFICATE IS REMOVED, TOKENID: 2
    it("Transaction must succeed - certificate is removed by CA, that issued the cert", async () => {

        const instanceEductxToken = await EductxToken.deployed();
        let issuedCerts = await instanceEductxToken.getIssuedTokensByCa(ca1);
        let issuedCertsByAuthorizedAddress = await instanceEductxToken.getIssuedTokensByAuthorizedAddress(ca1Authorized1);
        assert.equal(
            issuedCerts.length,
            2,
            "Number of certs does not equal 2"
        );
        assert.equal(
            issuedCertsByAuthorizedAddress.length,
            1,
            "Number of issued certs by authorized address is not 1."
        );
        const totalSupplyBefore = await instanceEductxToken.totalSupply.call();
        await instanceEductxToken.revokeCertificate(2, { from: ca1 });
        const totalSupplyAfter = await instanceEductxToken.totalSupply();
        issuedCerts = await instanceEductxToken.getIssuedTokensByCa(ca1);
        issuedCertsByAuthorizedAddress = await instanceEductxToken.getIssuedTokensByAuthorizedAddress(ca1Authorized1);
        assert.equal(
            issuedCerts.length,
            1,
            "Number of certs does not equal 1"
        );
        assert.equal(
            totalSupplyAfter.toNumber(),
            totalSupplyBefore.toNumber() - 1,
            "Supply did not lower"
        );
        assert.equal(
            issuedCertsByAuthorizedAddress.length,
            0,
            "Number of issued certs by authorized address is not 0."
        );
    });

    it("Transaction must fail - certificate has already been removed", async () => {

        const instanceEductxToken = await EductxToken.deployed();
        await truffleAssert.reverts(
            instanceEductxToken.revokeCertificate(2, { from: ca1 })
        );
    });

    // CERTIFICATE IS ISSUED, TOKENID: 3
    it("Transaction must succeed - certificate is issued with token id 3", async () => {

        const instanceEductxToken = await EductxToken.deployed();
        const instanceRegisteredUser = await RegisteredUser.deployed();
        let issuedCerts = await instanceEductxToken.getIssuedTokensByCa(ca1);
        assert.equal(
            issuedCerts.length,
            1,
            "Number of certs does not equal 1"
        );
        const userID = await instanceRegisteredUser.getIDbyAddress.call(user1);
        await instanceEductxToken.issueCertificate(userID, "token id 3", "uri", { from: ca1 });

        const balanceOf = await instanceEductxToken.balanceOf(user1);
        const tokenOfOwnerByIndex = await instanceEductxToken.tokenOfOwnerByIndex(user1, balanceOf - 1);
        const tokenDataHash = await instanceEductxToken.tokenDataHash(tokenOfOwnerByIndex);
        issuedCerts = await instanceEductxToken.getIssuedTokensByCa(ca1);
        assert.equal(
            issuedCerts.length,
            2,
            "Number of certs does not equal 2"
        );
        assert.equal(
            tokenDataHash,
            'token id 3',
            "Data hash is not equal"
        );

        assert.equal(
            tokenOfOwnerByIndex,
            3,
            "Token ID is not 3"
        );
    });
});