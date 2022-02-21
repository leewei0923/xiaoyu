// 处理maerkdown 文件

const str = `<h2 id="2022---01---12-有感而发">2022 - 01 - 12 有感而发</h2>
<p>回想起，过去的10年，成绩，生活方面有些不尽人意。</p>
<p>尤其是在初中的时候，学习成绩不出众的我，没有其他优势与别人竞争。那个时期的我们眼中只有学习，为了考试的学习，忽视了其 他方面的学习。似乎失去了什么东西。曾经听过某个不是著名的人但是很有道理的话，例如：你不要去做任何人都在做的事，却预期一个只有很少的人才能获得的结果。你只有做得和别人不一样，你才能拿到和别人不一样的结果。如果大家都做的一样，凭什么这个结果是给你的。</p>
<p>在初中时期，学习似乎成为一种枷锁，束缚着我们。所以，挣脱枷锁的任何东西都会成为我们的乐趣。但那个时期，我没学到什么东 西，没有养成良好的学习习惯，没有从长远的角度来看待自身。老师们给我们的目标就是上一所好高中，在我们巢湖就是1，2，4中学。 从初中的老师来说，让学生考上好的学校，是一个没有错误的。这是他们的任务，并不是育人，而是教书，用高压以及大量的重复将枯燥乏味的书本知识，灌输到你的记忆中。这样的储存方式并不是长久的，在缺乏高压命令下，所有的知识便会消失的无影无踪，似乎只记得它们曾经来过，再无其他痕迹。自我感知，自我思考的知识存入了我们的“知识库”，成为一种随机可读取的知识，成为对我们有益的知识。</p>
<p>从古代历史来看，受教育都是贵族才享有的特权。自新中国成立后，伟大的中国共产党，致力于普及文化知识，提高国民的文化素养 。从现在来看，这是一个很了不起的成就。从个人角度来看，教育的真正目的，在于培养自己独立思考问题的能力，不至于被人左右。倘若一个国家，任何一个人能被所谓的执政者所鼓吹，那这个国家的教育是失败的。他们的教育培养的都是执政者的傀儡，政治的牺牲品。这样的教育很是悲哀，这个地方的前途堪忧。</p>`;


const handleMarkdown = (content) => {
  return handleContent(content);
};

const handleContent = (content) => {
  // const titleTagPattern = new RegExp(/.*(?=<\/h\d)/g);
  // 匹配
  const titleTagReg = new RegExp(/.*(<\/h\d)/g);
  //匹配id属性正则
  const idReg = /id.*=[\'|\"].*[\'|\"]/g;
  const titles = content.match(titleTagReg);
  const ids = content.match(idReg);

  const res = [];

  if (titleTagReg.test(content) && idReg.test(content)) {
    for (let i = 0; i < titles.length; i++) {
      const { type, text } = getText(titles[i], "tagText");
      const { link } = getText(ids[i], "id");

      res.push({
        type: type,
        text: text,
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
      let idText = str.replace(/id.*=/, "");
      idText = idText.replace(/[\'|\"]/g, "");
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
