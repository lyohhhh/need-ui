interface Load {
    root: HTMLElement | null;
    obs: HTMLElement;
    load: () => void;
}
export declare class ScrollObserver<T extends Load> {
    private observer;
    readonly opt: Load;
    constructor(opt: T);
    init(): void;
    callback(entries: IntersectionObserverEntry[]): void;
    handleObserver(): void;
    cancelObserver(): void;
}
export {};
