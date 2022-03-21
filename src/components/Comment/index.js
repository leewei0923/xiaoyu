/**
 * 评论组件
 */

import React, { createElement, useState } from "react";
import { Comment, Tooltip, Avatar, Tag, message } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import styles from "./comment.module.scss";
import { getItem } from "~/src/utils/localStorage";
import { apiDelFrontComment } from "~/src/request/api";

export default function Index(props) {
  const { children, messageInfo, onUpdate } = props; // children 用于嵌套, messageInfo 传来评论信息
  // 可控 点赞
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  //
  const { commentName, content, date, commentedName, _id, userID } =
    messageInfo;

  // 点赞
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  // 删除按钮
  const onRmMessageFront = async (e) => {
    const userID = getItem("userID").value;
    const commentID = e.target.dataset.id;
    const bcakInfo = await apiDelFrontComment({ commentID, userID });
    const { status, msg } = bcakInfo.data;

    if (status == "ok") {
      message.success(msg);
      // 更新页面
      onUpdate();
    } else {
      message.error("删除失败");
    }
    console.log(bcakInfo)
  };

  const actions = (_id, userID) => [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="删除">
      {userID == getItem("userID").value ? (
        <span onClick={onRmMessageFront}>
          <span className="comment-action" data-id={_id} data-user-id={userID}>
            删除
          </span>
        </span>
      ) : (
        ""
      )}
    </Tooltip>,
  ];

  return (
    <Comment
      actions={actions(_id, userID)}
      author={
        <span>
          {commentedName ? (
            <>
              <span
                style={{ fontSize: "13px", fontWeight: "600", color: "black" }}
              >{`${commentName}`}</span>
              <sup color="#108ee9" className={styles.tag}>
                管理员
              </sup>
              <span>{`回复`}</span>{" "}
              <span
                style={{ fontSize: "13px", fontWeight: "600", color: "black" }}
              >{`${commentedName}`}</span>
            </>
          ) : (
            <span
              style={{ fontSize: "13px", fontWeight: "600", color: "black" }}
            >{`${commentName}`}</span>
          )}
        </span>
      }
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
      content={<p>{content}</p>}
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{date}</span>
        </Tooltip>
      }
    >
      {children}
    </Comment>
  );
}
