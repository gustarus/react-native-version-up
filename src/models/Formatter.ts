import Base from '../base/Base';

export namespace FormatterSpace {
  export type Config = {};
}

export default class Formatter<C = {}> extends Base<C & FormatterSpace.Config> {

  public convertObjectPropertiesFromOptionToCamel(source: any) {
    return this.convertObjectPropertiesWithFormatter(source, this.convertOptionToCamel);
  }

  public convertObjectPropertiesFromCamelToOption(source: any) {
    return this.convertObjectPropertiesWithFormatter(source, this.convertCamelToOption);
  }

  public convertOptionToCamel(name: string) {
    return name.replace(/-([\w])/, (match, symbol: string) => {
      return symbol.toUpperCase();
    });
  }

  public convertCamelToOption(name: string) {
    return name.replace(/(\w)([A-Z])/g, (match, head: string, symbol: string) => {
      return `${head}-${symbol.toLowerCase()}`;
    });
  }

  protected convertObjectPropertiesWithFormatter(source: any, nameFormatter: (name: string) => string) {
    const result: any = source instanceof Array ? [] : {};
    for (const name in source) {
      const nameFormatted = nameFormatter(name);
      if (source[name] && typeof source[name] === 'object') {
        result[nameFormatted] = this.convertObjectPropertiesWithFormatter(source[name], nameFormatter);
      } else {
        result[nameFormatted] = source[name];
      }
    }

    return result;
  }
};
