<script lang="ts">
  import type { Prediction } from '$lib/types/prediction'
  import type { IconDetails } from '$lib/types/iconDetails'
  import { Score } from '$lib/types/score'
  import Icon from './icons/Icon.svelte'
  import { Host } from '$lib/types/host'
  import CoffeeCrisp from './icons/CoffeeCrisp.svelte'
  import CoolRanchChip from './icons/CoolRanchChip.svelte'
  import { PredictionType } from '$lib/types/predictionType'

  export let prediction: Prediction
  export let index: number
  export let host: keyof typeof Host

  let isCoolRanch = false
  $: isCoolRanch = prediction.prediction_type === PredictionType.CoolRanch

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

<li class="prediction">
  <div class="icon-wrapper" data-testid="icon-wrapper">
    {#if isCoolRanch}
      <div class="coolranch-icon-wrapper" data-testid="coolranch-icon-wrapper">
        {#if index % 2 !== 0}
          <CoffeeCrisp />
        {:else}
          <CoolRanchChip />
        {/if}
      </div>
    {/if}
    {#if iconName}
      <Icon name={iconName} fill={iconColor} ariaLabel={description} includeShadow={isCoolRanch} />
    {:else}
      {index + 1}.&nbsp;
    {/if}
  </div>
  <div class="prediction-contents">
    {prediction.prediction}
    {#if prediction.details}
      <div class="tooltip-wrapper details" aria-label="Hover or focus to view details">
        <div class="tooltip-circle" data-tooltip-text={prediction.details} role="tooltip">
          <span class="tooltip-target">i</span>
        </div>
      </div>
    {/if}
    {#if prediction.correct_eventually}
      <div
        class="tooltip-wrapper correct-eventually"
        aria-label="This incorrect prediction became correct in the future. Hover or focus to see details"
      >
        <div
          class="tooltip-circle"
          data-tooltip-text={`Correct eventually: ${prediction.correct_eventually}`}
          role="tooltip"
        >
          <span class="tooltip-target">&#x2713;</span>
        </div>
      </div>
    {/if}
  </div>
</li>

<style>
  .prediction {
    display: flex;
  }

  .prediction-contents {
    margin: 0;
  }

  .tooltip-wrapper {
    display: inline-block;
  }

  .details .tooltip-circle {
    background-color: #222;
  }

  .correct-eventually .tooltip-circle {
    background-color: #040;
  }

  .icon-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .coolranch-icon-wrapper {
    width: 24px;
    margin-right: 4px;
  }

  .tooltip-circle {
    position: relative;
    display: flex;
    font-size: 0.8rem;
    border-radius: 50%;
    color: white;
    width: 17px;
    height: 17px;
    text-align: center;
    margin: 0;
    margin-left: 5px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
  }

  .tooltip-circle::before {
    content: attr(data-tooltip-text);
    opacity: 0;
    width: 200px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 1.2rem;

    position: absolute;
    z-index: 1;
    bottom: 0px;
    left: 50%;
    transition: opacity 0.25s;
    transform: translate(-50%, 100%);
    pointer-events: none;
  }

  .tooltip-circle:hover::before,
  .tooltip-circle:focus::before {
    opacity: 0.99;
  }
</style>
