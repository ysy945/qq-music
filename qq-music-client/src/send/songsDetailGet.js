import axios from "./base-send";

function songsDetailGet(fn, err, id) {
  const options = {
    url: "/songsDetail",
    params: {
      id,
    },
    method: "get",
  };
  axios(options)
    .then((res) => {
      fn(res.data);
    })
    .catch(err);
}

export default songsDetailGet;
