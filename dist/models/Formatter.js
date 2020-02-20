"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("../base/Base"));
class Formatter extends Base_1.default {
    convertObjectPropertiesFromOptionToCamel(source) {
        return this.convertObjectPropertiesWithFormatter(source, this.convertOptionToCamel);
    }
    convertObjectPropertiesFromCamelToOption(source) {
        return this.convertObjectPropertiesWithFormatter(source, this.convertCamelToOption);
    }
    convertOptionToCamel(name) {
        return name.replace(/-([\w])/, (match, symbol) => {
            return symbol.toUpperCase();
        });
    }
    convertCamelToOption(name) {
        return name.replace(/(\w)([A-Z])/g, (match, head, symbol) => {
            return `${head}-${symbol.toLowerCase()}`;
        });
    }
    convertObjectPropertiesWithFormatter(source, nameFormatter) {
        const result = source instanceof Array ? [] : {};
        for (const name in source) {
            const nameFormatted = nameFormatter(name);
            if (source[name] && typeof source[name] === 'object') {
                result[nameFormatted] = this.convertObjectPropertiesWithFormatter(source[name], nameFormatter);
            }
            else {
                result[nameFormatted] = source[name];
            }
        }
        return result;
    }
}
exports.default = Formatter;
;
