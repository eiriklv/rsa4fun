// Testing
var rsaHelpers = require('./main');

var keys = rsaHelpers.generateKeypair(1000); // generate keys
//var keys = { public: [ 7, 28417009 ], private: [ 16231783, 28417009 ] }; // ready keypair
console.log(keys);
console.log('public key exponent  : ' + keys['public'][0]);
console.log('private key exponent : ' + keys['private'][0]);
console.log('modulus              : ' + keys['private'][1]);

var message = 'secret message';
console.log('Original message     : ' + message);

var charMessage = rsaHelpers.toCharArray(message);
console.log('Converted to integers: ' + charMessage);

var encrypted = rsaHelpers.cryptMessage(keys['public'], message, true);
console.log('Encrypted message    : ' + encrypted);

var decrypted = rsaHelpers.cryptMessage(keys['private'], encrypted, false);
console.log('Decrypted message    : ' + decrypted);