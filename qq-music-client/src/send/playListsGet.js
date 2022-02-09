import axios from "./base-send";

function playListsGet(res, err, params) {
  const options = {
    url: "/playLists",
    method: "get",
    params: {
      offset: params.offset || 0,
    },
  };
  axios(options)
    .then(function (r) {
      res(r.data.result.playlists);
    })
    .catch(err);
}

export default playListsGet;
