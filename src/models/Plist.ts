import Source from '../base/Source';

export namespace PlistSpace {
  export type Config = {
    path: string;
  };
}

export default class Plist extends Source<PlistSpace.Config> {

  public get build(): number {
    const match = this.source.match(/(<key>CFBundleVersion<\/key>\s+<string>)([\d\.]+)(<\/string>)/);
    if (match && match[2]) {
      return parseInt(match[2], 10);
    }

    return 1;
  }

  public set version(value: string) {
    this.source = this.source.replace(/(<key>CFBundleShortVersionString<\/key>\s*<string>)([\d\.]+)(<\/string>)/g, `$1${value}$3`);
  }

  public set build(value: number) {
    this.source = this.source.replace(/(<key>CFBundleVersion<\/key>\s+<string>)([\d\.]+)(<\/string>)/g, `$1${value.toString()}$3`);
  }
}
