import { postConstants } from "./postConstants";
import { articlesServices } from "../services/articlesServices";
export const articlesActions = {
  postArticles,
  //deleteArticles,
};

function postArticles(payload) {
  return (dispatch) => {
    articlesServices.postArticles(payload).then((payload) => {
      dispatch(success(payload));
      console.log(payload);
    });
  };
}

function success(payload) {
  console.log("success", payload);
  return { type: postConstants.POST_ARTICLES_SUCCESS, payload };
}
