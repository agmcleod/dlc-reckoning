import type { SingleYearPredictionData } from './types'

const episodeTidbits: { [year: string]: string } = {
  2015: 'This was the first year the PC gaming conference happened',
  2018: 'On this episode they changed from "crazy" to "cool ranch". Though the title persists "crazy" for this year',
  2019: 'In the episode was the first appearance of The Spiceman. First occurance of the TooManyGames bumper as well.',
  2021: 'While not in the episode itself, 2021 became the year they started using the "Jeff Was Right" bumper. This is in reference to so many games getting delayed due to the impact of the COVID-19 Pandemic.'
}

export async function load({ params, parent }): Promise<SingleYearPredictionData> {
  const parentData = await parent()
  const year = parseFloat(params.year)
  return {
    year,
    predictions: parentData.data[year],
    episodeTidbit: episodeTidbits[year]
  }
}
