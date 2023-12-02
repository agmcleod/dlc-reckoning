<script lang="ts">
  import type { Prediction } from '$lib/types/prediction';

  export let boldPredictions: Prediction[] = [];
  export let coolRanchPredictions: Prediction[] = [];
</script>

<h3>Bold</h3>
<ol>
  {#each boldPredictions as prediction}
    <li>{prediction.prediction}</li>
  {/each}
</ol>

<h3>Cool Ranch</h3>
<ol>
  {#each coolRanchPredictions as prediction}
    <li>{prediction.prediction}</li>
  {/each}
</ol>
