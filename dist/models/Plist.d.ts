import Source from '../base/Source';
export declare namespace PlistSpace {
    type Config = {
        path: string;
    };
}
export default class Plist extends Source<PlistSpace.Config> {
    get build(): number;
    set version(value: string);
    set build(value: number);
}
