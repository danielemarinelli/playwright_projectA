import fs from "fs";
import path from "path";
import {parse} from "csv-parse/sync"
import { log } from "./logger";

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

/**
 * Reads file and returns string. For JSON, parse it before using
 */
function readFile(filePath: string): any {
  if (!fs.existsSync(filePath)) {
    throw new Error(`No file exists with given name:${filePath}`);
  }
  log("info", `Reading file: ${filePath}...`);
  let data = fs.readFileSync(filePath, "utf8");
  return data;
}
/**
 * Writes to target file. If target is json, stringify data
 * @param filePath fullpath incl extn of file
 * @param data
 */
function writeFile(filePath: string, data: string) {
  try {
    fs.writeFileSync(filePath, data);
    log("info", `Writing file: ${filePath}...`);
  } catch (err) {
    new Error(`Error writing to: ${filePath}, ${err}`);
  }
}


export default { readFile, writeFile, readCsvData };