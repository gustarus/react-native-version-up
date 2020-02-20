"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execSyncProgress_1 = __importDefault(require("./execSyncProgress"));
function execSyncProgressReturn(...parts) {
    return execSyncProgress_1.default(parts, 'return');
}
exports.default = execSyncProgressReturn;
;
