"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function resolveString(value, variables = {}) {
    let result = value;
    for (const name in variables) {
        const expression = new RegExp(`\\$\\{${name}\\}`, 'g');
        result = result.replace(expression, variables[name]);
    }
    return result;
}
exports.default = resolveString;
