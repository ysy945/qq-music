const express = require("express");
const app = express();
const checkOptions = require("./middleware/checkOptions");
const setCors = require("./middleware/setCors");
const recommend = require("./checkRequest/recommend");
const randomSongs = require("./checkRequest/randomSongs");
const songsDetail = require("./checkRequest/songsDetail");
const search = require("./checkRequest/search");
const playLists = require("./checkRequest/playLists");
const topList = require("./checkRequest/topList");
const lyric = require("./checkRequest/lyric");

app.use(checkOptions, setCors);

app.get("/recommend", recommend);
app.get("/randomSongs", randomSongs);
app.get("/songsDetail", songsDetail);
app.get("/search", search);
app.get("/playLists", playLists);
app.get("/topList", topList);
app.get("/lyric", lyric);

app.listen(4000, function () {
  console.log("服务器在4000端口号上启动啦！");
});
