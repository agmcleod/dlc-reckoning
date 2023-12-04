<script lang="ts">
  import type { IconDetails, IconData } from '$lib/types/iconDetails'
  export let fill = ''
  export let ariaLabel = ''
  export let includeShadow = false
  export let name: keyof IconDetails

  const icons: IconDetails = {
    close: {
      name: 'close',
      svg: `<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />`
    },
    done: {
      name: 'done',
      svg: `<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />`
    },
    clock: {
      name: 'clock',
      svg: `<path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80ZM253-253l227-227v-320q-134 0-227 93t-93 227q0 64 24 123t69 104Z"/>`
    }
  }

  let icon: IconData
  $: icon = icons[name]
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24"
  viewBox="0 -960 960 960"
  width="24"
  {fill}
  aria-label={ariaLabel}
  class:shadow={includeShadow}>{@html icon.svg}</svg
>

<style>
  svg.shadow {
    filter: drop-shadow(2px 2px 2px rgb(0 0 0 / 0.9));
  }
</style>
