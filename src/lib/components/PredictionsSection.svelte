<script lang="ts">
  import { Host } from '$lib/types/host'
  import Profile from '$lib/components/Profile.svelte'
  import PredictionDetails from '$lib/components/PredictionDetails.svelte'
  import type { Prediction } from '$lib/types/prediction'

  export let jeffBold: Prediction[] = []
  export let jeffCoolRanch: Prediction[] = []
  export let christianBold: Prediction[] = []
  export let christianCoolRanch: Prediction[] = []
</script>

<div class="predictions">
  <Profile host={Host.Jeff} />
  <PredictionDetails boldPredictions={jeffBold} coolRanchPredictions={jeffCoolRanch} />
  <Profile host={Host.Christian} />
  <PredictionDetails boldPredictions={christianBold} coolRanchPredictions={christianCoolRanch} />
</div>

<style>
  .predictions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, max-content));
    grid-auto-flow: column;
    column-gap: 1rem;
    row-gap: 1rem;
  }

  @media screen and (max-width: 600px) {
    .predictions {
      display: block;
    }
  }
</style>
