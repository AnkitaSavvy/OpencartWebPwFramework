//1 time helper file we have to write no need to memorize for interview

import fs from "fs";
import {parse} from 'csv-parse/sync';

//static method call by class name
export class CsvHelper{

    static readCsv(filePath:string):Record<string,string>[]{ //Record<string,string>[] is existing collection in js and helping to fetch data from csv file , maintain ,
        //use the imported parse object and readFileSync()
        return parse(fs.readFileSync(filePath, "utf-8"), 
        {
            columns:true ,//first row as headers
            skip_empty_lines:true,
            trim:true, //trim spaces
        }) as Record<string,string>[];//alias for record (maintaining data as a record)like map collection of java
    }
}
  
