const axios = require("axios");
const createSucRs = require("../utils/createSucRs");
const createErrRs = require("../utils/createErrRs");

function lyric(req, response) {
  const query = req.query;
  axios({
    method: "POST",
    url: "https://music.163.com/api/song/lyric",
    //   headers: {
    //     "User-Agent":
    //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Referer: "https://music.163.com",
    //     Cookie: "os=pc",
    //   },
    data: `id=${query.id}&lv=-1&kv=-1&tv=-1`,
  })
    .then((res) => {
      response.send(createSucRs(res.data.lrc.lyric));
    })
    .catch((err) => {
      response.send(createErrRs(err));
    });
}

module.exports = lyric;
