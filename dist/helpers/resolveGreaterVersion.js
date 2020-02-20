"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function resolveGreaterVersion(version, increase, reset = false) {
    if (reset) {
        return 0;
    }
    const value = version >= 0 ? version : 0;
    return increase ? value + 1 : value;
}
exports.default = resolveGreaterVersion;
