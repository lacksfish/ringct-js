/**
 * Created by lacksfish on 17-10-17.
 */

var bigInt = require('big-integer');
var BN = require('bn.js');

var SHA256 = require('crypto-js/sha256');

var EC = require('elliptic').ec;
var ec = new EC('curve25519');

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
};

// G hex string representation - derived from chosing u = 9 in curve25519
var G = new bigInt("5866666666666666666666666666666666666666666666666666666666666666");
var H = G.multiply(123456);

/**
 * Swap endian format
 * @param val
 * @returns {number}
 */
function swap16(val) {
    return ((val & 0xFF) << 8)
        | ((val >> 8) & 0xFF);
}




function deterministicGenerateK(hash, x, checkSig) {
    
}


/**
 * Im just trying stuff here, ignore :)
 */


// https://bitcoin.stackexchange.com/questions/35814/how-do-you-derive-the-lambda-and-beta-values-for-endomorphism-on-the-secp256k1-c
var btcPval = new bigInt("7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee", 16);

// These params are used in confidential transactions as outlined by gmaxwell
// var H_x = new bigInt(SHA256(optionsMonero.g[0]), 16);
// var _H_pre = btcPval.next().divmod(4).quotient; // intermediary step for clarity
// var H_y = (H.multiply(3).add(7)).modPow(_H_pre, btcPval);

//var commitment = pedersenCommitment(privkey1.toString('hex'), 15);
//console.log(commitment.toString(16));

function pedersenCommitment(randVal, amount) {
    // C = xG + aH
    // C = h(randVal) * G + amount * H
    var part_1 = G.multiply(new bigInt(randVal.toString(), 16));
    var part_2 = H.multiply(amount);

    return part_1.add(part_2);
}

module.exports = {
    pedersenCommitment: pedersenCommitment,
    ec: ec
};