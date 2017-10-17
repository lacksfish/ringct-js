/**
 * Created by lacksfish on 17-10-17.
 */

//var bigInt = require('big-integer');
var BN = require('bn.js');

var SHA256 = require('crypto-js/sha256');

var EC = require('elliptic').ec;
var ec = new EC('curve25519');

// G hex string representation - derived from chosing u = 9 in curve25519
var G = new BN("5866666666666666666666666666666666666666666666666666666666666666");
var H = G.mul(new BN(123456));

var optionsMonero = {
    type: 'edwards',
    prime: 'p25519',
    p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
    a: '-1',
    c: '1',
    // -121665 * (121666^(-1)) (mod P)
    d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
    n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
    //hash: hash.sha256,
    gRed: false,
    g: [
        '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

        // 4/5
        '6666666666666666666666666666666666666666666666666666666666666658'
    ]
}

var h = [

]

function deterministicGenerateK(hash, x, checkSig) {
    
}


/**
 * Im just trying stuff here, ignore :)
 */


var key1 = ec.genKeyPair();
var privkey1 = key1.getPrivate();

// https://bitcoin.stackexchange.com/questions/35814/how-do-you-derive-the-lambda-and-beta-values-for-endomorphism-on-the-secp256k1-c
var btcPval = new BN("7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee", 16);

console.log(SHA256(optionsMonero.g));

H_x = SHA256(optionsMonero.g);

// Hy =pow(int(H_x*H_x*H_x+7), int((btc.P+1)//4), int(btc.P))

var _H_pre = Math.floor(btcPval.add(new BN(1)).div(new BN(4))); // still needs


function pedersenCommitment(secret, randVal, privKey) {
    var hashSecret = SHA256(secret + randVal);
}