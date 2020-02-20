export default class Base<C> {
    config: C;
    constructor(config: C);
    get defaults(): C;
    private configure;
}
