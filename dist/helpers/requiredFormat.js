"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requiredFormat(name, value, format) {
    if (!value.match(format)) {
        throw new Error(`Property '${name}' value '${value}' is in invalid format: should be ${format.toString()}`);
    }
}
exports.default = requiredFormat;
;
