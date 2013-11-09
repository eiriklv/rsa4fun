// Testing
var rsaHelpers = require('./main');

var keys = rsaHelpers.generateKeypair(100);
console.log(keys);

var message = 100;

var encrypted = rsaHelpers.cryptMessage(keys['public'], 100);
console.log(encrypted);

var decrypted = rsaHelpers.cryptMessage(keys['private'], encrypted);
console.log(decrypted);