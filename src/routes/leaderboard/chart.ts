import { Host } from '$lib/types/host'
import * as d3 from 'd3'
import type { StatisticsData } from './types'

type PathEl =
  | d3.Selection<SVGPathElement, undefined, null, undefined>
  | d3.Selection<SVGRectElement, (number | string)[], SVGSVGElement, undefined>

type PathNodes = Array<{
  path: PathEl
  host: string
}>

type Dot = d3.Selection<SVGGElement, undefined, null, undefined>

const LINE_COLOUR_MAP = {
  [Host.Christian]: '#aa0',
  [Host.Jeff]: '#008',
  [Host.Lana]: '#a00'
}

export function setupChart(data: { leaderboard: StatisticsData }, chartContainer: HTMLElement) {
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

  const pathNodes: PathNodes = []

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

    if (hostVal === Host.Lana) {
      const rect = svg
        .selectAll('mybar')
        .data(hostPoints)
        .enter()
        .append('rect')
        .attr('x', function (d) {
          return (d[0] as number) - 3
        })
        .attr('y', function (d) {
          return d[1] as number
        })
        .attr('width', 6)
        .attr('height', function (d) {
          console.log(y(d[1] as any))
          return height - (d[1] as number) - marginBottom
        })
        .attr('fill', LINE_COLOUR_MAP[hostVal])

      pathNodes.push({ path: rect, host })
    } else {
      const path = svg
        .append('path')
        .attr('fill', 'none')
        // set this so it has the right datum type
        // .datum<Datum>({ z: '' })
        .attr('stroke', LINE_COLOUR_MAP[hostVal])
        .attr('stroke-width', hostPoints.length === 1 ? 5 : 1.5)
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
  }

  // Add an invisible layer for the interactive tip.
  const dot: Dot = svg.append('g').attr('display', 'none')

  dot.append('circle').attr('r', 2.5)

  dot.append('text').attr('text-anchor', 'middle').style('font-size', '1rem').attr('y', -8)

  svg
    .on('pointerenter', pointerentered(pathNodes, dot))
    .on('pointermove', pointermoved(points, pathNodes, dot))
    .on('pointerleave', pointerleft(pathNodes, dot))
    .on('touchstart', (event) => event.preventDefault())

  chartContainer.append(svg.node()!)
}

function restyleEl(el: PathEl, stroke: string | null) {
  if (el['raise']) {
    el.style('stroke', () => {
      return stroke
    }).raise()
  }
}

function pointermoved(points: (string | number)[][], pathNodes: PathNodes, dot: Dot) {
  return (event: Event) => {
    const [xm, ym] = d3.pointer(event)
    const i = d3.leastIndex(points, ([x, y]) => Math.hypot((x as number) - xm, (y as number) - ym))
    const [x, y, k, percent] = points[i!]!
    for (const { path, host } of pathNodes) {
      if (host === k) {
        path
          .style('stroke', () => {
            return null
          })
          .raise()
      } else {
        path
          .style('stroke', () => {
            return '#ddd'
          })
          .raise()
      }
    }

    const labelString = `${k} ${Math.round((percent as number) * 10) / 10}%`
    dot.attr('transform', `translate(${x},${y})`)
    dot.select('text').text(labelString)
  }
}

function pointerentered(pathNodes: PathNodes, dot: Dot) {
  return () => {
    for (const { path } of pathNodes) {
      path.style('mix-blend-mode', null).style('stroke', '#ddd')
    }
    dot.attr('display', null)
  }
}

function pointerleft(pathNodes: PathNodes, dot: Dot) {
  return () => {
    for (const { path } of pathNodes) {
      path.style('mix-blend-mode', 'multiply').style('stroke', null)
    }
    dot.attr('display', 'none')
  }
}
