import { UnlistenFn } from "@tauri-apps/api/event";
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
export declare function watch(paths: string | string[], options: DebouncedWatchOptions, cb: (event: DebouncedEvent) => void): Promise<UnlistenFn>;
export declare function watchImmediate(paths: string | string[], options: WatchOptions, cb: (event: RawEvent) => void): Promise<UnlistenFn>;
export {};
