import styles from "./AccordionItem.module.scss";
import clasnames from 'classnames';
export default function AccordionItem(props) {
  const { handleClick, label, isCollapsed, child} = props;

  const collapseContent = clasnames({
    [styles.collapseContent]: true,
    [styles.collapsed]: isCollapsed,
    [styles.expanded]: !isCollapsed,
  })
  return (
    <>
      {/* 按钮 点击传入的handleClick */}
      <button className={styles.buttonStyle} onClick={() => handleClick()}>
        {label}
      </button>

      {/* 控制 显示 / 隐藏 状态 */}

      <div className={collapseContent} aria-expanded = {isCollapsed}>
      {child}
      </div>
    </>
  );
}
