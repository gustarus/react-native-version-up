"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("./../models/Command"));
const formatter_1 = __importDefault(require("./../instances/formatter"));
function createCommand(parts) {
    if (!parts.length) {
        throw new Error('Unable to ensure command: parts are invalid');
    }
    if (parts.length === 1 && parts[0] instanceof Command_1.default) {
        return parts[0];
    }
    return new Command_1.default({ formatter: formatter_1.default, parts });
}
exports.default = createCommand;
;
