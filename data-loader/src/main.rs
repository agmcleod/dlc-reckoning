use std::error::Error;
use std::fs::File;
use std::io::Write;
use std::{env, process};

use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Debug, Deserialize, Serialize)]
enum PredictionType {
    Bold,
    #[serde(rename(deserialize = "Cool Ranch"))]
    CoolRanch,
}

#[derive(Debug, Deserialize, Serialize)]
enum Host {
    Christian,
    Jeff,
    Both,
}

#[derive(Debug, Deserialize, Serialize)]
enum Score {
    #[serde(rename(deserialize = "Yes"))]
    Correct,
    #[serde(rename(deserialize = "No"))]
    Incorrect,
    Partial,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all(deserialize = "PascalCase"))]
struct Prediction {
    year: usize,
    prediction: String,
    #[serde(rename(deserialize = "Type"))]
    prediction_type: Option<PredictionType>,
    host: Option<Host>,
    #[serde(rename(deserialize = "Correct"))]
    score: Option<Score>,
    #[serde(rename(deserialize = "Correct Eventually", serialize = "correct_eventually"))]
    correct_eventually: String,
    details: String,
}

fn parse_csv(path: &String) -> Result<Vec<Prediction>, Box<dyn Error>> {
    let mut reader = csv::Reader::from_path(path)?;

    let mut list = Vec::new();

    for result in reader.deserialize() {
        let record: Prediction = result?;
        if record.host.is_some() {
            list.push(record);
        }
    }

    Ok(list)
}

fn main() -> Result<(), Box<dyn Error>> {
    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Missing arguments, provide path to input file & path to output file. cargo run -- <input.csv> <output.json>");
        process::exit(1);
    }

    let file_name = &args[1];

    let list = parse_csv(file_name)?;

    let json = serde_json::to_string(&list)?;
    let mut file = File::create(&args[2])?;
    file.write_all(json.as_bytes())?;

    Ok(())
}
