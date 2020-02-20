import Source from '../base/Source';

export namespace GradleSpace {
  export type Config = {
    path: string;
  };
}

export default class Gradle extends Source<GradleSpace.Config> {

  public get build(): number {
    const match = this.source.match(/(versionCode )([\d\.]+)/);
    if (match && match[2]) {
      return parseInt(match[2]);
    }

    return 1;
  }

  public set version(value: string) {
    this.source = this.source.replace(/(\s*versionName\s+["']?)([\d\.]+)(["']?\s*)/g, `$1${value}$3`)
  }

  public set build(value: number) {
    this.source = this.source.replace(/(\s*versionCode\s+["']?)(\d+)(["']?\s*)/g, `$1${value.toString()}$3`);
  }
}
