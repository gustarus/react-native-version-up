"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base {
    constructor(config) {
        this.config = { ...this.defaults, ...config };
        this.configure(this.config);
    }
    get defaults() {
        return {};
    }
    configure(config) {
        for (const name in config) {
            if (typeof config[name] !== 'undefined') {
                this[name] = config[name];
            }
        }
        return this;
    }
}
exports.default = Base;
;
