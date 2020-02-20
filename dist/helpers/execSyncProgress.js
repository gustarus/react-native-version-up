"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const safe_1 = __importDefault(require("colors/safe"));
const createCommand_1 = __importDefault(require("./createCommand"));
function execSyncProgress(parts, scenario) {
    const command = createCommand_1.default(parts);
    const compiled = command.compile();
    console.log(`$ ${compiled}`);
    try {
        switch (scenario) {
            case 'display':
                return child_process_1.execSync(compiled, { stdio: 'inherit' });
            case 'return':
                return child_process_1.execSync(compiled).toString().trim();
            default:
                throw new Error('Invalid scenario passed');
        }
    }
    catch (error) {
        console.log(safe_1.default.red(error.stack));
        process.exit(1);
        return false;
    }
}
exports.default = execSyncProgress;
;
