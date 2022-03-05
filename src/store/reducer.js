import { combineReducers } from "redux";
import * as types from "./type";

const initialImgUrl = {
  imgUrl: ``,
};

const initlPageTitle = {
  navTopTitle: ``,
};

const initTheKey = {
  theKey: [""],
};

const initSubKey = {
  subKey: [""],
};

const initPageMode = {
  modeState: false,
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

const theKeyReducer = (state = initTheKey, { type, key }) => {
  switch (type) {
    case types.THEKEY:
      return { theKey: key };
    default:
      return state;
  }
};

const SubKeyReducer = (state = initSubKey, { type, key }) => {
  switch (type) {
    case types.SUBKEY:
      return { subKey: key };
    default:
      return state;
  }
};

const pageModeReducer = (state = initPageMode, { type, pState }) => {
  switch (type) {
    case types.PAGEMODE:
      return { modeState: pState };
    default:
      return state;
  }
};

const reducers = {
  changeBgImg: imgUrlReducer,
  pageTitleChange: pageReducer,
  changeTheKey: theKeyReducer,
  changeSubKey: SubKeyReducer,
  changePageState: pageModeReducer,
};

export default combineReducers(reducers);
