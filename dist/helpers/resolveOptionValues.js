"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolveString_1 = __importDefault(require("./resolveString"));
function resolveOptionValues(value, replacements = {}) {
    // resolve values if user typed something
    const resolved = value.length === 1 ? value.slice(0) : value.slice(1);
    return resolved.map((string) => resolveString_1.default(string, replacements));
}
exports.default = resolveOptionValues;
