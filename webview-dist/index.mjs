import { invoke } from '@tauri-apps/api/tauri';
import { appWindow } from '@tauri-apps/api/window';

async function unwatch(id) {
    await invoke('plugin:fs-watch|unwatch', { id });
}
async function watch(paths, options, cb) {
    const opts = {
        recursive: false,
        delayMs: 2000,
        ...options,
    };
    let watchPaths;
    if (typeof paths === 'string') {
        watchPaths = [paths];
    }
    else {
        watchPaths = paths;
    }
    const id = window.crypto.getRandomValues(new Uint32Array(1))[0];
    await invoke('plugin:fs-watch|watch', {
        id,
        paths: watchPaths,
        options: opts,
    });
    const unlisten = await appWindow.listen(`watcher://debounced-event/${id}`, event => {
        cb(event.payload);
    });
    return async () => {
        await unwatch(id);
        await unlisten();
    };
}
async function watchImmediate(paths, options, cb) {
    const opts = {
        recursive: false,
        ...options,
        delayMs: null
    };
    let watchPaths;
    if (typeof paths === 'string') {
        watchPaths = [paths];
    }
    else {
        watchPaths = paths;
    }
    const id = window.crypto.getRandomValues(new Uint32Array(1))[0];
    await invoke('plugin:fs-watch|watch', {
        id,
        paths: watchPaths,
        options: opts,
    });
    const unlisten = await appWindow.listen(`watcher://raw-event/${id}`, event => {
        cb(event.payload);
    });
    return async () => {
        await unwatch(id);
        await unlisten();
    };
}

export { watch, watchImmediate };
