// Testing
var rsaHelpers = require('./main');

var keys = rsaHelpers.generateKeypair(100);
console.log(keys);
console.log('public key : ' + keys['public'][0]);
console.log('private key: ' + keys['private'][0]);
console.log('modulus    : ' + keys['private'][1]);

var message = 100;
console.log('Original message: ' + message);

var encrypted = rsaHelpers.cryptMessage(keys['public'], 100);
console.log('Encrypted message: ' + encrypted);

var decrypted = rsaHelpers.cryptMessage(keys['private'], encrypted);
console.log('Decrypted message: ' + decrypted);