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
const fs = __importStar(require("fs"));
const Source_1 = __importDefault(require("../base/Source"));
class Package extends Source_1.default {
    get data() {
        if (!this._data) {
            const content = fs.readFileSync(this.path).toString();
            this._data = JSON.parse(content);
        }
        return this._data;
    }
    get name() {
        return this.data.name;
    }
    get version() {
        return this.data.version;
    }
    set version(value) {
        this._data.version = value;
    }
    get versions() {
        const [major, minor, patch] = this.version.split('.')
            .map((value) => parseInt(value, 10));
        const versions = {};
        versions.major = major || 0;
        versions.minor = minor || 0;
        versions.patch = patch || 0;
        return versions;
    }
    set versions(value) {
        this._data.version = `${value.major}.${value.minor}.${value.patch}`;
    }
    get major() {
        return this.versions.major;
    }
    set major(value) {
        this.versions = { major: value, minor: this.minor, patch: this.patch };
    }
    get minor() {
        return this.versions.minor;
    }
    set minor(value) {
        this.versions = { major: this.major, minor: value, patch: this.patch };
    }
    get patch() {
        return this.versions.patch;
    }
    set patch(value) {
        this.versions = { major: this.major, minor: this.minor, patch: value };
    }
    get cli() {
        return this.data.bin[this.name];
    }
    save() {
        fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2));
        this.reset();
    }
}
exports.default = Package;
