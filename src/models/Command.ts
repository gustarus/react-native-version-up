import Base from '../base/Base';
import Formatter from '../models/Formatter';

export namespace CommandSpace {
  export type Config = {
    formatter: Formatter;
    parts: Part[];
  };

  export type Runtime = {
    wrap?: boolean;
  }

  export type Part = Command | string | boolean | undefined | { [key: string]: Part };
}

export default class Command<C = {}> extends Base<C & CommandSpace.Config> {

  public compile(runtimeConfig: CommandSpace.Runtime = { wrap: false }): string {
    const prepared = this.config.parts.map((part) => {
      if (part instanceof Command) {
        // compile child command
        const child = part.compile({ ...runtimeConfig, wrap: true });
        return runtimeConfig.wrap
          ? this.wrapCompiled(child) : child;
      } else if (typeof part === 'object') {
        return this.compileOptions(part as { [key: string]: any });
      }

      return part;
    });

    return prepared.filter((value) => value).join(' ');
  }

  protected compileOptions(options: { [key: string]: string | string[] }): string {
    return Object.keys(options).map((name) => {
      const value = options[name];

      // multiple values with the same key
      // something like `-v ./app:/app -v ./data:/data`
      return value instanceof Array
        ? value.map((part) => this.compileOption(name, part)).join(' ')
        : this.compileOption(name, value);
    }).filter((value) => value).join(' ');
  }

  protected compileOption(key: string, value: string | boolean | number): string {
    const keyConverted = this.config.formatter.convertCamelToOption(key);
    const prefix = key.length === 1
      ? `-${keyConverted}` : `--${keyConverted}`;

    if (typeof value === 'boolean') {
      // boolean value: something like `--flag`
      return value ? prefix : '';
    } else if (typeof value === 'undefined') {
      // undefined value
      return '';
    } else {
      return `${prefix} ${value}`;
    }
  }

  protected wrapCompiled(compiled: string) {
    // wrap child command with quotes and add slashes
    return `'${compiled.replace('\'', '\\\'')}'`;
  }
};
