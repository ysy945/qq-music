import axios from "./base-send";

function recommendGet(res, err) {
  const options = {
    url: "/randomSongs",
    method: "get",
  };
  axios(options)
    .then(function (r) {
      res(r.data);
    })
    .catch(err);
}

export default recommendGet;
