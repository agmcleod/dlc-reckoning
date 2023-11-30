<script lang="ts">
  import { Host } from '$lib/types/host';
  import Profile from '$lib/components/Profile.svelte';
  import PredictionDetails from '$lib/components/PredictionDetails.svelte';
  import { Score } from '$lib/types/prediction';
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
  <div>
    <Profile host={Host.Jeff} />
    <PredictionDetails
      boldPredictions={[
        { details: 'Sony will not release a new console', score: Score.Correct },
        { details: 'Zelda will tank', score: Score.Incorrect }
      ]}
      coolRanchPredictions={[
        { details: 'Sony will not release a new console', score: Score.Correct },
        { details: 'Zelda will tank', score: Score.Incorrect }
      ]}
    />
  </div>
  <div>
    <Profile host={Host.Christian} />
    <PredictionDetails
      boldPredictions={[
        { details: 'Sony will not release a new console', score: Score.Correct },
        { details: 'Zelda will tank', score: Score.Incorrect }
      ]}
      coolRanchPredictions={[
        { details: 'Sony will not release a new console', score: Score.Correct },
        { details: 'Zelda will tank', score: Score.Incorrect }
      ]}
    />
  </div>
</div>

<style>
  .predictions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
