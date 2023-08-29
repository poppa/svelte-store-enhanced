<script lang="ts">
import { toggle } from '$lib/toggle.js'

const map = { one: true, two: false, three: false }
const store = toggle(map)

let allOpen: boolean
let allClosed: boolean
$: {
  allOpen = Object.values($store).every((v) => v)
  allClosed = Object.values($store).every((v) => !v)
}
</script>

<svelte:head>
  <title>Toggle Store</title>
</svelte:head>

<h1>Toggle Store</h1>

<div class="actions">
  <button on:click={() => store.every('toggle')}>Toggle All</button>
  <button on:click={() => store.every('on')} disabled={allOpen}>Open All</button
  >
  <button on:click={() => store.every('off')} disabled={allClosed}
    >Close All</button
  >
</div>
<hr />
<ul>
  <li class:show={$store.one}>
    <h2>
      <div>Item 1</div>
      <div class="buttons">
        <button on:click={() => store.swap('one')} disabled={$store.one}
          >Swap</button
        >
        <button on:click={() => store.toggle('one')}>Toggle</button>
        <button on:click={() => store.on('one')} disabled={$store.one}
          >Open</button
        >
        <button on:click={() => store.off('one')} disabled={!$store.one}
          >Close</button
        >
      </div>
    </h2>
    <div class="body">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Quis lectus nulla at
      volutpat. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc
      vel. Leo in vitae turpis massa sed elementum. Aliquet nec ullamcorper sit
      amet risus nullam eget felis eget.
    </div>
  </li>

  <li class:show={$store.two}>
    <h2>
      <div>Item 2</div>

      <div class="buttons">
        <button on:click={() => store.swap('two')} disabled={$store.two}
          >Swap</button
        >
        <button on:click={() => store.toggle('two')}>Toggle</button>
        <button on:click={() => store.on('two')} disabled={$store.two}
          >Open</button
        >
        <button on:click={() => store.off('two')} disabled={!$store.two}
          >Close</button
        >
      </div>
    </h2>
    <div class="body">
      Amet facilisis magna etiam tempor orci eu lobortis. Amet purus gravida
      quis blandit. Tempor id eu nisl nunc mi ipsum. Etiam dignissim diam quis
      enim lobortis scelerisque. Massa massa ultricies mi quis hendrerit dolor
      magna.
    </div>
  </li>

  <li class:show={$store.three}>
    <h2>
      <div>Item 3</div>
      <div class="buttons">
        <button on:click={() => store.swap('three')} disabled={$store.three}
          >Swap</button
        >
        <button on:click={() => store.toggle('three')}>Toggle</button>
        <button on:click={() => store.on('three')} disabled={$store.three}
          >Open</button
        >
        <button on:click={() => store.off('three')} disabled={!$store.three}
          >Close</button
        >
      </div>
    </h2>
    <div class="body">
      Orci phasellus egestas tellus rutrum. Cursus in hac habitasse platea.
      Vestibulum sed arcu non odio euismod lacinia at. Fermentum leo vel orci
      porta non pulvinar neque laoreet suspendisse. Malesuada fames ac turpis
      egestas sed tempus urna et. Tristique sollicitudin nibh sit amet.
    </div>
  </li>
</ul>

<style>
h2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.body {
  display: none;
}

.show .body {
  display: block;
}
</style>
