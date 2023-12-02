<script lang="ts">
  import type { PredictionData } from './types'
  import logo from '$lib/assets/cover_small.jpg'

  export let data: PredictionData

  const years = Object.keys(data.data)
  years.sort((a, b) => parseFloat(b) - parseFloat(a))
</script>

<nav>
  <div class="container">
    <img src={logo} alt="Logo for DLC, a video game podcast" />
    {#each years as year}
      <a href="/{year}">{year}</a>
    {/each}
  </div>
</nav>

<div class="container">
  <slot />
</div>

<style>
  :global(body) {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    margin: 0;
  }

  :global(:root) {
    --accent-color: #ff841c;
  }

  .container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  nav {
    background: #040517;
    padding: 10px 0;
  }

  nav .container {
    display: flex;
  }

  nav img {
    max-height: 1.8rem;
    margin-right: 1rem;
  }

  nav a {
    color: var(--accent-color);
    margin-right: 1rem;
    font-size: 1.2rem;
  }
</style>
