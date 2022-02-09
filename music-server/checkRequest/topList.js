const axios = require("axios");
const createSucRs = require("../utils/createSucRs");
const createErrRs = require("../utils/createErrRs");
function topList(req, response) {
  axios({
    url: "https://api.music.imsyy.top/toplist/detail",
    method: "get",
  })
    .then((res) => {
      console.log(res.data.list);
      const result = res.data.list.map((list) => {
        const tracks = list.tracks.map((track) => {
          return track.first + "-" + track.second;
        });
        return {
          tracks,
          picUrl: list.coverImgUrl,
          playCount: list.playCount,
          id: list.id,
          name: list.name,
          tags: list.tags,
          description: list.description,
        };
      });
      response.send(createSucRs(result));
    })
    .catch((err) => {
      res.send(createErrRs(err));
    });
}
module.exports = topList;
