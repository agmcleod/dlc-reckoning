<script lang="ts">
  import type { Host } from '$lib/types/host'
  import Profile from '$lib/components/Profile.svelte'
  import PredictionDetails from '$lib/components/PredictionDetails.svelte'
  import type { SeparatedPredictionList } from '$lib/utils/separatePredictionsList'
  import { PredictionType } from '$lib/types/predictionType'

  export let separatePredictionsList: SeparatedPredictionList

  type HostKey = keyof typeof Host

  function hostAsHostKey(hostName: string): HostKey {
    return hostName as HostKey
  }

  function hostHasPredictions(
    separatePredictionsList: SeparatedPredictionList,
    host: string
  ): boolean {
    return (
      separatePredictionsList[hostAsHostKey(host)][PredictionType.Bold].length > 0 ||
      separatePredictionsList[hostAsHostKey(host)][PredictionType.CoolRanch].length > 0
    )
  }

  let hostKeys: string[]
  $: hostKeys = Object.keys(separatePredictionsList)
  let hostCount = 0
  $: for (const key of hostKeys) {
    if (hostHasPredictions(separatePredictionsList, key)) {
      hostCount += 1
    }
  }
</script>

<div class="predictions" class:predictions-2={hostCount == 2} class:predictions-3={hostCount == 3}>
  {#each hostKeys as host}
    {#if hostHasPredictions(separatePredictionsList, host)}
      <Profile host={hostAsHostKey(host)} />
      <PredictionDetails
        boldPredictions={separatePredictionsList[hostAsHostKey(host)][PredictionType.Bold]}
        coolRanchPredictions={separatePredictionsList[hostAsHostKey(host)][
          PredictionType.CoolRanch
        ]}
      />
    {/if}
  {/each}
</div>

<style>
  .predictions {
    display: grid;
    grid-template-rows: repeat(3, minmax(0, max-content));
    grid-auto-flow: column;
    column-gap: 1rem;
    row-gap: 1rem;
  }

  .predictions-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .predictions-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media screen and (max-width: 600px) {
    .predictions {
      display: block;
    }
  }
</style>
