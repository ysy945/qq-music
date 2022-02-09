const axios = require("axios");
const createSucRs = require("../utils/createSucRs");
const createErrRs = require("../utils/createErrRs");
function recommend(req, res) {
  axios
    .get("https://api.music.imsyy.top/personalized")
    .then((result) => {
      if (result.data) {
        res.send(createSucRs(result.data.result.reverse()));
      }
    })
    .catch((err) => {
      res.send(createErrRs(err));
    });
}

module.exports = recommend;
