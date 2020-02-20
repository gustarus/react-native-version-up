"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function collectOptionValues(value, stack) {
    return [...stack, value];
}
exports.default = collectOptionValues;
