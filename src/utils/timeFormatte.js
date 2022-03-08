/**
 * leewei
 * 22.02.21
 * 时间格式化
 */

const timeFormatte = (date, type="common") => {
  switch (type) {
    case "yy-mm-dd":
      return handleShortDelimiter(date);
    case "mixTime":
      return handleMixTime(date);
    case "common":
      return handleCommonTime(date);
    default:
      return;
  }
};

// 生成像 22-02-21 格式的图像
const handleShortDelimiter = (date) => {
  const dateList = date.split(".");
  return dateList.join("-");
};

// 生成 时间格式中既有中文又有数字

const handleMixTime = (date) => {
  const [year, month, day] = date.split(".");
  const numberCN = [
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "十一",
    "十二",
  ];
  return `${numberCN[Number(month) - 1]}月 ${day}日, ${year}`;
};

// 生成2022-10-01 12:00 格式的时间

const handleCommonTime = (date) => {
 return new Date(date)
          .toISOString()
          .replace(/T/g, " ")
          .replace(/\.[\d]{3}Z/, "")
          .replace(/:/g, ":")
          .split(" ");
}

export { timeFormatte };
