"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safe_1 = __importDefault(require("colors/safe"));
const moment_1 = __importDefault(require("moment"));
function displayCommandStep(cmd, message) {
    const timestamp = moment_1.default().format('HH:mm:ss');
    console.log(`[${timestamp}] [${safe_1.default.blue(cmd.name())}] ${message}`);
}
exports.default = displayCommandStep;
;
