import AdminFrame from "~/src/components/admin/adminFrame";
import {
  Select,
  message
} from "antd";
import { useEffect, useState } from "react";
import DraftCode from "~/src/components/admin/DraftCode/index";
import {
  apiLoadCodeDrafts,
  apiUpdateInfoCode,
  apiDeleteCode,
} from "~/src/request/api";

export default function Drafts() {
  const { Option } = Select;
  const [types, setTypes] = useState("algorithm");
  const [dataList, setDataList] = useState("");

  // select 选择索要展示的页面
  // 算法页面
  const onEdit = () => {
    console.log("修改");
  };

  const onDelete = async () => {
     const info = await apiDeleteCode({
       _id: v._id,
     });

     if (info.data.status == "ok") {
       message.success(info.data.msg);
       fetchData();
     }
  };

  const onPost = async (v) => {
    const info = await apiUpdateInfoCode({
      _id: v._id,
      draft: false,
    });

    if (info.data.status == "ok") {
      message.success(info.data.msg);
      fetchData();
    }
  };

  const showList = [
    {
      key: 1,
      text: "算法",
      name: "algorithm",
      component: (
        <DraftCode
          listData={dataList}
          onEdit={onEdit}
          onDelete={onDelete}
          onPost={onPost}
          key="algorithm-componnet"
        />
      ),
      api: apiLoadCodeDrafts,
    },
    {
      key: 2,
      text: "说说",
      name: "small-talk",
      component: "",
      api: "",
    },
  ];

  // 获取数据

  const fetchData = () => {
    showList.map(async (item) => {
      if (item.name == types) {
        let info = await item.api();
        setDataList(info.data.info);
      }
    });
  };

  //
  const handleSelection = (v) => {
    setTypes(v);
  };

  useEffect(() => {
    let isMouted = false;

    if (!isMouted) {
      fetchData();
    }

    () => {
      isMouted = true;
    };
  }, []);

  return (
    <AdminFrame>
      <Select defaultValue="algorithm" onChange={(v) => handleSelection(v)}>
        <Option value="algorithm">算法</Option>
        <Option value="Small-talk">说说</Option>
      </Select>
      <hr style={{ margin: "5px 0" }} />
      {showList.map((item) => {
        if (item.name == types) {
          return item.component;
        }
      })}
      
    </AdminFrame>
  );
}
