# DLC Reckoning

## Data loader

CSV data that powers the predictions site can be exported from Google Sheets.

Once done so, you can compile & run the data loader package:

```bash
cd data-loader
cargo run -- '../DLC The Reckoning - Predictions.csv' ../src/lib/assets/data.json
```

## Developing

Once you've created a project you can start everything via docker:

```bash
docker-compose up
```
