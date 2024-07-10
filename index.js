import fs from "node:fs";
async function fetchAndWriteFile(file, url){
    return await fetch(url)
    .then(v=>v.text())
    .then(v=>fs.writeFileSync(file, v));
}
