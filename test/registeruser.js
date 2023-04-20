const RegisteredUser = artifacts.require("./RegisteredUser");
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

contract("RegisteredUser.sol tests", async accounts => {

    const systemOwner = accounts[0]

    const userAddress1 = accounts[1];
    const userAddress2 = accounts[2];
    const userAddress3 = accounts[3];

    const pubKey1 = new Buffer(ethUtil.privateToPublic(privateKeys[1]));
    const userAddress1PublicKey = '0x' + pubKey1.toString('hex');

    const pubKey2 = new Buffer(ethUtil.privateToPublic(privateKeys[2]));
    const userAddress2PublicKey = '0x' + pubKey2.toString('hex');

    const pubKey3 = new Buffer(ethUtil.privateToPublic(privateKeys[3]));
    const userAddress3PublicKey = '0x' + pubKey3.toString('hex');

    before(async () => {
        await init.initRegisteredUser(systemOwner);
    });

    it("Transaction must succeed - user is registered with address and public key", async () => {


        const instance = await RegisteredUser.deployed();
        await instance.registerUser(userAddress1, userAddress1PublicKey, 12345678, { from: userAddress1 });
        const userID = await instance.getIDbyAddress.call(userAddress1);
        const addressID = await instance.getAddressById.call(userID);
        const addressPUBKEY = await instance.getUserPubKeyById.call(userID);
        assert.equal(
            userID.toNumber(),
            12345678,
            "User ID is not correct"
        );
        assert.equal(
            addressID,
            userAddress1,
            "Address of id 1 is not correct"
        );
        assert.equal(
            addressPUBKEY,
            userAddress1PublicKey,
            "Pubkey of address 1 is not correct"
        );
    });

    it("Transaction must fail - user si already registered", async () => {
        const instance = await RegisteredUser.deployed();
        await truffleAssert.reverts(
            instance.registerUser(userAddress1, userAddress1PublicKey, 12345678, { from: userAddress1 })
        );
    });

    it("Transaction must succeed - user is registered with address and public key", async () => {
        const instance = await RegisteredUser.deployed();
        await instance.registerUser(userAddress2, userAddress2PublicKey, 12345679, { from: userAddress2 });
        const userID = await instance.getIDbyAddress.call(userAddress2);
        const addressID = await instance.getAddressById.call(userID);
        const addressPUBKEY = await instance.getUserPubKeyById.call(userID);
        assert.equal(
            userID.toNumber(),
            12345679,
            "User ID is not correct"
        );
        assert.equal(
            addressID,
            userAddress2,
            "Address of id 2 is not correct"
        );
        assert.equal(
            addressPUBKEY,
            userAddress2PublicKey,
            "Pubkey of address 2 is not correct"
        );
    });

    it("Transaction must fail - ID is already taken", async () => {
        const instance = await RegisteredUser.deployed();
        await truffleAssert.reverts(
            instance.registerUser(userAddress3, userAddress3PublicKey, 12345678, { from: userAddress3 })
        );
    });

    it("Transaction must succeed - user is registered with address and public key", async () => {
        const instance = await RegisteredUser.deployed();
        await instance.registerUser(userAddress3, userAddress3PublicKey, 12345670, { from: userAddress3 });
        const userID = await instance.getIDbyAddress.call(userAddress3);
        const addressID = await instance.getAddressById.call(userID);
        const addressPUBKEY = await instance.getUserPubKeyById.call(userID);
        assert.equal(
            userID.toNumber(),
            12345670,
            "User ID is not correct"
        );
        assert.equal(
            addressID,
            userAddress3,
            "Address of id 2 is not correct"
        );
        assert.equal(
            addressPUBKEY,
            userAddress3PublicKey,
            "Pubkey of address 2 is not correct"
        );
    });

});