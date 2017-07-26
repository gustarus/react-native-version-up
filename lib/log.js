'use strict';

const chalk = require('chalk');

module.exports = {

  echo(message, level = 0, wrapper = null, asString = false) {
    let output;
    if (typeof message === 'string') {
      const string = '  '.repeat(level) + message;
      output = wrapper ? wrapper(string) : string;
    } else {
      output = message;
    }

    if (asString) {
      return output;
    }

    console.log(output);
  },

  error(message, level = 0, asString = false) {
    return this.echo(message, level, chalk.red, asString);
  },

  success(message, level = 0, asString = false) {
    return this.echo(message, level, chalk.green, asString);
  },

  warning(message, level = 0, asString = false) {
    return this.echo(message, level, chalk.yellow, asString);
  },

  notice(message, level = 0, asString = false) {
    return this.echo(message, level, chalk.blue, asString);
  },

  info(message, level = 0, asString = false) {
    return this.echo(message, level, null, asString);
  },

  line(asString = false) {
    return this.echo('', 0, null, asString);
  }
};
