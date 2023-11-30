export interface Prediction {
  details: string
  score: Score
}

export enum Score {
  Correct,
  Incorrect,
  Partial,
  None
}
