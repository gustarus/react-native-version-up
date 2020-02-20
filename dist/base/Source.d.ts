import Base from '../base/Base';
export declare namespace SourceSpace {
    type Config = {
        path: string;
    };
    type Position = {
        line: number;
        column: number;
    };
}
export default abstract class Source<C> extends Base<SourceSpace.Config & C> {
    private _path;
    private _source?;
    set path(value: string);
    get path(): string;
    get source(): string;
    set source(content: string);
    save(): void;
    reset(): void;
    getPosition(position: number): SourceSpace.Position;
}
