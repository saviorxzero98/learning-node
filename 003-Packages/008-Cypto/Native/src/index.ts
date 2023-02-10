import * as Crypto from 'crypto';
import { EncodeConvert, HashAlgroithmType, HashCryptoHelper, SymmetricKeyAlgroithmType, SymmetricKeyCryptoHelper } from './cyptoHelper';

const text = 'Hello World 中文';

// Base 64
console.log('\n====================\n[Demo Base64, Base64 Url, Hex]');
let base64Text = toBase64(text);
fromBase64(base64Text);

let base64Url = toBase64Url(text);
fromBase64Url(base64Url);

let hexString = toHex(text);
fromHex(hexString);

// Hash
console.log('\n====================\n[Demo Hash]');
runHashHex(text, 'md5', 'MD5 (Hex)');
runHashBase64(text, 'md5', 'MD5 (Base64)');
runHashHex(text, 'sha1', 'SHA1 (Hex)');
runHashBase64(text, 'sha1', 'SHA1 (Base64)');
runHashHex(text, 'sha256', 'SHA256 (Hex)');
runHashBase64(text, 'sha256', 'SHA256 (Base64)');
runHashHex(text, 'sha512', 'SHA512 (Hex)');
runHashBase64(text, 'sha512', 'SHA512 (Base64)');

// HMAC
console.log('\n====================\n[Demo Hmac]');
const hmacKey = 'P@ssw0rd';
console.log(`HMAC Key : ${hmacKey}`);
runHMACHex(text, hmacKey, HashAlgroithmType.md5, 'HMAC-MD5 (Hex)');
runHMACBase64(text, hmacKey, HashAlgroithmType.md5, 'HMAC-MD5 (Base64)');
runHMACHex(text, hmacKey, HashAlgroithmType.sha1, 'HMAC-SHA1 (Hex)');
runHMACBase64(text, hmacKey, HashAlgroithmType.sha1, 'HMAC-SHA1 (Base64)');
runHMACHex(text, hmacKey, HashAlgroithmType.sha256, 'HMAC-SHA256 (Hex)');
runHMACBase64(text, hmacKey, HashAlgroithmType.sha256, 'HMAC-SHA256 (Base64)');
runHMACHex(text, hmacKey, HashAlgroithmType.sha512, 'HMAC-SHA512 (Hex)');
runHMACBase64(text, hmacKey, HashAlgroithmType.sha512, 'HMAC-SHA512 (Base64)');


// Cipher / Decipher
console.log('\n====================\n[Demo Cipher & Decipher]');
const cipherKey = 'P@ssw0rd';
console.log(`Cipher Key : ${cipherKey}`);
runCipherAndDecipher(text, cipherKey, SymmetricKeyAlgroithmType.des_cbc, 'DES-CBC');
runDeprecatedCipherAndDecipher(text, cipherKey, SymmetricKeyAlgroithmType.des_cbc, 'DES-CBC');

runCipherAndDecipher(text, cipherKey, SymmetricKeyAlgroithmType.aes128_cbc, 'AES-128-CBC');
runDeprecatedCipherAndDecipher(text, cipherKey, SymmetricKeyAlgroithmType.aes128_cbc, 'AES-128-CBC');

runCipherAndDecipher(text, cipherKey, SymmetricKeyAlgroithmType.aes192_cbc, 'AES-192-CBC');
runDeprecatedCipherAndDecipher(text, cipherKey, SymmetricKeyAlgroithmType.aes192_cbc, 'AES-192-CBC');

runCipherAndDecipher(text, cipherKey, SymmetricKeyAlgroithmType.aes256_cbc, 'AES-256-CBC');
runDeprecatedCipherAndDecipher(text, cipherKey, SymmetricKeyAlgroithmType.aes256_cbc, 'AES-256-CBC');


//======================================================
// Base64
//======================================================

/** String to Base64 */
function toBase64(plainText: string) {
    let base64String = EncodeConvert.toBase64(plainText);

    console.log(`Base64 Encode : ${base64String}`);

    return base64String;
}

/** Base64 to string */
function fromBase64(base64String: string) {
    let plainText = EncodeConvert.fromBase64(base64String, 'utf-8');

    console.log(`Base64 Decode : ${plainText}`);

    return plainText;
}


/** String to Base64 (Url) */
function toBase64Url(plainText: string) {
    let base64String = EncodeConvert.toBase64Url(plainText);

    console.log(`Base64 Url Encode : ${base64String}`);

    return base64String;
}

/** Base64 to string */
function fromBase64Url(base64String: string) {
    let plainText = EncodeConvert.fromBase64Url(base64String, 'utf-8');

    console.log(`Base64 Url Decode : ${plainText}`);

    return plainText;
}

/** String to Hex String */
function toHex(plainText: string) {
    let base64String = EncodeConvert.toHexString(plainText);

    console.log(`Hex Encode : ${base64String}`);

    return base64String;
}

/** Hex to string */
function fromHex(base64String: string) {
    let plainText = EncodeConvert.fromHexString(base64String, 'utf-8');

    console.log(`Hex Decode : ${plainText}`);

    return plainText;
}


