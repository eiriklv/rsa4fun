// modulus (javascript % gives remainder)
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

// returns true for prime numbers
function isPrime(n) {
    var sqrtn = Math.sqrt(n);

    for (var i = 2; i <= sqrtn; i++)
        if (n % i === 0) return false;
    return true;
}

// generate primes
function generatePrimes(arrayLength){
    var primeArray = [];
    var count = 2;

    while(primeArray.length<arrayLength){
        if(isPrime(count)){
            primeArray.push(count);
        }
        count++;
    }
    return primeArray;
}

// euclid's algorithm (greatest common denominator)
function gcd(a, b){
    //console.log('a: ' + a + ' b: ' + b);
    if (b == 0){
        //console.log('out: ' + a);
        return a;
    }
    else{
        return gcd(b, a % b);
    }
}

// generate coprime numbers - if existing
function generateCoprimes(input){
    var primeArray = [];
    var count = 2;

    while(count<input){
        var coprime = gcd(input, count);
        //console.log(coprime);
        if(coprime == 1){
            primeArray.push(count);
        }
        count++;
    }
    return primeArray;
}

// euclid's extended algorithm (greatest common denominator)
function xgcd(a,b){
    if (b == 0){
        return [1, 0, a];
    }
    else
    {
        temp = xgcd(b, a % b);
        x = temp[0];
        y = temp[1];
        d = temp[2];
        return [y, x-y*Math.floor(a/b), d];
    }
}

// totient helper function
function getTotient(one, two){
    return (one-1)*(two-1);
}

// generate RSA keypair (needs optimization)
function generateKeypair(primeLength){
    var primes = generatePrimes(primeLength); // generate primes
    var keyPrimes = [];
    keyPrimes[0] = primes.splice(Math.floor(Math.random()*primeLength),1)[0]; // random first prime
    keyPrimes[1] = primes.splice(Math.floor(Math.random()*primeLength-1),1)[0]; // random second prime
    var modulus = keyPrimes[0]*keyPrimes[1]; // calculate modulus
    var totient = getTotient(keyPrimes[0], keyPrimes[1]); // calculate totient
    var coPrimes = generateCoprimes(totient); // find coprimes
    var publicNumber = coPrimes[0]; // choosing the smallest coprime as public key (makes encrypting faster)
    var privateNumber = xgcd(publicNumber, totient)[0].mod(totient); // generate private key
    // return keys
    return { 'public': [publicNumber, modulus], 'private': [privateNumber, modulus] };
}

// create a character array from a string
function toCharArray(input){
    var charArray = [];

    for(var i=0; i<input.length; i++){
        charArray[i] = input.charCodeAt(i);
    }
    return charArray;
}

// create a string from a character array
function toStringArray(input){
    var stringArray = [];

    for(var i=0; i<input.length; i++){
        stringArray[i] = String.fromCharCode(input[i]);
    }
    return stringArray.join('');
}

// encrypt or decrypt single character/number
function cryptSingle(key, message){
    temp = expmod(message,key[0],key[1]); // encrypted/decrypt message/character = expmod(message, exponent, modulus)
    return temp;
}

// performs x^c mod n (x = base, c = exp, n = mod) (RSA encryption or decryption operation)
function expmod(base, exp, mod){
  if (exp == 0) return 1;
  if (exp % 2 == 0){
    return Math.pow( expmod( base, (exp / 2), mod), 2) % mod;
  }
  else {
    return (base * expmod( base, (exp - 1), mod)) % mod;
  }
}

// encrypt or decrypt message (encrypt/decrypt - true/false)
function cryptMessage(key, message, encrypt){
    var temp = [];
    if(encrypt) message = toCharArray(message);

    for(var i=0;i<message.length; i++){
        temp[i] = cryptSingle(key, message[i]); // encrypt every character of the message (not really that secure)
    }

    if(!encrypt) return toStringArray(temp);
    return temp;
}

// exports
module.exports.generateKeypair = generateKeypair;
module.exports.cryptMessage = cryptMessage;
module.exports.toCharArray = toCharArray;
