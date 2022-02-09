import axios from "./base-send";

function rankingListGet(fn, err) {
  const options = {
    url: "/topList",
    method: "get",
  };
  axios(options)
    .then((res) => {
      fn(res.data.result);
    })
    .catch(err);
}

export default rankingListGet;
