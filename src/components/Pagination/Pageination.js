import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styles from "./pageination.module.scss";

export default function Pageination(props) {
  const { total, page, current,  pageSize, onDown, onUp} = props;
  const defaultPageSize = 8;

  
  return (
    <div className={styles.container}>
      <div className={styles.toDown} onClick={() => onDown()}>
        <LeftOutlined />
      </div>
      {}
      <div className={styles.toUp}>
        <RightOutlined onClick={() => onUp()} />
      </div>
    </div>
  );
}
