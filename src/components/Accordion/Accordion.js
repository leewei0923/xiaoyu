import { useState } from "react";
import styles from "./Accordion.module.scss";
import AccordionItem from "./AccordionItem/AccordionItem";

// 手风琴 组件
export default function Accordion(props) {
  const { defaultIndex, onItemClick, children } = props;
  const [bindIndex, setBindIndex] = useState(defaultIndex);
  //
  const changeItem = (itemIndex) => {
    if (typeof onItemClick === "function") onItemClick(itemIndex);
    if (itemIndex !== bindIndex) setBindIndex(itemIndex);
  };

  const items = children.filter(
    (item) => item.type.name === AccordionItem.name
  );

  return (
    <div className={styles.wrapper}>
      {items.map(({ props }) => (
        <AccordionItem
          key={props.index}
          label={props.label}
          handleClick={() => changeItem(props.index)}
          child={props.children}
        ></AccordionItem>
      ))}
    </div>
  );
}
