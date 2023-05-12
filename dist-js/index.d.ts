export interface WatchOptions {
    recursive?: boolean;
}
export interface DebouncedWatchOptions extends WatchOptions {
    delayMs?: number;
}
export type RawEvent = {
    type: RawEventKind;
    paths: string[];
    attrs: unknown;
};
type RawEventKind = "any " | {
    access?: unknown;
} | {
    create?: unknown;
} | {
    modify?: unknown;
} | {
    remove?: unknown;
} | "other";
export type DebouncedEvent = {
    kind: "any";
    path: string;
} | {
    kind: "AnyContinous";
    path: string;
};
export declare function watch(paths: string | string[], cb: (event: DebouncedEvent) => void, options?: DebouncedWatchOptions): Promise<() => void>;
export declare function watchImmediate(paths: string | string[], cb: (event: RawEvent) => void, options?: WatchOptions): Promise<() => void>;
export {};
