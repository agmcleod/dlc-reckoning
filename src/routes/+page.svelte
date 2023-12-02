<script lang="ts">
  import { Host } from '$lib/types/host';
  import Profile from '$lib/components/Profile.svelte';
  import PredictionDetails from '$lib/components/PredictionDetails.svelte';
  import type { Prediction } from '$lib/types/prediction';
  import type { PredictionData } from './types';
  import { PredictionType } from '$lib/types/predictionType'

  export let data: PredictionData;

  const predictionsForYear = data.data[data.lastYear]

  const jeffBold: Prediction[] = []
  const jeffCoolRanch: Prediction[] = []
  const christianBold: Prediction[] = []
  const christianCoolRanch: Prediction[] = []
  
  for (const record of predictionsForYear) {
    if (record.host === Host.Both) {
      if (record.prediction_type === PredictionType.Bold) {
        jeffBold.push(record)
        christianBold.push(record)
      } else if (record.prediction_type === PredictionType.CoolRanch) {
        jeffCoolRanch.push(record)
        christianCoolRanch.push(record)
      }
    } else if (record.host === Host.Christian) {
      if (record.prediction_type === PredictionType.Bold) {
        christianBold.push(record)
      } else if (record.prediction_type === PredictionType.CoolRanch) {
        christianCoolRanch.push(record)
      }
    } else if (record.host === Host.Jeff) {
      if (record.prediction_type === PredictionType.Bold) {
        jeffBold.push(record)
      } else if (record.prediction_type === PredictionType.CoolRanch) {
        jeffCoolRanch.push(record)
      }
    }
  }
</script>

<svelte:head>
  <title>DLC Reckoning - 2023 Predictions</title>
</svelte:head>

<h1>2023 Predictions</h1>
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

<div class="predictions">
  <div class="host">
    <Profile host={Host.Jeff} />
    <PredictionDetails
      boldPredictions={jeffBold}
      coolRanchPredictions={jeffCoolRanch}
    />
  </div>
  <div class="host">
    <Profile host={Host.Christian} />
    <PredictionDetails
      boldPredictions={christianBold}
      coolRanchPredictions={christianCoolRanch}
    />
  </div>
</div>

<style>
  .predictions {
    display: flex;
    flex-direction: row;
  }

  .predictions .host {
    flex: 1;
  }
</style>
