import axios from "axios";

export const articlesServices = {
  postArticles,
  //deleteArticles,
};

function postArticles(payload) {
  if (payload.image != "") {
    return () => {
      axios.post("https://localhost:44331/api/Post", {
        user: payload.user,
        video: "",
        sharedImg: payload.imageUrl,
        comments: 0,
        description: payload.description,
      });
      //dispatch(setLoading(false));
    };
  } else if (payload.video) {
    axios.post("https://localhost:44331/api/Post", {
      user: payload.user,
      video: payload.video,
      sharedImg: "",
      comments: 0,
      description: payload.description,
    });
    //dispatch(setLoading(false));
  } else if (payload.description) {
    axios.post("https://localhost:44331/api/Post", {
      user: payload.user,
      video: "",
      sharedImg: "",
      comments: 0,
      description: payload.description,
    });
    //dispatch(setLoading(false));
  }
}
