<script lang="ts">
import { writableEnhanced } from '$lib/writable-enhanced.js'

const store = writableEnhanced({ name: '' })
let value = ''

const oninput = () => {
  store.up({ name: value })
}
</script>

<svelte:head>
  <title>Writable Enhanced</title>
</svelte:head>

<h1>Writable Enhanced</h1>

<input bind:value on:input={oninput} />

<p>
  Value from store: {$store.name}
</p>
