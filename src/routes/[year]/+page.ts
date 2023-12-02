import type { SingleYearPredictionData } from './types'

export async function load({ params, parent }): Promise<SingleYearPredictionData> {
  const parentData = await parent()
  const year = parseFloat(params.year)
  return {
    year,
    predictions: parentData.data[year]
  }
}
