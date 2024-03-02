import { store } from "../store/index.js";

export default (_, _1, next) => {
  if (store.getters.user) {
    next();
  } else {
    next("/signin");
  }
};
