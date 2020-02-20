"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("../base/Base"));
class Command extends Base_1.default {
    compile(runtimeConfig = { wrap: false }) {
        const prepared = this.config.parts.map((part) => {
            if (part instanceof Command) {
                // compile child command
                const child = part.compile({ ...runtimeConfig, wrap: true });
                return runtimeConfig.wrap
                    ? this.wrapCompiled(child) : child;
            }
            else if (typeof part === 'object') {
                return this.compileOptions(part);
            }
            return part;
        });
        return prepared.filter((value) => value).join(' ');
    }
    compileOptions(options) {
        return Object.keys(options).map((name) => {
            const value = options[name];
            // multiple values with the same key
            // something like `-v ./app:/app -v ./data:/data`
            return value instanceof Array
                ? value.map((part) => this.compileOption(name, part)).join(' ')
                : this.compileOption(name, value);
        }).filter((value) => value).join(' ');
    }
    compileOption(key, value) {
        const keyConverted = this.config.formatter.convertCamelToOption(key);
        const prefix = key.length === 1
            ? `-${keyConverted}` : `--${keyConverted}`;
        if (typeof value === 'boolean') {
            // boolean value: something like `--flag`
            return value ? prefix : '';
        }
        else if (typeof value === 'undefined') {
            // undefined value
            return '';
        }
        else {
            return `${prefix} ${value}`;
        }
    }
    wrapCompiled(compiled) {
        // wrap child command with quotes and add slashes
        return `'${compiled.replace('\'', '\\\'')}'`;
    }
}
exports.default = Command;
;
