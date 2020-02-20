export default class Base<C> {

  public config: C;

  public constructor(config: C) {
    this.config = { ...this.defaults, ...config };
    this.configure(this.config);
  }

  public get defaults(): C {
    return {} as C;
  }

  private configure(config: C): this {
    for (const name in config) {
      if (typeof config[name] !== 'undefined') {
        (this as any)[name] = config[name];
      }
    }

    return this;
  }
};
