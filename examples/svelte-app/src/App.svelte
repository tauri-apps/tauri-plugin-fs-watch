<script lang="ts">
	import { watch } from 'tauri-plugin-fs-watch-api'

	let response = ''
	let path = '/path/to/folder/or/file'
	let stopWatching = null

	function updateResponse(returnValue) {
		response += `[${new Date().toLocaleTimeString()}]` + (typeof returnValue === 'string' ? returnValue : JSON.stringify(returnValue)) + '<br>'
	}

	async function _watch() {
		if (stopWatching) {
			await stopWatching()
			stopWatching = null
		}
		stopWatching = await watch(path, { recursive: true }, updateResponse).catch(updateResponse)
	}

	async function _unwatch() {
		if (stopWatching) {
			await stopWatching()
			stopWatching = null
		}
	}
</script>

<div>
	<input bind:value={path} placeholder="Path to watch">
	<button on:click="{_watch}">Watch</button>
	<button on:click="{_unwatch}" disabled={stopWatching === null}>Stop watching</button>
	<div>{@html response}</div>
</div>
