<script lang="ts">
  import PredictionsSection from '$lib/components/PredictionsSection.svelte'
  import type { SingleYearPredictionData } from './types'
  import { separatePredictionsList } from '$lib/utils/separatePredictionsList'

  export let data: SingleYearPredictionData

  const { jeffBold, jeffCoolRanch, christianBold, christianCoolRanch } = separatePredictionsList(
    data.predictions
  )
</script>

<svelte:head>
  <title>DLC Reckoning - {data.year} Predictions</title>
</svelte:head>

<h1>{data.year} Predictions</h1>

<section class="description">
  <p>
    Viewing prediction details for {data.year}.
  </p>
</section>

<PredictionsSection {jeffBold} {jeffCoolRanch} {christianBold} {christianCoolRanch} />
