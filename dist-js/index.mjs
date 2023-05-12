import { invoke, transformCallback } from '@tauri-apps/api/tauri';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

var _Channel_onmessage;
async function unwatch(id) {
    await invoke("plugin:fs-watch|unwatch", { id });
}
// TODO: use channel from @tauri-apps/api on v2
class Channel {
    constructor() {
        // @ts-expect-error field used by the IPC serializer
        this.__TAURI_CHANNEL_MARKER__ = true;
        _Channel_onmessage.set(this, () => {
            // no-op
        });
        this.id = transformCallback((response) => {
            __classPrivateFieldGet(this, _Channel_onmessage, "f").call(this, response);
        });
    }
    set onmessage(handler) {
        __classPrivateFieldSet(this, _Channel_onmessage, handler, "f");
    }
    get onmessage() {
        return __classPrivateFieldGet(this, _Channel_onmessage, "f");
    }
    toJSON() {
        return `__CHANNEL__:${this.id}`;
    }
}
_Channel_onmessage = new WeakMap();
async function watch(paths, cb, options = {}) {
    const opts = {
        recursive: false,
        delayMs: 2000,
        ...options,
    };
    let watchPaths;
    if (typeof paths === "string") {
        watchPaths = [paths];
    }
    else {
        watchPaths = paths;
    }
    const id = window.crypto.getRandomValues(new Uint32Array(1))[0];
    const onEvent = new Channel();
    onEvent.onmessage = cb;
    await invoke("plugin:fs-watch|watch", {
        id,
        paths: watchPaths,
        options: opts,
        onEvent,
    });
    return () => {
        void unwatch(id);
    };
}
async function watchImmediate(paths, cb, options = {}) {
    const opts = {
        recursive: false,
        ...options,
        delayMs: null,
    };
    let watchPaths;
    if (typeof paths === "string") {
        watchPaths = [paths];
    }
    else {
        watchPaths = paths;
    }
    const id = window.crypto.getRandomValues(new Uint32Array(1))[0];
    const onEvent = new Channel();
    onEvent.onmessage = cb;
    await invoke("plugin:fs-watch|watch", {
        id,
        paths: watchPaths,
        options: opts,
        onEvent,
    });
    return () => {
        void unwatch(id);
    };
}

export { watch, watchImmediate };
//# sourceMappingURL=index.mjs.map
