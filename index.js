import fs from "node:fs";
import { archive } from "./archive.js";
const archivedPostIdList = fs.readdirSync("output").map(i => +i);
const lastArchivedPostId = Math.max(...archivedPostIdList);
archive(...archivedPostIdList, Array.from(Array(100000)).map((v, i) => i + 1 + lastArchivedPostId));