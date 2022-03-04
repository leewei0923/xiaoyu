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