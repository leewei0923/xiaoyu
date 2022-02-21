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
