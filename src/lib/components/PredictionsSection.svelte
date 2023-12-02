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
  <div class="host">
    <Profile host={Host.Jeff} />
    <PredictionDetails boldPredictions={jeffBold} coolRanchPredictions={jeffCoolRanch} />
  </div>
  <div class="host">
    <Profile host={Host.Christian} />
    <PredictionDetails boldPredictions={christianBold} coolRanchPredictions={christianCoolRanch} />
  </div>
</div>

<style>
  .predictions {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .predictions .host {
    flex: 1;
    border: 0.5rem solid var(--accent-color);
    border-radius: 15px;
    width: 47%;
    margin: 0 1rem;
    padding: 0.5rem;
  }
</style>
