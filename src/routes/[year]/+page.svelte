<script lang="ts">
  import PredictionsSection from '$lib/components/PredictionsSection.svelte'
  import type { SingleYearPredictionData } from './types'
  import {
    separatePredictionsList,
    createInitialSeparatedList
  } from '$lib/utils/separatePredictionsList'
  import type { SeparatedPredictionList } from '$lib/utils/separatePredictionsList'

  export let data: SingleYearPredictionData

  let predictionsSet: SeparatedPredictionList = createInitialSeparatedList()

  $: predictionsSet = separatePredictionsList(data.predictions)
</script>

<svelte:head>
  <title>DLC Reckoning - {data.year} Predictions</title>
</svelte:head>

<h1>{data.year} Predictions</h1>

{#if data.episodeTidbit}
  <section class="tidbit">
    <h2>Episode Tidbit</h2>
    <p>{data.episodeTidbit}</p>
  </section>
{/if}

<PredictionsSection separatePredictionsList={predictionsSet} />

<style>
  .tidbit h2 {
    font-size: 1.5rem;
  }

  .tidbit {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tidbit p {
    width: 70%;
    margin: 0;
  }

  @media screen and (max-width: 500px) {
    .tidbit p {
      width: 100%;
    }
  }
</style>
