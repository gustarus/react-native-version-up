"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Source_1 = __importDefault(require("../base/Source"));
class Gradle extends Source_1.default {
    get build() {
        const match = this.source.match(/(versionCode )([\d\.]+)/);
        if (match && match[2]) {
            return parseInt(match[2]);
        }
        return 1;
    }
    set version(value) {
        this.source = this.source.replace(/(\s*versionName\s+["']?)([\d\.]+)(["']?\s*)/g, `$1${value}$3`);
    }
    set build(value) {
        this.source = this.source.replace(/(\s*versionCode\s+["']?)(\d+)(["']?\s*)/g, `$1${value.toString()}$3`);
    }
}
exports.default = Gradle;
