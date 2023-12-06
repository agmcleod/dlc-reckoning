<script lang="ts">
  import Profile from '$lib/components/Profile.svelte'
  import { Host } from '$lib/types/host'
  import type { StatisticsData, StatisticsHostData } from './types'

  export let data: StatisticsData

  function asPercent(value: number): string {
    return `${Math.round(value * 1000) / 10}%`
  }

  let jeffData: StatisticsHostData
  let christianData: StatisticsHostData

  $: jeffData = data[Host.Jeff]
  $: christianData = data[Host.Christian]
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
</section>

<div class="leaderboard-container">
  <Profile host={Host.Jeff} />
  <div class="total-scores" data-testid="total-scores">
    <ul>
      <li class="correct" data-testid="correct-predictions">
        <span>Correct Predictions</span>
        <span>{asPercent(jeffData.total.correct / jeffData.total.total)}</span>
      </li>
      <li class="incorrect" data-testid="incorrect-predictions">
        <span>Rekt Predictions</span>
        <span>{asPercent(jeffData.total.incorrect / jeffData.total.total)}</span>
      </li>
      <li class="partial" data-testid="partial-predictions">
        <span>Partially Correct Predictions</span>
        <span>{asPercent(jeffData.total.partial / jeffData.total.total)}</span>
      </li>
      <li class="correct-eventually" data-testid="correct-eventually">
        <span>Predictions That Became Correct</span>
        <span>{asPercent(jeffData.total.correctEventually / jeffData.total.incorrect)}</span>
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
        <td data-testid="correct-b">{asPercent(jeffData.bold.correct / jeffData.bold.total)}</td>
        <td data-testid="correct-cr">
          {asPercent(jeffData.coolRanch.correct / jeffData.coolRanch.total)}
        </td>
      </tr>
      <tr class="incorrect">
        <td>Rekt</td>
        <td data-testid="incorrect-b">
          {asPercent(jeffData.bold.incorrect / jeffData.bold.total)}
        </td>
        <td data-testid="incorrect-cr">
          {asPercent(jeffData.coolRanch.incorrect / jeffData.coolRanch.total)}
        </td>
      </tr>
      <tr class="partial">
        <td>Partial</td>
        <td data-testid="partial-b">
          {asPercent(jeffData.bold.partial / jeffData.bold.total)}
        </td>
        <td data-testid="partial-cr">
          {asPercent(jeffData.coolRanch.partial / jeffData.coolRanch.total)}
        </td>
      </tr>
    </tbody>
  </table>
  <Profile host={Host.Christian} />
  <div class="total-scores" data-testid="total-scores">
    <ul>
      <li class="correct" data-testid="correct-predictions">
        <span>Correct Predictions</span>
        <span>{asPercent(christianData.total.correct / christianData.total.total)}</span>
      </li>
      <li class="incorrect" data-testid="incorrect-predictions">
        <span>Rekt Predictions</span>
        <span>{asPercent(christianData.total.incorrect / christianData.total.total)}</span>
      </li>
      <li class="partial" data-testid="partial-predictions">
        <span>Partially Correct Predictions</span>
        <span>{asPercent(christianData.total.partial / christianData.total.total)}</span>
      </li>
      <li class="correct-eventually" data-testid="correct-eventually">
        <span>Predictions That Became Correct</span>
        <span
          >{asPercent(christianData.total.correctEventually / christianData.total.incorrect)}</span
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
          >{asPercent(christianData.bold.correct / christianData.bold.total)}</td
        >
        <td data-testid="correct-cr">
          {asPercent(christianData.coolRanch.correct / christianData.coolRanch.total)}
        </td>
      </tr>
      <tr class="incorrect">
        <td>Rekt</td>
        <td data-testid="incorrect-b">
          {asPercent(christianData.bold.incorrect / christianData.bold.total)}
        </td>
        <td data-testid="incorrect-cr">
          {asPercent(christianData.coolRanch.incorrect / christianData.coolRanch.total)}
        </td>
      </tr>
      <tr class="partial">
        <td>Partial</td>
        <td data-testid="partial-b">
          {asPercent(christianData.bold.partial / christianData.bold.total)}
        </td>
        <td data-testid="partial-cr">
          {asPercent(christianData.coolRanch.partial / christianData.coolRanch.total)}
        </td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  .description p {
    text-align: center;
  }

  .leaderboard-container {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

  @media screen and (max-width: 600px) {
    .leaderboard-container {
      display: block;
    }
  }
</style>
