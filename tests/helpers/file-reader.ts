import fs from "fs";
import path from "path";
import {parse} from "csv-parse/sync"

/**
 * READ THE CSV FILE AND RETURN THE DATA AS AN ARRAY OF OBJECTS
 * @param filePath 
 * @returns Array of obj
 */
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


export default { readCsvData };