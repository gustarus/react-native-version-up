import Base from '../base/Base';
export declare namespace FormatterSpace {
    type Config = {};
}
export default class Formatter<C = {}> extends Base<C & FormatterSpace.Config> {
    convertObjectPropertiesFromOptionToCamel(source: any): any;
    convertObjectPropertiesFromCamelToOption(source: any): any;
    convertOptionToCamel(name: string): string;
    convertCamelToOption(name: string): string;
    protected convertObjectPropertiesWithFormatter(source: any, nameFormatter: (name: string) => string): any;
}
