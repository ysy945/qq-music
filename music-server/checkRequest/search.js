const axios = require("axios");
const createSucRs = require("../utils/createSucRs");
const createErrRs = require("../utils/createErrRs");
function search(req, response) {
  let result = null;
  const query = req.query;
  console.log(query);
  axios({
    url: "https://api.music.imsyy.top/search",
    params: {
      limit: 30,
      type: 1,
      offset: query.offset,
      keywords: query.keyWords,
    },
  })
    .then((res) => {
      console.log(res.data);
      let ids = res.data.result.songs.map((song) => song.id).join(",");
      axios({
        url: `https://api.music.imsyy.top/song/detail/?ids=${ids}`,
      }).then((res) => {
        const songs = res.data.songs;
        result = songs.map((song) => {
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
        response.send(createSucRs(result));
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = search;
