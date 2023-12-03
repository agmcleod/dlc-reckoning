<script lang="ts">
  import PredictionsSection from '$lib/components/PredictionsSection.svelte'
  import type { SingleYearPredictionData } from './types'
  import { separatePredictionsList } from '$lib/utils/separatePredictionsList'
  import type { SeparatedPredictionList } from '$lib/utils/separatePredictionsList'

  export let data: SingleYearPredictionData

  let predictionsSet: SeparatedPredictionList = {
    jeffBold: [],
    jeffCoolRanch: [],
    christianBold: [],
    christianCoolRanch: []
  }

  $: predictionsSet = separatePredictionsList(data.predictions)
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

<PredictionsSection
  jeffBold={predictionsSet.jeffBold}
  jeffCoolRanch={predictionsSet.jeffCoolRanch}
  christianBold={predictionsSet.christianBold}
  christianCoolRanch={predictionsSet.christianCoolRanch}
/>
