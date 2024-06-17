import * as crypto from 'crypto';

/** 編碼轉換 */
export class EncodeConvert {
    /** To Base64 String */
    public static toBase64(value: string | Buffer, encoding: BufferEncoding = 'utf-8'): string {
        return EncodeConvert.convert(value, encoding, 'base64');
    }

    /** To Base64 String (Url) */
    public static toBase64Url(value: string | Buffer, 
                              encoding: BufferEncoding = 'utf-8'): string {
        return EncodeConvert.convert(value, encoding, 'base64url');
    }

    /** To Hex String */
    public static toHexString(value: string | Buffer, 
                              encoding: BufferEncoding = 'utf-8'): string {
        return EncodeConvert.convert(value, encoding, 'hex');
    }

    /** From Base64 String */
    public static fromBase64(value: string | Buffer, 
                             encoding: BufferEncoding = 'utf-8'): string {
        return EncodeConvert.convert(value, 'base64', encoding);
    }
    
    /** From Base64 String (Url) */
    public static fromBase64Url(value: string | Buffer, 
                                encoding: BufferEncoding = 'utf-8'): string {
        return EncodeConvert.convert(value, 'base64url', encoding);
    }

    /** From Hex String */
    public static fromHexString(value: string | Buffer,
                                encoding: BufferEncoding = 'utf-8'): string {
        return EncodeConvert.convert(value, 'hex', encoding);
    }
    
    /** Convert Encoding */
    public static convert(value: string | Buffer, 
                          fromEncoding: BufferEncoding,
                          toEncodeing: BufferEncoding): string {
        try {
            let buffer: Buffer;

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
        catch {
            
        }
        return '';
    }
}

/** 雜湊演算法 */
export enum HashAlgroithmType {
    md4 = 'md4',
    md5 = 'md5',
    sha1 = 'sha1',
    sha224 = 'sha224',
    sha256 = 'sha256',
    sha384 = 'sha384',
    sha512 = 'sha512'
}

/** 雜湊處理 */
export class HashCryptoHelper {
    public algroithm: string;
    public ciphertextEncoding: crypto.BinaryToTextEncoding;

    constructor(algroithm: string = HashAlgroithmType.sha256) {
        this.algroithm = algroithm;
        this.ciphertextEncoding = 'hex';
    }

    /** Set Ciphertext Encoding */
    public setCiphertextEncoding(encoding: crypto.BinaryToTextEncoding): HashCryptoHelper {
        this.ciphertextEncoding = encoding || 'hex';
        return this;
    }

    /** Hash */
    public hash(plainText: string): string {
        
        let hash = crypto.createHash(this.algroithm);
        hash.update(plainText);
        let hashText = hash.digest(this.ciphertextEncoding);
        return hashText;
    }

    /** Hmac */
    public hmac(plainText: string, key: string): string {

        let hmac = crypto.createHmac(this.algroithm, key);
        hmac.update(plainText);
        let hmacText = hmac.digest(this.ciphertextEncoding);
        return hmacText;
    }
}

/** 對稱式金鑰加解密演算法 */
export enum SymmetricKeyAlgroithmType {
    // DES
    des = 'des',
    des_ecb = 'des-ecb',
    des_cbc = 'des-cbc',
    des_cfb = 'des-cfb',
    des_ofb = 'des-ofb',
    des_ede = 'des-ede',

    // AES 128
    aes128 = 'aes128',
    aes128_ecb = 'aes-128-ecb',
    aes128_cbc = 'aes-128-cbc',
    aes128_cfb = 'aes-128-cfb',
    aes128_ofb = 'aes-128-ofb',
    aes128_ctr = 'aes-128-ctr',
    aes128_gcm = 'aes-128-gcm',
    aes128_xts = 'aes-128-xts',

    // AES 192
    aes192 = 'aes192',
    aes192_ecb = 'aes-192-ecb',
    aes192_cbc = 'aes-192-cbc',
    aes192_cfb = 'aes-192-cfb',
    aes192_ofb = 'aes-192-ofb',
    aes192_ctr = 'aes-192-ctr',
    aes192_gcm = 'aes-192-gcm',

    // AES 256
    aes256 = 'aes256',
    aes256_ecb = 'aes-256-ecb',
    aes256_cbc = 'aes-256-cbc',
    aes256_cfb = 'aes-256-cfb',
    aes256_ofb = 'aes-256-ofb',
    aes256_ctr = 'aes-256-ctr',
    aes256_gcm = 'aes-256-gcm',
    aes256_xts = 'aes-256-xts',
}


/** 對稱式金鑰加解密處理 */
export class SymmetricKeyCryptoHelper {
    public algorithm: string;
    public plainTextEncoding: crypto.Encoding;
    public ciphertextEncoding: crypto.Encoding;
    
    private key: Buffer;
    private iv: Buffer;
    


    constructor(algorithm: string = SymmetricKeyAlgroithmType.aes256_cbc) {
        this.algorithm = algorithm;
        this.plainTextEncoding = 'utf-8';
        this.ciphertextEncoding = 'hex';
    }

    /** Set Plain Text Encoding */
    public setPlainTextEncoding(encoding: crypto.Encoding): SymmetricKeyCryptoHelper {
        this.plainTextEncoding = encoding || 'utf-8';
        return this;
    }

    /** Set Ciphertext Encoding */
    public setCiphertextEncoding(encoding: crypto.Encoding): SymmetricKeyCryptoHelper {
        this.ciphertextEncoding = encoding|| 'hex';
        return this;
    }

    /** Set key and iv */
    public setKeyAndIv(key: string | Buffer, iv ?: string | Buffer): SymmetricKeyCryptoHelper {
        if (key) {
            const keyLength = this.getKeyLength();
            const ivLength = this.getIvLength();
            const salt = '';

            // Key
            let keyBuffer: Buffer;
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
                let ivBuffer: Buffer;
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
                this.iv= Buffer.from(ivHash);
            }
        }
        return this;
    }

    /** Encrypt */
    public encrypt(plainText: string): string {
        if (this.key && this.iv) {
            let cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
            let encrypted  = cipher.update(plainText, this.plainTextEncoding);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            let ciphertext = encrypted.toString(this.ciphertextEncoding);
            return ciphertext;
        }
        throw new Error('Key or iv is invalid');
    }

    /** Decrypt */
    public decrypt(ciphertext: string): string {
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
    public encryptForDeprecated(plainText: string, password: crypto.BinaryLike): string {
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
    public decryptForDeprecated(ciphertext: string, password: crypto.BinaryLike): string {
        if (password) {
            let decipher = crypto.createDecipher(this.algorithm, password);
            let plainText = decipher.update(ciphertext, this.ciphertextEncoding, this.plainTextEncoding);
            plainText += decipher.final(this.plainTextEncoding);
            return plainText;
        }
        throw new Error('Password is invalid');
    }

    /** Get key length by algorithm */
    protected getKeyLength(): number {
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
    protected getIvLength(): number {
        if (this.algorithm) {
            if (this.algorithm.toLowerCase().startsWith('des')) {
                 return 8;
            }
 
            return 16;
         }
         return 0;
    }
}