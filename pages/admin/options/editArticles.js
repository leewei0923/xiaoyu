import AdminFrame from "~/src/components/admin/adminFrame";
import { Editor, Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import { useState } from "react";
// import "bytemd/dist/index.min.css";


const plugins = [
  gfm(),
  // Add more plugins here
];

export default function EditArticles() {
 const [value, setValue] = useState("");

  return (
    <AdminFrame theKey="editArticles">
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
