const axios = require("axios");
const random = require("random");
const createSucRs = require("../utils/createSucRs");
const createErrRs = require("../utils/createErrRs");

async function randomSongs(req, res) {
  const result = await axios.get("https://api.music.imsyy.top/personalized");
  const data = result.data.result;
  if (data) {
    const randomNumber = random.int(0, 29);
    const id = data[randomNumber].id;
    const result = await axios.get(
      `https://api.music.imsyy.top/playlist/detail?id=${id}`
    );
    // return res.send(createSucRs(result.data));
    if (result.data.code === 200) {
      let ret = result.data.playlist.tracks.slice(0, 10);
      ret = ret.map((detail) => {
        return {
          id: detail.id,
          songName: detail.name,
          singer: detail.ar.map((one) => one.name).join("/"),
          isLike: false,
          time: "无",
          picUrl: detail.al.picUrl,
          songResource: `https://music.163.com/song/media/outer/url?id=${detail.id}.mp3`,
          albumName: detail.al.name,
        };
      });
      res.send(createSucRs(ret));
    } else {
      res.send(createErrRs("请求失败！"));
    }
  } else {
    res.send(createErrRs("未请求到歌单信息！！"));
  }
}

module.exports = randomSongs;
