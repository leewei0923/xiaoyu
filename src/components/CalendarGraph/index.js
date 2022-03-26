import { Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./calendar.module.scss";
import { useEffect, useState } from "react";
import { generateAllDay, generateCurAllDay } from "~/src/utils/timeFormatte";

export default function Index() {
  const { Option } = Select;
  const [selectValue, setSelectValue] = useState("过去的一年");
  const [allDate, setAllDate] = useState([]);

  const onSelectChange = (v) => {
    setSelectValue(v);
    if (v == "过去的一") {
      setAllDate(generateCurAllDay());
    } else {
      setAllDate(generateAllDay(v));
    }
  };

  useEffect(() => {
    setAllDate(generateCurAllDay());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.calendarHeader}>
        <p className={styles.headerTitle}>{selectValue} 年内一共提交了232次</p>
        <div className={styles.select}>
          <Select
            defaultValue="过去的一"
            style={{ width: 120 }}
            onChange={(v) => onSelectChange(v)}
          >
            <Option value="过去的一">过去的一年</Option>
            <Option value="2022">2022年</Option>
          </Select>
        </div>
      </div>

      <div className={styles.graph}>
        <svg className={styles.calendarGraphSvg} width="722" height="112">
          <g transform="translate(10, 20)">
            {new Array(52).fill(0).map((item, index) => {
              return (
                <g
                  transform={`translate(${index * 14}, 0)`}
                  key={index + "svg"}
                >
                  {new Array(7).fill(0).map((item2, index2) => {
                    return (
                      <rect
                        key={`${index}-${index2}-svg`}
                        width="10"
                        height="10"
                        x={`${14 - index}`}
                        y={`${index2 * 13}`}
                        className={styles.contributionCalendarDay}
                        rx="2"
                        ry="2"
                        data-count="0"
                        data-date={allDate[(index + 1) * (index2 + 1)]}
                        data-level="0"
                        fill="#EBEDF0"
                      ></rect>
                    );
                  })}
                </g>
              );
            })}

          </g>
        </svg>
      </div>
    </div>
  );
}
