// leewei 02.11 导航文字设置
import github from "../../public/images/icons/github.png";
import facebook from "../../public/images/icons/facebook.png";
import qq from "../../public/images/icons/qq.png"
import weibo from "../../public/images/icons/weibo.png"
import weixin from "../../public/images/icons/weixin.png"
import email from "../../public/images/icons/email.png"


const baseNav = [
  {
    id: 0,
    text: "主页",
    url: "/",
  },
  {
    id: 1,
    text: "笔记/文档",
    url: "/doc",
  },
  {
    id: 2,
    text: "作品集",
    url: "/works",
  },
];

const otherOptions = [
  {
    id: 0,
    text: "归档",
    url: "/archive",
  },
  {
    id: 1,
    text: "照片墙",
    url: "/photoWall",
  },
  {
    id: 2,
    text: "留言录",
    url: "/messagebook",
  },
  {
    id: 2,
    text: "关于作者",
    url: "/author",
  },
];

const socialLink = [
  {
    id: 0,
    text: "github",
    img: github,
  },
  {
    id: 1,
    text: "微信",
    img: weixin,
  },
  {
    id: 2,
    text: "qq",
    img: qq,
  },
  {
    id: 3,
    text: "微博",
    img: weibo,
  },
  {
    id: 4,
    text: "Facebook",
    img: facebook,
  },
  {
    id: 6,
    text: "Email",
    img: email,
  },
];
export { baseNav, otherOptions, socialLink };
