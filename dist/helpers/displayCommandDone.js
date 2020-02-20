"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safe_1 = __importDefault(require("colors/safe"));
const displayCommandStep_1 = __importDefault(require("./displayCommandStep"));
function displayCommandDone(cmd) {
    displayCommandStep_1.default(cmd, safe_1.default.green('The task was successful'));
}
exports.default = displayCommandDone;
;
