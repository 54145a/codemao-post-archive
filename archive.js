import console from "node:console";
import fs from "node:fs";

async function archivePost(id, timestamp) {
  const details = await (await fetch(`https://api.codemao.cn/web/forums/posts/${id}/details`)).json();
  if(details.error_code){
    console.log(id, details.error_code);
    return false;
  }
  console.log(id);
  fs.mkdirSync(`output/${timestamp}/${id}`);
  fs.writeFileSync(`output/${timestamp}/${id}/post.json`, JSON.stringify(details));
  const n_replies = details.n_replies;
  const repliesText = await (await fetch(`https://api.codemao.cn/web/forums/posts/${id}/replies?page=1&limit=30&sort=-n_likes`)).json();
  fs.writeFileSync(`output/${timestamp}/${id}/replies.json`, JSON.stringify(repliesText));
}
async function archive(postIdList) {
  if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
  }
  const timestamp = Date.now();
  fs.mkdirSync(`output/${timestamp}`);
  for (const id of postIdList) {
    await archivePost(id, timestamp);
  }
}
export { archive };