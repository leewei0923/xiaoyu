import * as types from "./type";

export const changeBgImg = (url) => (distpatch) =>
  distpatch({
    type: types.IMGURL,
    changeBg: {
      imgUrl: url,
    },
  });

export const pageTitleChange = (title) => (dispatch) => {
  dispatch({
    type: types.PAGETITLE,
    title: title
  })
}

// 记住 admin 导航菜单展开
export const changeTheKey = (key) => (dispatch) => {
  dispatch({
    type: types.THEKEY,
    key: key,
  });
};

export const changeSubKey = (key) => (dispatch) => {
  dispatch({
    type: types.SUBKEY,
    key: key,
  });
};

// 首页文章展现形式, 默认 混合

export const changePageMode = (state) => (dispatch) => {
  dispatch({
    type: types.SUBKEY,
    modeState: state,
  });
};