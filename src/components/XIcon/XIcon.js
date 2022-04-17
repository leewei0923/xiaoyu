import React from 'react'
import { createFromIconfontCN } from "@ant-design/icons";


export default function XIcon({className, type, styles}) {

  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_3335181_f1lgvdsd0zv.js",
  });
  return (
    <span className={className}>
      <IconFont type={type} style={styles} />
    </span>
  );
}
