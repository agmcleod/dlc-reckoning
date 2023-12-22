<script lang="ts">
  import { onMount } from 'svelte'
  import { Host } from '$lib/types/host'
  import * as d3 from 'd3'
  import Profile from '$lib/components/Profile.svelte'
  import type { StatisticsData, StatisticsHostData } from './types'

  export let data: { leaderboard: StatisticsData }

  type Datum = { z: string | null }

  function asPercent(value: number): string {
    return `${Math.round(value * 1000) / 10}%`
  }

  let chartContainer: HTMLElement

  let hostDataCollection: Array<{ host: Host; data: StatisticsHostData }> = []

  for (const host of Object.keys(data.leaderboard)) {
    const dataForHost = data.leaderboard[host as Host]
    if (dataForHost.total.total > 0) {
      hostDataCollection.push({ host: host as Host, data: dataForHost })
    }
  }

  onMount(() => {
    // we use Jeff's year accuracy to get list of years
    const years = Object.keys(data.leaderboard[Host.Jeff].accuracyByYear).map(
      (y) => new Date(parseInt(y), 0, 1)
    )
    const width = 1000
    const height = 300

    const marginTop = 20
    const marginRight = 30
    const marginBottom = 30
    const marginLeft = 40

    const x = d3
      .scaleUtc()
      .domain(d3.extent(years, (d) => d) as any)
      .range([marginLeft, width - marginRight])
    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop])

    const svg = d3
      .create('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr(
        'style',
        `max-width: 100%; height: auto; overflow: visible; font: 10px Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;`
      )

    // add x-axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      )

    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      // .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick line')
          .clone()
          .attr('x2', width - marginLeft - marginRight)
          .attr('stroke-opacity', 0.1)
      )
      .call((g) =>
        g
          .append('text')
          .attr('x', -marginLeft)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text('Correct %')
      )

    const line = d3.line()

    let points: (string | number)[][] = []

    const pathNodes: Array<{
      path: d3.Selection<SVGPathElement, Datum, null, undefined>
      host: string
    }> = []

    for (const host of Object.keys(data.leaderboard)) {
      const hostVal = host as Host
      const hostData = data.leaderboard[hostVal]

      const hostPoints = Object.keys(hostData.accuracyByYear).map((year) => {
        return [
          x(new Date(parseInt(year), 0, 1)),
          y(hostData.accuracyByYear[year]!),
          host,
          hostData.accuracyByYear[year]!
        ]
      })

      points = points.concat(hostPoints)

      const path = svg
        .append('path')
        .attr('fill', 'none')
        // set this so it has the right datum type
        .datum<Datum>({ z: '' })
        .attr('stroke', hostVal === Host.Jeff ? '#008' : '#aa0')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .style('mix-blend-mode', 'multiply')
        .attr(
          'd',
          line(
            hostPoints as any // the types doesnt allow [number, number, string], but examples show this
          )
        )

      pathNodes.push({ path, host })
    }

    function pointermoved(event: Event) {
      const [xm, ym] = d3.pointer(event)
      const i = d3.leastIndex(points, ([x, y]) =>
        Math.hypot((x as number) - xm, (y as number) - ym)
      )
      const [x, y, k, percent] = points[i!]!
      for (const { path, host } of pathNodes) {
        if (host === k) {
          path
            .style('stroke', ({ z }: { z: string | null }) => (z === k ? null : '#ddd'))
            .filter(({ z }: { z: string | null }) => z === k)
            .raise()
        }
      }

      const labelString = `${k} ${Math.round((percent as number) * 10) / 10}%`
      dot.attr('transform', `translate(${x},${y})`)
      dot.select('text').text(labelString)
    }

    function pointerentered() {
      for (const { path } of pathNodes) {
        path.style('mix-blend-mode', null).style('stroke', '#ddd')
      }
      dot.attr('display', null)
    }

    function pointerleft() {
      for (const { path } of pathNodes) {
        path.style('mix-blend-mode', 'multiply').style('stroke', null)
      }
      dot.attr('display', 'none')
    }

    svg
      .on('pointerenter', pointerentered)
      .on('pointermove', pointermoved)
      .on('pointerleave', pointerleft)
      .on('touchstart', (event) => event.preventDefault())

    // Add an invisible layer for the interactive tip.
    const dot = svg.append('g').attr('display', 'none')

    dot.append('circle').attr('r', 2.5)

    dot.append('text').attr('text-anchor', 'middle').style('font-size', '1rem').attr('y', -8)

    chartContainer.append(svg.node()!)
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
</section>

<div bind:this={chartContainer}></div>

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
