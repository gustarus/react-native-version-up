"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
function resolvePackagePath(directory) {
    const possible = path.resolve(directory, 'package.json');
    if (!fs.existsSync(possible)) {
        const parent = path.dirname(directory);
        return resolvePackagePath(parent);
    }
    return directory;
}
exports.default = resolvePackagePath;
