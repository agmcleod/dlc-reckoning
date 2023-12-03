<script lang="ts">
  import type { Prediction } from '$lib/types/prediction'
  import type { IconDetails } from '$lib/types/iconDetails'
  import { Score } from '$lib/types/score'
  import Icon from './icons/Icon.svelte'

  export let prediction: Prediction
  export let isCoolRanch = false

  const descriptions = {
    [Score.Correct]: 'Correct prediction',
    [Score.Incorrect]: 'Incorrect prediction',
    [Score.Partial]: 'Partially correct prediction'
  }

  const iconNames = {
    [Score.Correct]: 'done',
    [Score.Incorrect]: 'close',
    [Score.Partial]: 'clock'
  }

  const iconColors = {
    [Score.Correct]: '#0a0',
    [Score.Incorrect]: '#a00',
    [Score.Partial]: '#aa0'
  }

  const crIcoNColors = {
    [Score.Correct]: '#0f0',
    [Score.Incorrect]: '#f00',
    [Score.Partial]: '#ff0'
  }

  let description = ''
  let iconName: keyof IconDetails
  let iconColor: string = ''
  $: {
    if (prediction.score !== null) {
      description = descriptions[prediction.score]
      iconName = iconNames[prediction.score] as keyof IconDetails
      iconColor = isCoolRanch ? crIcoNColors[prediction.score] : iconColors[prediction.score]
    }
  }
</script>

<li>
  {#if iconName}
    <div class="iconWrapper">
      <Icon name={iconName} fill={iconColor} ariaLabel={description} includeShadow={isCoolRanch} />
    </div>
  {/if}
  {prediction.prediction}
</li>

<style>
  li {
    display: flex;
  }
</style>
