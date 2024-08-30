import fs from "node:fs";
import { archive } from "./archive.js";
//const archivedPostIdList = fs.readdirSync(`output/${Math.max(...fs.readdirSync("output").map(v => +v))}`);
archive(Array.from({length: 100000}, (v, i) => i + 1));