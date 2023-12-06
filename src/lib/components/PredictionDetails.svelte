<script lang="ts">
  import type { Prediction } from '$lib/types/prediction'
  import PredictionItem from './PredictionItem.svelte'

  export let boldPredictions: Prediction[] = []
  export let coolRanchPredictions: Prediction[] = []
</script>

<div class="bold" data-testid="bold-section">
  <h3>Bold</h3>
  <ol>
    {#each boldPredictions as prediction, index}
      <PredictionItem {prediction} {index} />
    {/each}
  </ol>
</div>

<div class="cool-ranch" data-testid="cool-ranch-section">
  <h3>Cool Ranch</h3>
  <ol>
    {#each coolRanchPredictions as prediction, index}
      <PredictionItem {prediction} isCoolRanch {index} />
    {/each}
  </ol>
</div>

<style>
  .bold h3 {
    color: #000;
  }

  .cool-ranch {
    background: var(--cool-ranch);
    color: white;
    border-radius: 1rem;
    padding: 0.75rem;
  }

  .bold h3,
  .cool-ranch h3 {
    margin-top: 0;
  }

  ol {
    list-style: none;
    padding-left: 0;
  }
</style>
