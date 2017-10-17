
var ENGLISH_WORDLIST = require('./wordlists/english.json');

var unorm = require('unorm');


exports.mnemonicToSeed = function(mnemonic) {
    var mnemonicBuffer = Buffer.from(unorm.nfkd(mnemonic), 'UTF-8');
    return mnemonicBuffer;
};

