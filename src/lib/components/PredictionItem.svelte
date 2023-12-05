<script lang="ts">
  import type { Prediction } from '$lib/types/prediction'
  import type { IconDetails } from '$lib/types/iconDetails'
  import { Score } from '$lib/types/score'
  import Icon from './icons/Icon.svelte'

  export let prediction: Prediction
  export let isCoolRanch = false
  export let index: number

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
  let iconName: keyof IconDetails | null = null
  let iconColor: string = ''

  function setIconDetails() {
    if (prediction.score === null) {
      description = ''
      iconColor = ''
      iconName = null
    } else {
      description = descriptions[prediction.score]
      iconName = iconNames[prediction.score] as keyof IconDetails
      iconColor = isCoolRanch ? crIcoNColors[prediction.score] : iconColors[prediction.score]
    }
  }

  // whenever prediction changes, update the variables
  $: prediction, setIconDetails()
</script>

<li>
  <div class="itemContents">
    <div class="iconWrapper" data-testid="icon-wrapper">
      {#if iconName}
        <Icon
          name={iconName}
          fill={iconColor}
          ariaLabel={description}
          includeShadow={isCoolRanch}
        />
      {:else}
        {index + 1}.&nbsp;
      {/if}
    </div>
    {prediction.prediction}
  </div>
</li>

<style>
  li .itemContents {
    display: flex;
  }
</style>
