<script lang="ts">
  import type { Prediction } from '$lib/types/prediction'

  export let boldPredictions: Prediction[] = []
  export let coolRanchPredictions: Prediction[] = []
</script>

<div class="bold">
  <h3>Bold</h3>
  <ol>
    {#each boldPredictions as prediction}
      <li>{prediction.prediction}</li>
    {/each}
  </ol>
</div>

<div class="cool-ranch">
  <h3><em>Cool</em> Ranch</h3>
  <ol>
    {#each coolRanchPredictions as prediction}
      <li>{prediction.prediction}</li>
    {/each}
  </ol>
</div>

<style>
  .bold h3 {
    color: #000;
  }

  .cool-ranch {
    background: #004b95;
    color: white;
    border-radius: 1rem;
    padding: 0.75rem;
  }

  .bold h3,
  .cool-ranch h3 {
    margin-top: 0;
  }
</style>
