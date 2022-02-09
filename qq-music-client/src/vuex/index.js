import { createStore } from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import methods from "./methods";

const store = createStore({
  state() {
    return {
      //排行榜歌单缓存
      rankingLists: [],
      //首页推荐歌单
      recommendSongLists: [],
      //音乐馆精选歌单
      musicHallSelectedPlayLists: [],
      //随机歌曲
      randomSongs: [],
      //歌单点进去的页面的缓存
      songSheetLists: [],
      loadState: true,
      contentDom: null,
      audioDom: null,
      queueArticleDom: null,
      progressDom: null,
      progressLyricDom: null,
      //获取歌词容器的dom
      lyricDom: null,
      queue: {
        isOpen: false, //控制是否打开播放队列页面
        //歌曲信息
        songs: [
          //基础格式
          /* {
            id: 1111111,
            songName: "下一个",
            singer: "王靖雯",
            time: "无",
            isLike: false,
            picUrl: "",
            songResource: "",
            idx: 1,
            albumName:"",
          }, */
        ],
        //是否处于添加状态
        isAdd: false,
      },
      //歌词详情页面
      lyricPage: {
        isOpenVolume: false,
        isOpenVolumeLyric: false,
        volumeProportion: 0.5,
        initVolumeProportion: 0,
        isOpen: false,
        isPlay: false,
        picUrl:
          "http://y.qq.com/music/common/upload/t_music_radio/1261958.jpg?max_age=2592000",
        songName: "暂时没有播放歌曲...",
        singer: "无",
        currentTime: "00:00",
        allTime: "00:00",
        lyric: {
          "00:00": ["QQ音乐,让生活充满音乐"],
        },
        id: null,
        songResource: null,
        time: null,
        idx: null,
        albumName: "无",
        //歌词页面的进度条宽度
        // clientWidth_lyric: 0,
        //下方控制栏的进度条宽度
        // clientWidth: 0,
        //宽度比值
        proportion: 0,
        allTimeNumber: 0,
        //拖动进度条时的初始距离
        dropInitInstance: 0,
        //lyric这个dom的轮播高度
        lyricScrollTop: 0,
        lyricPlayRow: 1,
      },
    };
  },
  mutations,
  methods,
  getters,
  actions,
});

export default store;
