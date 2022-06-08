declare class LocalCacheStorage {
    setStorage(key: string, value: any): void;
    getStorage(key: string): string;
    removeStorage(key: string): void;
    clearStorage(): void;
}
declare const _default: LocalCacheStorage;
export default _default;
