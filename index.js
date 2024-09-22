import fs from "node:fs";
import { archive } from "./archive.js";
import { arch } from "node:os";
const archivedPostIdList = fs.readdirSync("output").map(i => +i);
const lastArchivedPostId = Math.max(...archivedPostIdList);
archive(Array.from(Array(10000)).map((v, i)=>i+1));