//======================================================
// HASH
//======================================================

/** Hash */
function runHashHex(plainText: string, algroithm: string, title: string): string {
    let startTime = new Date();

    // HASH
    let crypto = new HashCryptoHelper(algroithm).setCiphertextEncoding('hex');
    let hashText = crypto.hash(plainText);

    let endTime = new Date();
    let times = endTime.getTime() - startTime.getTime();

    console.log(`${title} : ${hashText} (${times} ms)`);

    return hashText;
}

/** Hash */
function runHashBase64(plainText: string, algroithm: string, title: string): string {
    let startTime = new Date();

    // HASH
    let crypto = new HashCryptoHelper(algroithm).setCiphertextEncoding('base64');
    let hashText = crypto.hash(plainText);

    let endTime = new Date();
    let times = endTime.getTime() - startTime.getTime();

    console.log(`${title} : ${hashText} (${times} ms)`);

    return hashText;
}


//======================================================
// HMAC
//======================================================

/** HMAC */
function runHMACHex(plainText: string, key: string, algroithm: string, title: string) : string {
    let startTime = new Date();

    // HMAC
    let crypto = new HashCryptoHelper(algroithm).setCiphertextEncoding('hex');
    let hmacText = crypto.hmac(plainText, key);

    let endTime = new Date();
    let times = endTime.getTime() - startTime.getTime();

    console.log(`${title} : ${hmacText} (${times} ms)`);

    return hmacText;
}

function runHMACBase64(plainText: string, key: string, algroithm: string, title: string) : string {
    let startTime = new Date();

    // HMAC
    let crypto = new HashCryptoHelper(algroithm).setCiphertextEncoding('base64');;
    let hmacText = crypto.hmac(plainText, key);

    let endTime = new Date();
    let times = endTime.getTime() - startTime.getTime();

    console.log(`${title} : ${hmacText} (${times} ms)`);

    return hmacText;
}

//======================================================
// Cipher / Decipher
//======================================================

function runCipherAndDecipher(plainText: string, key: string, algorithm: string, title: string) {
    
    try {
        let ciphertext = runCipher(plainText, key, algorithm, title);

        runDecipher(ciphertext, key, algorithm, title);
    }
    catch (e) {
        console.log(`${title} fail`);
        console.log(e);
    }
}

// Deprecated
function runDeprecatedCipherAndDecipher(plainText: string, key: string, algorithm: string, title: string) {
    try {
        let ciphertext = runDeprecatedCipher(plainText, key, algorithm, title);

        runDeprecatedDecipher(ciphertext, key, algorithm, title);
    }
    catch (e) {
        console.log(`${title} fail`);
        console.log(e);
    }
}


//加密
function runCipher(plainText: string, password: string, algorithm: string, title: string){
    let startTime = new Date();
    
    let cypto = new SymmetricKeyCryptoHelper(algorithm).setCiphertextEncoding('hex')
                                                 .setPlainTextEncoding('utf-8')
                                                 .setKeyAndIv(password);
    let ciphertext = cypto.encrypt(plainText);

    let endTime = new Date();
    let times = endTime.getTime() - startTime.getTime();

    console.log(`${title} Cipher : ${ciphertext} (${times} ms)`);

    return ciphertext;
}

//加密 (Deprecated)
function runDeprecatedCipher(plainText: string, password: string, algorithm: string, title: string){
    let startTime = new Date();

    let cypto = new SymmetricKeyCryptoHelper(algorithm).setCiphertextEncoding('hex')
                                                 .setPlainTextEncoding('utf-8');
    let ciphertext = cypto.encryptForDeprecated(plainText, password);
    
    let endTime = new Date();
    let times = endTime.getTime() - startTime.getTime();

    console.log(`${title} Cipher (Deprecated) : ${ciphertext} (${times} ms)`);

    return ciphertext;
}

//解密
function runDecipher(ciphertext: string, password: string, algorithm: string, title: string){
    let startTime = new Date();
    
    let cypto = new SymmetricKeyCryptoHelper(algorithm).setCiphertextEncoding('hex')
                                                 .setPlainTextEncoding('utf-8')
                                                 .setKeyAndIv(password);
    let plainText = cypto.decrypt(ciphertext);

    let endTime = new Date();
    let times = endTime.getTime() - startTime.getTime();

    console.log(`${title} Decipher : ${plainText} (${times} ms)`);

    return plainText;
}

//解密 (Deprecated)
function runDeprecatedDecipher(ciphertext: string, password: string, algorithm: string, title: string){
    let startTime = new Date();

    let cypto = new SymmetricKeyCryptoHelper(algorithm).setCiphertextEncoding('hex')
                                                 .setPlainTextEncoding('utf-8');
    let plainText = cypto.decryptForDeprecated(ciphertext, password);
   
    let endTime = new Date();
    let times = endTime.getTime() - startTime.getTime();

    console.log(`${title} Decipher (Deprecated) : ${plainText} (${times} ms)`);

    return plainText;
}