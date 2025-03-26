<script lang="ts">
  import { Host } from '$lib/types/host'
  import Profile from '$lib/components/Profile.svelte'
  import type { StatisticsData, StatisticsHostData } from './types'
  import { setupChart, LINE_COLOUR_MAP } from './chart'

  const { data } = $props<{ data: { leaderboard: StatisticsData } }>()

  function asPercent(value: number): string {
    return `${Math.round(value * 1000) / 10}%`
    // Batting average code, maybe create a toggle to view numbers as this
    // return `${Math.round(value * 1000) / 1000}`.replace('0.', '.')
  }

  let chartContainer: HTMLElement

  let hostDataCollection: Array<{ host: Host; data: StatisticsHostData }> = []

  for (const host of Object.keys(data.leaderboard)) {
    const dataForHost = data.leaderboard[host as Host]
    if (dataForHost.total.total > 0) {
      hostDataCollection.push({ host: host as Host, data: dataForHost })
    }
  }

  $effect(() => {
    setupChart(data, chartContainer)
  })
</script>

<svelte:head>
  <title>DLC Reckoning - Leaderboard</title>
</svelte:head>

<h1>Leaderboard</h1>

<section class="description">
  <p>
    This is a summary page to show how well our hosts have done over the years in their predictions.
  </p>
  <p>Were they correct, or did they get rekt?</p>

  <p class="note">
    Note, correct predictions are a percentage of predictions that they scored correctly on the
    show. Incorrect and partially correct then make up the remaining percentage.
  </p>
</section>

<div class="chart" bind:this={chartContainer}></div>
<div>
  <ul class="chart-legend">
    <li><span style={`background: ${LINE_COLOUR_MAP[Host.Christian]}`}></span>Christian</li>
    <li><span style={`background: ${LINE_COLOUR_MAP[Host.Jeff]}`}></span>Jeff</li>
    <li><span style={`background: ${LINE_COLOUR_MAP[Host.Lana]}`}></span>Lana</li>
  </ul>
</div>

<div class="leaderboard-container">
  {#each hostDataCollection as hostData}
    <Profile host={hostData.host} />
    <div class="total-scores" data-testid="total-scores">
      <ul>
        <li class="correct" data-testid="correct-predictions">
          <span>Correct Predictions</span>
          <span>{asPercent(hostData.data.total.correct / hostData.data.total.total)}</span>
        </li>
        <li class="incorrect" data-testid="incorrect-predictions">
          <span>Rekt Predictions</span>
          <span>{asPercent(hostData.data.total.incorrect / hostData.data.total.total)}</span>
        </li>
        <li class="partial" data-testid="partial-predictions">
          <span>Partially Correct Predictions</span>
          <span>{asPercent(hostData.data.total.partial / hostData.data.total.total)}</span>
        </li>
        <li class="correct-eventually" data-testid="correct-eventually">
          <span>Predictions That Became Correct</span>
          <span
            >{asPercent(
              hostData.data.total.correctEventually / hostData.data.total.incorrect
            )}</span
          >
        </li>
      </ul>
    </div>
    <table class="break-down" data-testid="break-down">
      <thead>
        <tr>
          <th>Grade</th>
          <th>Bold</th>
          <th>Cool Ranch</th>
        </tr>
      </thead>
      <tbody>
        <tr class="correct">
          <td>Correct</td>
          <td data-testid="correct-b"
            >{asPercent(hostData.data.bold.correct / hostData.data.bold.total)}</td
          >
          <td data-testid="correct-cr">
            {asPercent(hostData.data.coolRanch.correct / hostData.data.coolRanch.total)}
          </td>
        </tr>
        <tr class="incorrect">
          <td>Rekt</td>
          <td data-testid="incorrect-b">
            {asPercent(hostData.data.bold.incorrect / hostData.data.bold.total)}
          </td>
          <td data-testid="incorrect-cr">
            {asPercent(hostData.data.coolRanch.incorrect / hostData.data.coolRanch.total)}
          </td>
        </tr>
        <tr class="partial">
          <td>Partial</td>
          <td data-testid="partial-b">
            {asPercent(hostData.data.bold.partial / hostData.data.bold.total)}
          </td>
          <td data-testid="partial-cr">
            {asPercent(hostData.data.coolRanch.partial / hostData.data.coolRanch.total)}
          </td>
        </tr>
      </tbody>
    </table>
  {/each}
</div>

<style>
  .description p {
    text-align: center;
  }

  .note {
    font-size: 0.9rem;
  }

  .leaderboard-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, max-content));
    grid-auto-flow: column;
    column-gap: 1rem;
    row-gap: 1rem;
  }

  .total-scores ul {
    list-style: none;
    padding-left: 0;
  }

  .total-scores li {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    margin-right: 1rem;
    padding: 0.25rem;
  }

  .break-down {
    width: 100%;
  }

  .break-down td,
  .break-down th {
    padding: 0.5rem 0;
  }

  .total-scores li.correct,
  tr.correct {
    color: #080;
  }

  .total-scores li.incorrect,
  tr.incorrect {
    color: #800;
  }

  .total-scores li.partial,
  tr.partial {
    color: #770;
  }

  .total-scores li.correct-eventually {
    color: var(--cool-ranch);
  }

  .break-down th {
    text-align: left;
  }

  .chart-legend {
    list-style: none;
    padding-left: 0;
    margin: 0 0 0 42px;
    display: flex;
    flex-direction: row;
  }

  .chart-legend li {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
  }

  .chart-legend span {
    width: 15px;
    height: 15px;
    display: block;
    border-radius: 50%;
  }

  .chart {
    overflow-x: scroll;
  }

  @media screen and (max-width: 600px) {
    .leaderboard-container {
      display: block;
    }
  }
</style>
