import AdminFrame from "~/src/components/admin/adminFrame";
import { Editor, Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import highlightSsr from "@bytemd/plugin-highlight-ssr";
import { useState } from "react";
import styles from "~/styles/admin/editArticles.module.scss";
import { Button, message } from "antd";

const plugins = [
  gfm(),
  frontmatter(),
  highlightSsr(),
  // Add more plugins here
];

export default function EditArticles() {
  const [value, setValue] = useState("");
  const [titleText, setText] = useState("");

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  
  const handleDraft = () => {};

  const handleSubmit = () => {

    if(titleText.length < 5) {
      message.error("标题字数小于5")
    } else {
      console.log(titleText);
    }
    
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
