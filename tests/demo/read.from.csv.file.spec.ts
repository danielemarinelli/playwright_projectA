import fs from "fs";
import path from "path";
// install the csv-parse lib with command --> npm i --save-dev csv-parse
import {parse} from "csv-parse/sync"

// to run the script execute the following command:
//---->>>> node tests/demo/read.from.csv.file.spec.ts

// read file with native 'fs' module
const csvFilePath = path.resolve(`${process.cwd()}/data/functional/make-apt-test-data.csv`);
const csvDataInStringFormat = fs.readFileSync(csvFilePath,{encoding:"utf-8"})
console.log("--->", csvFilePath)
console.log("##############")
console.log(typeof csvFilePath)

// Parse the csv data -> Array of data (must install csv-parse)
const csvDataAsArray = parse(csvDataInStringFormat,{
    columns:true,
    skip_empty_lines:true,
    trim:true,
})

console.log("##############")
console.log(csvDataAsArray)


// this code must be inserted as re-usable function in a helper file:
function readCsvData(filePath:string): any[] {
    // read a file with native 'fs' module
    const csvDataInStringFormat = fs.readFileSync(filePath, { encoding: "utf-8" });
    //parse the csv data -> Array of data
    const csvDataAsArray = parse(csvDataInStringFormat, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });
    return csvDataAsArray;
}

//Unit test to validate the readCsvData function
const testData = readCsvData(csvFilePath);
console.log("###### Using the helper function!!! ########")
console.log(testData)
console.log("================================")
console.log(testData[0].testId)  
console.log(testData[1].comment)
