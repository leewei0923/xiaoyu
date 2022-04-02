import AdminFrame from "~/src/components/admin/AdminFrame";
import { Editor, Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import highlightSsr from "@bytemd/plugin-highlight-ssr";
import { useState } from "react";
import styles from "~/styles/admin/editArticles.module.scss";
import { Button, message, Select } from "antd";
import matter from "gray-matter";
import { apiInsertCode, insertCode } from "~/src/request/api";
import { getItem } from "~/src/utils/localStorage";
import { timeFormatte } from "~/src/utils/timeFormatte";

const plugins = [
  gfm(),
  frontmatter(),
  highlightSsr(),
  // Add more plugins here
];

export default function EditArticles() {
  // select 选项
  const { Option } = Select;

  const [value, setValue] = useState(""); // 编辑器内容
  const [titleText, setText] = useState(""); // 标题

  // 发文类型  algorithm 算法 small-talk 说说(目前无)
  const [types, setTypes] = useState("algorithm");
  // 写标题
  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onSaveCode = async () => {
    const { data: frontmatter } = matter(value);
    const { link, tags } = frontmatter;
    const date = timeFormatte(Date.now() + 28800000)[0];
    const user = getItem("userInfo").value.split(" ")[0];
    const data = {
      content: value,
      types,
      name: titleText,
      draft: false,
      link,
      tags,
      date,
      user,
    };

    const info = await apiInsertCode(data);
    console.log(info);
    if (info.data.status == "ok") {
      message.success(info.data.msg);
    }
  };

  // 保存为草稿
  const handleDraft = () => {
     const [user, permission] = getItem("userInfo").value.split(" ");
     if (permission !== "admin") {
       message.warn("权限不足无法存入草稿箱, 暂未开放");
       return;
     }
  };

  // 保存
  const handleSubmit = () => {

    const [user, permission] = getItem("userInfo").value.split(" ");
    if (permission !== "admin") {
      message.warn("权限不足无法保存, 可以申请权限");
      return;
    }


    if (titleText.length < 0) {
      message.error("标题字数小于5");
    } else {
      switch (types) {
        case "algorithm":
          onSaveCode();
          return;
        case "small-talk":
          return;
        default:
          return;
      }
    }
  };

  // 选择保存路径

  const handleSavePath = (value) => {
    setTypes(value);
  };

  return (
    <AdminFrame theKey="editArticles">
      <div className={styles.topBtnBox}>
        <input
          type="text"
          placeholder="请输入你的标题..."
          className={styles.titleInput}
          value={titleText}
          onChange={(e) => onChangeText(e)}
        />
        <div className={styles.options}>
          <Select defaultValue="algorithm" onChange={(v) => handleSavePath(v)}>
            <Option value="algorithm">算法</Option>
            <Option value="Small-talk">说说</Option>
          </Select>
          <Button
            ghost
            type="primary"
            className={styles.drafts}
            onClick={() => handleDraft()}
          >
            草稿箱
          </Button>
          <Button
            type="primary"
            className={styles.save}
            onClick={() => handleSubmit()}
          >
            保存
          </Button>
        </div>
      </div>
      <Editor
        value={value}
        plugins={plugins}
        onChange={(v) => {
          setValue(v);
        }}
      />

    </AdminFrame>
  );
}
