// 处理maerkdown 文件

const handleMarkdown = (content) => {
  return handleContent(content);
};

const handleContent = (content) => {
  // const titleTagPattern = new RegExp(/.*(?=<\/h\d)/g);
  // 匹配
  const titleTagReg = new RegExp(/.*(<\/h(1|2|3|4))/g);
  //匹配id属性正则
  const idReg = /<[a-zA-Z0-9][^>]+?id=[^>]+?>.*?/g;
  const titles = content.match(titleTagReg);
  const ids = content.match(idReg);
  const res = [];

  if (titleTagReg.test(content) && idReg.test(content)) {
    for (let i = 0; i < titles.length; i++) {
      const { type, text } = getText(titles[i], "tagText");
      const { link } = getText(ids[i], "id");

      res.push({
        type: type,
        text: link,
        link: link,
      });
    }
  }

  return res;
};

function getText(str, type) {
  const textReg = /\>.*\</g;
  switch (type) {
    case "tagText":
      // 获取标签
      let tag = str.match(/h\d/g)[0];
      // 获取内容
      let tagText = str.match(textReg)[0];
      tagText = tagText.replace(">", "");
      tagText = tagText.replace("<", "");
      return { type: tag, text: tagText };
    case "id":
      // 获取id属性的值
      let idText = str.match(/\".+\"/g)[0];
      idText = idText.replace(/[\'|\"]/g, "");
      // console.log(idText)
      return { link: idText };
  }
}


export {handleMarkdown}

// listTree = [
//   {
//     type: "h2",
//     text: "二级标题",
//     link: "二级标题",
//     show: true,
//   },
//   {
//     type: "h3",
//     text: "三级标题",
//     link: "三级标题",
//     show: true,
//   },

// ];
