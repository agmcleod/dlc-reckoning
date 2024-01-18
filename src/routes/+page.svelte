<script lang="ts">
  import type { PredictionData } from './types'
  import PredictionsSection from '$lib/components/PredictionsSection.svelte'
  import {
    createInitialSeparatedList,
    separatePredictionsList
  } from '$lib/utils/separatePredictionsList'
  import type { SeparatedPredictionList } from '$lib/utils/separatePredictionsList'
  import type { Prediction } from '$lib/types/prediction'

  export let data: PredictionData

  let predictionsForYear: Prediction[] = []
  $: predictionsForYear = data.data[data.mostRecentYear] || []

  let predictionsSet: SeparatedPredictionList = createInitialSeparatedList()

  $: predictionsSet = separatePredictionsList(predictionsForYear)
</script>

<svelte:head>
  <title>DLC Reckoning - {data.mostRecentYear} Predictions</title>
</svelte:head>

<h1>{data.mostRecentYear} Predictions</h1>
<section class="description">
  <p>
    The <a href="https://www.dlcpod.com/">DLC</a> video game podcast is a weekly show hosted by Jeff
    Cannata and Christian Spicer. They cover gaming news, new releases, and have a guest on each week
    to share other perspectives. At the beginning of each year, the two hosts go over their major predictions
    in gaming for the coming year.
  </p>
  <p>
    Starting in 2024 they invited their friend & third chair of DLC Lana Bachynski to join them in
    their predictions extravaganza. They pick a number of <strong>Bold</strong>
    predictions. Which are their maybe unlikely predictions, but still possible. And then they really
    go bananas with their <em>Cool Ranch</em> predictions. Which are completely off the wall
    predictions of what will happen in the coming year. Some might even say they've gone too far. In
    these episodes they also review their past predictions to determine if they were
    <strong>core-rect</strong>
    or if they got <strong>rekt</strong>.
  </p>
  <p>
    This is a fan made, non-affiliated site displaying their current predictions, past predictions,
    and fun stats since they started doing these predictions in 2015.
  </p>
</section>

<PredictionsSection separatePredictionsList={predictionsSet} />
