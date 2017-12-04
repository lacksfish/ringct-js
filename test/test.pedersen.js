var pedersenCommitment = require('../src/crypto').pedersenCommitment;
var assert = require('assert');
var bigInt = require('big-integer');

var crypto = require('../src/crypto');

var ec = crypto.ec;

describe('Pedersen Commitments', function () {
    it('should return zero as a number', function () {
        var privkeys_in = [];
        var amounts_in = [];
        var commitments_in = [];

        // CRAFT INPUTS
        for (var i = 0; i < 3; i++) {
            // Rand amount between 1 and 10
            amounts_in.push(Math.floor((Math.random() * 10) + 1));
        }

        for (var j = 0; j < 3; j++) {
            var key = ec.genKeyPair();
            var privkey = key.getPrivate().toString('hex');

            privkeys_in.push(privkey);
            var commitment_i = pedersenCommitment(privkey, amounts_in[j]);
            commitments_in.push(new bigInt(commitment_i, 16));
        }

        // CRAFT OUTPUTS
        var privkeys_out = [];
        var amounts_out = [];
        var commitments_out = [];

        for (i = 0; i < 2; i++) {
            // Rand amount between 1 and 10
            amounts_out.push(Math.floor((Math.random() * 10) + 1));
        }
        // Last commitment has to bring randVals/privkeys to 0
        amounts_out.push(amounts_in.reduce(function (a, b) {return a+b}) - amounts_out.reduce(function (a, b) {return a+b}));

        for (j = 0; j < 3; j++) {
            var key = ec.genKeyPair();
            var privkey = key.getPrivate().toString('hex');

            privkeys_out.push(privkey);
            var commitment_i = pedersenCommitment(privkey, amounts_out[j]);
            commitments_out.push(new bigInt(commitment_i, 16));
        }

        var shouldBeZero = commitments_in.reduce(function (a, b) {return a.add(b)}) - commitments_out.reduce(function (a, b) {return a.add(b)});

        console.log('this should be zero:' + shouldBeZero);
        assert.equal(shouldBeZero, 0);
    });
});