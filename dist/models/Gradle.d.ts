import Source from '../base/Source';
export declare namespace GradleSpace {
    type Config = {
        path: string;
    };
}
export default class Gradle extends Source<GradleSpace.Config> {
    get build(): number;
    set version(value: string);
    set build(value: number);
}
