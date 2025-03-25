import { Host } from '$lib/types/host'
import * as d3 from 'd3'
import type { StatisticsData } from './types'

export const LINE_COLOUR_MAP = {
  [Host.Christian]: '#e41a1c',
  [Host.Jeff]: '#377eb8',
  [Host.Lana]: '#4daf4a'
}

export function setupChart(data: { leaderboard: StatisticsData }, chartContainer: HTMLElement) {
  console.log('SETUP CHART')
  // we use Jeff's year accuracy to get list of years
  const years = Object.keys(data.leaderboard[Host.Jeff].accuracyByYear).map((y) => y)
  const width = 1000
  const height = 300

  const marginTop = 20
  const marginRight = 30
  const marginBottom = 30
  const marginLeft = 40

  const subgroups = [Host.Christian, Host.Jeff, Host.Lana]

  const x = d3
    .scaleBand()
    .domain(years)
    .range([marginLeft, width - marginRight])
    .padding(0.2)
  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop])

  const xSubgroup = d3.scaleBand().domain(subgroups).range([0, x.bandwidth()]).padding(0.05)

  const colour = d3.scaleOrdinal().domain(subgroups).range(Object.values(LINE_COLOUR_MAP))

  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', `font: 10px Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;`)

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

  const barData: { [year: string]: Array<{ host: string; year: string; accuracy: number }> } = {}

  for (const host of Object.keys(data.leaderboard)) {
    const hostVal = host as Host
    const hostData = data.leaderboard[hostVal]

    for (const year of Object.keys(hostData.accuracyByYear)) {
      if (!barData[year]) {
        barData[year] = []
      }

      barData[year].push({
        host,
        year,
        accuracy: hostData.accuracyByYear[year]!
      })
    }
  }

  const barDataArray = Object.keys(barData).map((year) => {
    return { year, data: barData[year]! }
  })

  svg
    .append('g')
    .selectAll('g')
    .data(barDataArray)
    .enter()
    .append('g')
    .attr('transform', (d) => {
      return `translate(${x(d.year)},0)`
    })
    .selectAll('rect')
    .data((d) => {
      return subgroups
        .filter((key: Host) => {
          return d.data?.find((row) => row.host === key && row.year === d.year)
        })
        .map((key: Host) => ({ key, value: d.data?.find((row) => row.host === key) }))
    })
    .enter()
    .append('rect')
    .attr('x', (d) => xSubgroup(d.key)!)
    .attr('y', function (d) {
      return y(d.value?.accuracy!)
    })
    .attr('width', xSubgroup.bandwidth())
    .attr('height', function (d) {
      return height - y(d.value?.accuracy!) - marginBottom
    })
    .attr('fill', (d) => colour(d.key) as string)
    .attr(
      'label',
      (d) => `${d.value?.host} got ${Math.round(d.value?.accuracy || 0)}% for ${d.value?.year}`
    )

  for (const { year, data } of barDataArray) {
    for (const hostData of data) {
      svg
        .append('g')
        .attr(
          'transform',
          `translate(${xSubgroup(hostData.host)! + x(year)!},${y(hostData.accuracy) - 10})`
        )
        .append('text')
        .attr('text-anchor', 'left')
        .style('font-size', '0.6rem')
        .text(`${Math.round(hostData.accuracy)}%`)
    }
  }

  chartContainer.append(svg.node()!)
}
