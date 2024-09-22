import fs from "node:fs";
import { Console } from "node:console";

const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
const console = new Console({ stdout: output, stderr: errorOutput });
async function archivePost(id, timestamp) {
  const details = await (await fetch(`https://api.codemao.cn/web/forums/posts/${id}/details`)).json();
  if (details.error_code) {
    console.log(id, details.error_message);
    return details.error_code.startsWith("Limit-Operation") ? await archivePost(id, timestamp) : false;
  }
  if (!fs.existsSync(`output/${id}`)) {
    fs.mkdirSync(`output/${id}`);
  }
  fs.mkdirSync(`output/${id}/${timestamp}`);
  fs.writeFileSync(`output/${id}/${timestamp}/post.json`, JSON.stringify(details));
  const n_replies = details.n_replies;
  const repliesText = await (await fetch(`https://api.codemao.cn/web/forums/posts/${id}/replies?page=1&limit=30&sort=-n_likes`)).json();
  fs.writeFileSync(`output/${id}/${timestamp}/replies.json`, JSON.stringify(repliesText));
  console.log(id, "存档完成");
}
async function archive(postIdList) {
  if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
  }
  const timestamp = Date.now();
  for (const id of postIdList) {
    await archivePost(id, timestamp);
  }
}
export { archive };