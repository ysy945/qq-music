const axios = require("axios");
const createSucRs = require("../utils/createSucRs");
const createErrRs = require("../utils/createErrRs");

function playLists(req, response) {
  const query = req.query;
  axios({
    url: "https://api.music.imsyy.top/top/playlist",
    params: {
      offset: query.offset,
      order: "hot",
      limit: 18,
    },
  })
    .then((res) => {
      response.send(createSucRs(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = playLists;
