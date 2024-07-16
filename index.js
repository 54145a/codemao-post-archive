import fs from "node:fs";

async function fetchAndWriteFile(file, url) {
  
}

async function archivePost(id) {
  if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
  }
  const time = Date.now();
  if (!fs.existsSync(`output/${time}`)) {
    fs.mkdirSync(`output/${time}`);
  }
  fs.mkdirSync(`output/${time}/${id}`);
  const detailsText = await (await fetch("https://api.codemao.cn/web/forums/posts/${id}/details")).text();
  fs.writeFileSync(`output/${time}/${id}/post.json`,detailsText);
  const n_replies = JSON.parse(detailsText).n_replies;
  const repliesIndex = await (await fetch("https://api.codemao.cn/web/")).text();
}

archivePost("682227");
