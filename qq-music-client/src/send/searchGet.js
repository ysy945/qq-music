import axios from "./base-send";
function searchGet(fn, err, params) {
  const options = {
    url: "/search",
    method: "get",
    params: {
      offset: params.offset || 0,
      keyWords: params.keyWords,
    },
  };
  axios(options)
    .then((res) => {
      fn(res.data);
    })
    .then(err);
}
export default searchGet;
