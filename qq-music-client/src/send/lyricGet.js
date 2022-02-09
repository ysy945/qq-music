import axios from "./base-send";

function lyricGet(res, err, params) {
  const options = {
    url: "/lyric",
    method: "get",
    params: {
      id: params.id,
    },
  };
  axios(options)
    .then(function (r) {
      res(r.data.result);
    })
    .catch(err);
}

export default lyricGet;
