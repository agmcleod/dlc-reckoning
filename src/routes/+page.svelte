<script lang="ts">
  import type { PredictionData } from './types'
  import PredictionsSection from '$lib/components/PredictionsSection.svelte'
  import { separatePredictionsList } from '$lib/utils/separatePredictionsList'

  export let data: PredictionData

  const predictionsForYear = data.data[data.mostRecentYear]

  const { jeffBold, jeffCoolRanch, christianBold, christianCoolRanch } =
    separatePredictionsList(predictionsForYear)
</script>

<svelte:head>
  <title>DLC Reckoning - {data.mostRecentYear} Predictions</title>
</svelte:head>

<h1>{data.mostRecentYear} Predictions</h1>
<section class="description">
  <p>
    The <a href="https://www.patreon.com/dlcpod">DLC</a> video game podcast is a weekly show hosted
    by Jeff Cannata and Christian Spicer. They cover gaming news, new releases, and have a guest on
    each week to share other perspectives. At the beginning of each year, the two hosts go over
    their major predictions in gaming for the year. They pick a number of <em>Bold</em> predictions.
    And then they really go bananas with their <em>Cool Ranch</em> predictions.
  </p>
  <p>
    This is a fan made, non-affiliaited site displaying their current predictions, past predictions,
    and fun stats since they started doing these predictions in 2015.
  </p>
</section>

<PredictionsSection {jeffBold} {jeffCoolRanch} {christianBold} {christianCoolRanch} />
