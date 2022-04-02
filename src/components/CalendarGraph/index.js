import { Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./calendar.module.scss";
import { useEffect, useState } from "react";
import { generateAllDay, generateCurAllDay } from "~/src/utils/timeFormatte";

export default function Index(props) {
  const { Option } = Select;
  // 选择器数据
  const [selectValue, setSelectValue] = useState("过去的一年");
  const [allDate, setAllDate] = useState(generateCurAllDay());
  // 题目的个数
  const { commitData } = props;

  //
  const addCommitData = (d) => {
    const date = [...d];
    for (const x of commitData) {
      const { _id, code_count } = x;
      const index = date.indexOf(_id);
      date[index] = [];
      date[index].push(_id, code_count);
    }
    setAllDate(date);
  };




  const onSelectChange = (v) => {
    setSelectValue(v);
    if (v == "过去的一") {
      addCommitData(generateCurAllDay());
    } else {
      addCommitData(generateAllDay(v));
    }

  };

  

  useEffect(() => {
    addCommitData(generateCurAllDay());
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
            <Option value="2022-01-01">2022年</Option>
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
                        data-count={
                          typeof allDate[index * 7 + index2] == "object"
                            ? allDate[index * 7 + index2][1]
                            : 0
                        }
                        data-date={
                          typeof allDate[index * 7 + index2] == "object"
                            ? allDate[index * 7 + index2][0]
                            : allDate[index * 7 + index2]
                        }
                        fill="#EBEDF0"
                      >
                        <title className={styles.title}>
                          {`${allDate[index * 7 + index2][0]}, ${
                            allDate[index * 7 + index2][1]
                          }题`}
                        </title>
                      </rect>
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
