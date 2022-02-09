const axios = require("axios");
const createSucRs = require("../utils/createSucRs");
const createErrRs = require("../utils/createErrRs");
function songsDetail(req, res) {
  const query = req.query;
  console.log(query);
  axios
    .get(`https://api.music.imsyy.top/playlist/detail?id=${query.id}`)
    .then((result) => {
      const ret = {};
      const data = result.data.playlist;
      ret.coverImgUrl = data.coverImgUrl;
      ret.userImgUrl = data.creator.avatarUrl;
      ret.description = data.description;
      ret.name = data.name;
      ret.nickname = data.creator.nickname;
      ret.tags = data.tags;
      let ids = "";
      data.trackIds.slice(0, 200).forEach((obj) => {
        ids = ids + obj.id + ",";
      });
      ids = ids.slice(0, ids.length - 1);
      axios
        .get(`https://api.music.imsyy.top/song/detail/?ids=${ids}`)
        .then((result) => {
          ret.details = result.data.songs.map((song) => {
            return {
              id: song.id,
              songName: song.name,
              singer: song.ar.map((one) => one.name).join("/"),
              isLike: false,
              time: "无",
              picUrl: song.al.picUrl,
              songResource: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
              albumName: song.al.name,
            };
          });

          res.send(createSucRs(ret));
        });
    });
}
module.exports = songsDetail;
