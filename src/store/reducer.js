import { combineReducers } from "redux";
import * as types from "./type";

const initialImgUrl = {
  imgUrl: ``,
};

const initlPageTitle = {
  navTopTitle: ``,
};

const imgUrlReducer = (state = initialImgUrl, { type, changeBg }) => {
  switch (type) {
    case types.IMGURL:
      return { imgUrl: changeBg.imgUrl };

    default:
      return state;
  }
};

const pageReducer = (state = initlPageTitle, { type, title }) => {
  switch (type) {
    case types.PAGETITLE:
      return { navTopTitle: title };
    default:
      return state;
  }
};

const reducers = {
  changeBgImg: imgUrlReducer,
  pageTitleChange: pageReducer,
};

export default combineReducers(reducers);
