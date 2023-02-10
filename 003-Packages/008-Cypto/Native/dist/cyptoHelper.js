"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymmetricKeyCryptoHelper = exports.SymmetricKeyAlgroithmType = exports.HashCryptoHelper = exports.HashAlgroithmType = exports.EncodeConvert = void 0;
const crypto = require("crypto");
/** 編碼轉換 */
class EncodeConvert {
    /** To Base64 String */
    static toBase64(value, encoding = 'utf-8') {
        return EncodeConvert.convert(value, encoding, 'base64');
    }
    /** To Base64 String (Url) */
    static toBase64Url(value, encoding = 'utf-8') {
        return EncodeConvert.convert(value, encoding, 'base64url');
    }
    /** To Hex String */
    static toHexString(value, encoding = 'utf-8') {
        return EncodeConvert.convert(value, encoding, 'hex');
    }
    /** From Base64 String */
    static fromBase64(value, encoding = 'utf-8') {
        return EncodeConvert.convert(value, 'base64', encoding);
    }
    /** From Base64 String (Url) */
    static fromBase64Url(value, encoding = 'utf-8') {
        return EncodeConvert.convert(value, 'base64url', encoding);
    }
    /** From Hex String */
    static fromHexString(value, encoding = 'utf-8') {
        return EncodeConvert.convert(value, 'hex', encoding);
    }
    /** Convert Encoding */
    static convert(value, fromEncoding, toEncodeing) {
        try {
            let buffer;
            if (value instanceof Buffer) {
                buffer = value;
            }
            if (typeof value === 'string') {
                buffer = Buffer.from(value, fromEncoding);
            }
            if (buffer) {
                return buffer.toString(toEncodeing);
            }
        }
        catch (_a) {
        }
        return '';
    }
}
exports.EncodeConvert = EncodeConvert;
/** 雜湊演算法 */
var HashAlgroithmType;
(function (HashAlgroithmType) {
    HashAlgroithmType["md4"] = "md4";
    HashAlgroithmType["md5"] = "md5";
    HashAlgroithmType["sha1"] = "sha1";
    HashAlgroithmType["sha224"] = "sha224";
    HashAlgroithmType["sha256"] = "sha256";
    HashAlgroithmType["sha384"] = "sha384";
    HashAlgroithmType["sha512"] = "sha512";
})(HashAlgroithmType = exports.HashAlgroithmType || (exports.HashAlgroithmType = {}));
/** 雜湊處理 */
class HashCryptoHelper {
    constructor(algroithm = HashAlgroithmType.sha256) {
        this.algroithm = algroithm;
        this.ciphertextEncoding = 'hex';
    }
    /** Set Ciphertext Encoding */
    setCiphertextEncoding(encoding) {
        this.ciphertextEncoding = encoding || 'hex';
        return this;
    }
    /** Hash */
    hash(plainText) {
        let hash = crypto.createHash(this.algroithm);
        hash.update(plainText);
        let hashText = hash.digest(this.ciphertextEncoding);
        return hashText;
    }
    /** Hmac */
    hmac(plainText, key) {
        let hmac = crypto.createHmac(this.algroithm, key);
        hmac.update(plainText);
        let hmacText = hmac.digest(this.ciphertextEncoding);
        return hmacText;
    }
}
exports.HashCryptoHelper = HashCryptoHelper;
/** 對稱式金鑰加解密演算法 */
var SymmetricKeyAlgroithmType;
(function (SymmetricKeyAlgroithmType) {
    // DES
    SymmetricKeyAlgroithmType["des"] = "des";
    SymmetricKeyAlgroithmType["des_ecb"] = "des-ecb";
    SymmetricKeyAlgroithmType["des_cbc"] = "des-cbc";
    SymmetricKeyAlgroithmType["des_cfb"] = "des-cfb";
    SymmetricKeyAlgroithmType["des_ofb"] = "des-ofb";
    SymmetricKeyAlgroithmType["des_ede"] = "des-ede";
    // AES 128
    SymmetricKeyAlgroithmType["aes128"] = "aes128";
    SymmetricKeyAlgroithmType["aes128_ecb"] = "aes-128-ecb";
    SymmetricKeyAlgroithmType["aes128_cbc"] = "aes-128-cbc";
    SymmetricKeyAlgroithmType["aes128_cfb"] = "aes-128-cfb";
    SymmetricKeyAlgroithmType["aes128_ofb"] = "aes-128-ofb";
    SymmetricKeyAlgroithmType["aes128_ctr"] = "aes-128-ctr";
    SymmetricKeyAlgroithmType["aes128_gcm"] = "aes-128-gcm";
    SymmetricKeyAlgroithmType["aes128_xts"] = "aes-128-xts";
    // AES 192
    SymmetricKeyAlgroithmType["aes192"] = "aes192";
    SymmetricKeyAlgroithmType["aes192_ecb"] = "aes-192-ecb";
    SymmetricKeyAlgroithmType["aes192_cbc"] = "aes-192-cbc";
    SymmetricKeyAlgroithmType["aes192_cfb"] = "aes-192-cfb";
    SymmetricKeyAlgroithmType["aes192_ofb"] = "aes-192-ofb";
    SymmetricKeyAlgroithmType["aes192_ctr"] = "aes-192-ctr";
    SymmetricKeyAlgroithmType["aes192_gcm"] = "aes-192-gcm";
    // AES 256
    SymmetricKeyAlgroithmType["aes256"] = "aes256";
    SymmetricKeyAlgroithmType["aes256_ecb"] = "aes-256-ecb";
    SymmetricKeyAlgroithmType["aes256_cbc"] = "aes-256-cbc";
    SymmetricKeyAlgroithmType["aes256_cfb"] = "aes-256-cfb";
    SymmetricKeyAlgroithmType["aes256_ofb"] = "aes-256-ofb";
    SymmetricKeyAlgroithmType["aes256_ctr"] = "aes-256-ctr";
    SymmetricKeyAlgroithmType["aes256_gcm"] = "aes-256-gcm";
    SymmetricKeyAlgroithmType["aes256_xts"] = "aes-256-xts";
})(SymmetricKeyAlgroithmType = exports.SymmetricKeyAlgroithmType || (exports.SymmetricKeyAlgroithmType = {}));
/** 對稱式金鑰加解密處理 */
class SymmetricKeyCryptoHelper {
    constructor(algorithm = SymmetricKeyAlgroithmType.aes256_cbc) {
        this.algorithm = algorithm;
        this.plainTextEncoding = 'utf-8';
        this.ciphertextEncoding = 'hex';
    }
    /** Set Plain Text Encoding */
    setPlainTextEncoding(encoding) {
        this.plainTextEncoding = encoding || 'utf-8';
        return this;
    }
    /** Set Ciphertext Encoding */
    setCiphertextEncoding(encoding) {
        this.ciphertextEncoding = encoding || 'hex';
        return this;
    }
    /** Set key and iv */
    setKeyAndIv(key, iv) {
        if (key) {
            const keyLength = this.getKeyLength();
            const ivLength = this.getIvLength();
            const salt = 'gss-bot-connector';
            // Key
            let keyBuffer;
            if (key instanceof Buffer) {
                keyBuffer = Buffer.concat([key, Buffer.alloc(keyLength)], keyLength);
            }
            else {
                let keyHash = crypto.pbkdf2Sync(key, salt, 1, keyLength, HashAlgroithmType.sha256);
                keyBuffer = Buffer.from(keyHash);
            }
            this.key = keyBuffer.subarray(0, keyLength);
            // IV
            if (iv) {
                let ivBuffer;
                if (iv instanceof Buffer) {
                    ivBuffer = Buffer.concat([iv, Buffer.alloc(ivLength)], ivLength);
                }
                else {
                    let ivHash = crypto.pbkdf2Sync(iv, salt, 1, ivLength, HashAlgroithmType.sha256);
                    ivBuffer = Buffer.from(ivHash);
                }
                this.iv = ivBuffer.subarray(0, ivLength);
            }
            else {
                let ivHash = crypto.pbkdf2Sync(this.key, salt, 1, ivLength, HashAlgroithmType.sha256);
                this.iv = Buffer.from(ivHash);
            }
        }
        return this;
    }
    /** Encrypt */
    encrypt(plainText) {
        if (this.key && this.iv) {
            let cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
            let encrypted = cipher.update(plainText, this.plainTextEncoding);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            let ciphertext = encrypted.toString(this.ciphertextEncoding);
            return ciphertext;
        }
        throw new Error('Key or iv is invalid');
    }
    /** Decrypt */
    decrypt(ciphertext) {
        if (this.key && this.iv) {
            let decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
            let decrypted = decipher.update(ciphertext, this.ciphertextEncoding);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            let plainText = decrypted.toString(this.plainTextEncoding);
            return plainText;
        }
        throw new Error('Key or iv is invalid');
    }
    /**
     * Encrypt
     * @deprecated
     */
    encryptForDeprecated(plainText, password) {
        if (password) {
            let cipher = crypto.createCipher(this.algorithm, password);
            let ciphertext = cipher.update(plainText, this.plainTextEncoding, this.ciphertextEncoding);
            ciphertext += cipher.final(this.ciphertextEncoding);
            return ciphertext;
        }
        throw new Error('Password is invalid');
    }
    /**
     * Decrypt
     * @deprecated
     */
    decryptForDeprecated(ciphertext, password) {
        if (password) {
            let decipher = crypto.createDecipher(this.algorithm, password);
            let plainText = decipher.update(ciphertext, this.ciphertextEncoding, this.plainTextEncoding);
            plainText += decipher.final(this.plainTextEncoding);
            return plainText;
        }
        throw new Error('Password is invalid');
    }
    /** Get key length by algorithm */
    getKeyLength() {
        if (this.algorithm) {
            if (this.algorithm.toLowerCase().startsWith('des')) {
                return 8;
            }
            if (this.algorithm.toLowerCase().startsWith('aes128') ||
                this.algorithm.toLowerCase().startsWith('aes-128')) {
                return 16;
            }
            if (this.algorithm.toLowerCase() === 'aes192' ||
                this.algorithm.toLowerCase().startsWith('aes-192')) {
                return 24;
            }
            if (this.algorithm.toLowerCase().startsWith('aes256') ||
                this.algorithm.toLowerCase().startsWith('aes-256')) {
                return 32;
            }
        }
        return 0;
    }
    /** Get iv length by algorithm */
    getIvLength() {
        if (this.algorithm) {
            if (this.algorithm.toLowerCase().startsWith('des')) {
                return 8;
            }
            return 16;
        }
        return 0;
    }
}
exports.SymmetricKeyCryptoHelper = SymmetricKeyCryptoHelper;
//# sourceMappingURL=cyptoHelper.js.map