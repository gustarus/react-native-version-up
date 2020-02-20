"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function requiredPath(path) {
    if (!fs_1.default.existsSync(path)) {
        throw new Error(`Unable to locate path '${path}': this path doesn't exist`);
    }
}
exports.default = requiredPath;
;
