export declare class VersionChecker {
    private static _pattern;
    /** Is Version Vaild */
    static isValid(version: string): boolean;
    /** is a == b */
    static equals(a: string, b: string): boolean;
    /** is a > b  */
    static gt(a: string, b: string): boolean;
    /** is a < b */
    static lt(a: string, b: string): boolean;
    /** compare a and b */
    static compare(a: string, b: string): number;
}
