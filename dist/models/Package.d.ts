import Source from '../base/Source';
export declare namespace PackageSpace {
    type Config = {
        path: string;
    };
    type Data = {
        name: string;
        version: string;
        bin: {
            [key: string]: string;
        };
    };
    type Versions = {
        major: number;
        minor: number;
        patch: number;
    };
}
export default class Package extends Source<PackageSpace.Config> {
    private _data;
    get data(): PackageSpace.Data;
    get name(): string;
    get version(): string;
    set version(value: string);
    get versions(): PackageSpace.Versions;
    set versions(value: PackageSpace.Versions);
    get major(): number;
    set major(value: number);
    get minor(): number;
    set minor(value: number);
    get patch(): number;
    set patch(value: number);
    get cli(): string;
    save(): void;
}
