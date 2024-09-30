import fs from "fs/promises";
import path from "path";

/** Task 1 finding all folders in directory */

const readingFiles = async (filePath) => {
  try {
    // reads everyfile in that folder
    const files = await fs.readdir(filePath);
    // recurrsion base case
    if (files.length < 1) return; 
    for (let file of files) {
      let stats = await fs.stat(path.join(filePath, file));
      if (stats.isFile()) console.log(`name of file :- ${file}`);
      else{
        console.log(`This is the directory:- ${file}`)
        readingFiles(path.join(filePath, file));
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
const dir = "../fuzzy search"

readingFiles(dir)