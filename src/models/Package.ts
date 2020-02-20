import * as fs from 'fs';
import Source from '../base/Source';

export namespace PackageSpace {
  export type Config = {
    path: string;
  };

  export type Data = {
    name: string;
    version: string;
    bin: { [key: string]: string };
  }

  export type Versions = {
    major: number;
    minor: number;
    patch: number;
  };
}

export default class Package extends Source<PackageSpace.Config> {

  private _data: PackageSpace.Data;

  public get data(): PackageSpace.Data {
    if (!this._data) {
      const content = fs.readFileSync(this.path).toString();
      this._data = JSON.parse(content);
    }

    return this._data;
  }

  public get name(): string {
    return this.data.name;
  }

  public get version(): string {
    return this.data.version;
  }

  public set version(value: string) {
    this._data.version = value;
  }

  public get versions(): PackageSpace.Versions {
    const [major, minor, patch] = this.version.split('.')
      .map((value) => parseInt(value, 10));
    const versions = {} as any;
    versions.major = major || 0;
    versions.minor = minor || 0;
    versions.patch = patch || 0;
    return versions;
  }

  public set versions(value: PackageSpace.Versions) {
    this._data.version = `${value.major}.${value.minor}.${value.patch}`;
  }

  public get major(): number {
    return this.versions.major;
  }

  public set major(value: number) {
    this.versions = { major: value, minor: this.minor, patch: this.patch };
  }

  public get minor(): number {
    return this.versions.minor;
  }

  public set minor(value: number) {
    this.versions = { major: this.major, minor: value, patch: this.patch };
  }

  public get patch(): number {
    return this.versions.patch;
  }

  public set patch(value: number) {
    this.versions = { major: this.major, minor: this.minor, patch: value };
  }

  public get cli(): string {
    return this.data.bin[this.name];
  }

  public save() {
    fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2));
    this.reset();
  }
}
