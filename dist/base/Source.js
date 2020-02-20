"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const Base_1 = __importDefault(require("../base/Base"));
const fs = __importStar(require("fs"));
class Source extends Base_1.default {
    set path(value) {
        this._path = path.resolve(value);
    }
    get path() {
        return this._path;
    }
    get source() {
        if (!this._source) {
            this._source = fs.readFileSync(this.path, 'utf8').toString();
        }
        return this._source;
    }
    set source(content) {
        this._source = content;
        this.save();
    }
    save() {
        fs.writeFileSync(this.path, this.source, 'utf8');
        this.reset();
    }
    reset() {
        delete this._source;
    }
    getPosition(position) {
        const part = this.source.substr(0, position);
        const lines = part.split('\n');
        const line = lines.length;
        const column = lines[lines.length - 1].length;
        return { line, column };
    }
}
exports.default = Source;
