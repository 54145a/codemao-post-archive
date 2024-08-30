import fs from "node:fs";



async function archivePost(id, timestamp) {
  if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
  }
  if (!fs.existsSync(`output/${timestamp}`)) {
    fs.mkdirSync(`output/${timestamp}`);
  }
  fs.mkdirSync(`output/${timestamp}/${id}`);
  const detailsText = await (await fetch(`https://api.codemao.cn/web/forums/posts/${id}/details`)).text();
  fs.writeFileSync(`output/${timestamp}/${id}/post.json`, detailsText);
  const n_replies = JSON.parse(detailsText).n_replies;
  const repliesText = await (await fetch(`https://api.codemao.cn/web/forums/posts/${id}/replies?page=1&limit=30&sort=-n_likes`)).text();
  fs.writeFileSync(`output/${timestamp}/${id}/replies.json`, repliesText);
}

export { archivePost };