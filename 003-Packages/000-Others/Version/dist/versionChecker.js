"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VersionChecker {
    /** Is Version Vaild */
    static isValid(version) {
        if (version) {
            return VersionChecker._pattern.test(version);
        }
        return false;
    }
    /** is a == b */
    static equals(a, b) {
        return VersionChecker.compare(a, b) === 0;
    }
    /** is a > b  */
    static gt(a, b) {
        return VersionChecker.compare(a, b) > 0;
    }
    /** is a < b */
    static lt(a, b) {
        return VersionChecker.compare(a, b) < 0;
    }
    /** compare a and b */
    static compare(a, b) {
        let i, diff;
        let pattern = /(\.0+)+$/;
        let segmentsA = a.replace(pattern, '').split('.');
        let segmentsB = b.replace(pattern, '').split('.');
        let l = Math.min(segmentsA.length, segmentsB.length);
        for (i = 0; i < l; i++) {
            diff = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
            if (diff) {
                return diff;
            }
        }
        return segmentsA.length - segmentsB.length;
    }
}
exports.VersionChecker = VersionChecker;
VersionChecker._pattern = /(\d+\.)(\d+\.)(\d+\.)(\d)/;
//# sourceMappingURL=versionChecker.js.map