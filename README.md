# DLC Reckoning

## Data loader

CSV data that powers the predictions site can be exported from Google Sheets.

Once done so, you can compile & run the data loader package:

```bash
cd data-loader
cargo run -- '../DLC The Reckoning - Predictions.csv' ../src/lib/assets/data.json
```

## Developing

Once you've created a project and installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```
