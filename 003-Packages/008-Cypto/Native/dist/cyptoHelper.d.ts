/// <reference types="node" />
/// <reference types="node" />
import * as crypto from 'crypto';
/** 編碼轉換 */
export declare class EncodeConvert {
    /** To Base64 String */
    static toBase64(value: string | Buffer, encoding?: BufferEncoding): string;
    /** To Base64 String (Url) */
    static toBase64Url(value: string | Buffer, encoding?: BufferEncoding): string;
    /** To Hex String */
    static toHexString(value: string | Buffer, encoding?: BufferEncoding): string;
    /** From Base64 String */
    static fromBase64(value: string | Buffer, encoding?: BufferEncoding): string;
    /** From Base64 String (Url) */
    static fromBase64Url(value: string | Buffer, encoding?: BufferEncoding): string;
    /** From Hex String */
    static fromHexString(value: string | Buffer, encoding?: BufferEncoding): string;
    /** Convert Encoding */
    static convert(value: string | Buffer, fromEncoding: BufferEncoding, toEncodeing: BufferEncoding): string;
}
/** 雜湊演算法 */
export declare enum HashAlgroithmType {
    md4 = "md4",
    md5 = "md5",
    sha1 = "sha1",
    sha224 = "sha224",
    sha256 = "sha256",
    sha384 = "sha384",
    sha512 = "sha512"
}
/** 雜湊處理 */
export declare class HashCryptoHelper {
    algroithm: string;
    ciphertextEncoding: crypto.BinaryToTextEncoding;
    constructor(algroithm?: string);
    /** Set Ciphertext Encoding */
    setCiphertextEncoding(encoding: crypto.BinaryToTextEncoding): HashCryptoHelper;
    /** Hash */
    hash(plainText: string): string;
    /** Hmac */
    hmac(plainText: string, key: string): string;
}
/** 對稱式金鑰加解密演算法 */
export declare enum SymmetricKeyAlgroithmType {
    des = "des",
    des_ecb = "des-ecb",
    des_cbc = "des-cbc",
    des_cfb = "des-cfb",
    des_ofb = "des-ofb",
    des_ede = "des-ede",
    aes128 = "aes128",
    aes128_ecb = "aes-128-ecb",
    aes128_cbc = "aes-128-cbc",
    aes128_cfb = "aes-128-cfb",
    aes128_ofb = "aes-128-ofb",
    aes128_ctr = "aes-128-ctr",
    aes128_gcm = "aes-128-gcm",
    aes128_xts = "aes-128-xts",
    aes192 = "aes192",
    aes192_ecb = "aes-192-ecb",
    aes192_cbc = "aes-192-cbc",
    aes192_cfb = "aes-192-cfb",
    aes192_ofb = "aes-192-ofb",
    aes192_ctr = "aes-192-ctr",
    aes192_gcm = "aes-192-gcm",
    aes256 = "aes256",
    aes256_ecb = "aes-256-ecb",
    aes256_cbc = "aes-256-cbc",
    aes256_cfb = "aes-256-cfb",
    aes256_ofb = "aes-256-ofb",
    aes256_ctr = "aes-256-ctr",
    aes256_gcm = "aes-256-gcm",
    aes256_xts = "aes-256-xts"
}
/** 對稱式金鑰加解密處理 */
export declare class SymmetricKeyCryptoHelper {
    algorithm: string;
    plainTextEncoding: crypto.Encoding;
    ciphertextEncoding: crypto.Encoding;
    private key;
    private iv;
    constructor(algorithm?: string);
    /** Set Plain Text Encoding */
    setPlainTextEncoding(encoding: crypto.Encoding): SymmetricKeyCryptoHelper;
    /** Set Ciphertext Encoding */
    setCiphertextEncoding(encoding: crypto.Encoding): SymmetricKeyCryptoHelper;
    /** Set key and iv */
    setKeyAndIv(key: string | Buffer, iv?: string | Buffer): SymmetricKeyCryptoHelper;
    /** Encrypt */
    encrypt(plainText: string): string;
    /** Decrypt */
    decrypt(ciphertext: string): string;
    /**
     * Encrypt
     * @deprecated
     */
    encryptForDeprecated(plainText: string, password: crypto.BinaryLike): string;
    /**
     * Decrypt
     * @deprecated
     */
    decryptForDeprecated(ciphertext: string, password: crypto.BinaryLike): string;
    /** Get key length by algorithm */
    protected getKeyLength(): number;
    /** Get iv length by algorithm */
    protected getIvLength(): number;
}
