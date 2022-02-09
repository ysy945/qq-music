import transformTime from "../utils/transformTime";

const mutations = {
  //设置歌曲列表
  setSongSheetLists(state, payload) {
    state.songSheetLists.length = 0;
    state.songSheetLists.push(...payload);
  },
  //设置content盒子的加载动画
  setLoadState(state, payload) {
    state.loadState = payload;
  },
  //缓存content这个DOM
  setContentDom(state) {
    state.contentDom = document.querySelector(".content");
  },
  //回到顶部
  backToTop(state) {
    if (state.contentDom) {
      // console.log(state.contentDom);
      state.contentDom.scrollTop = 0;
    }
  },
  //关闭队列页面
  closeQueuePage(state) {
    state.queue.isOpen = false;
  },
  //打开队列页面
  openQueuePage(state) {
    //添加状态改为无
    _setIsAddFalse(state);
    state.queue.isOpen = true;
  },
  //关闭歌词页面
  closeLyricPage(state) {
    state.lyricPage.isOpen = false;
  },
  //打开歌词页面
  openLyricPage(state) {
    state.lyricPage.isOpen = true;
  },
  //添加单曲
  addSongToQueue(state, payload) {
    const result = state.queue.songs.find((song) => song.id === payload.id);
    if (!result) {
      _setIsAddTrue(state);
      payload.idx = state.queue.songs.length;
      state.queue.songs.push(payload);
    }
  },
  //添加所有的歌曲到队列中
  addAllSongsToQueue(state, songs) {
    //修改添加状态为true
    _setIsAddTrue(state);
    //去重
    const allSongs = [...new Set([...state.queue.songs, ...songs])];
    //添加idx
    allSongs.forEach((song, index) => (song.idx = index));
    state.queue.songs = allSongs;
  },
  //清空播放队列
  clearQueue(state) {
    state.queue.songs.length = 0;
    _initLyricPage(state);
  },
  //缓存audio这个dom
  setAudioDom(state) {
    state.audioDom = document.getElementById("audio");
  },
  setQueueArticleDom(state) {
    state.queueArticleDom = document.getElementById("queue-article");
  },
  initQueueScrollTop(state) {
    const scrollTop = (state.lyricPage.idx - 3) * 70;
    state.queueArticleDom.scrollTop = scrollTop;
  },
  //播放音乐
  playMusic(state, details) {
    Object.keys(details).forEach((key) => {
      state.lyricPage[key] = details[key];
    });
    state.lyricPage.allTime = transformTime(state.audioDom.duration);
    state.lyricPage.allTimeNumber = state.audioDom.duration;
    state.lyricPage.isPlay = true;
    // console.log(state.lyricPage);
    state.audioDom.play();
  },
  //设置当前播放的时间
  setCurrentTime(state, time) {
    state.lyricPage.currentTime = time;
  },
  //切换音乐的播放状态
  toggleMusicState(state) {
    if (!state.lyricPage.songResource) return;
    const currentState = state.lyricPage.isPlay;
    if (currentState) {
      state.audioDom.pause();
    } else {
      state.audioDom.play();
    }
    state.lyricPage.isPlay = !currentState;
  },
  setIsAddFalse(state) {
    _setIsAddFalse(state);
  },
  setIsAddTrue(state) {
    _setIsAddTrue(state);
  },
  setRecommendSongLists(state, payload) {
    state.recommendSongLists = payload;
  },
  setRandomSongs(state, payload) {
    state.randomSongs = payload;
  },
  setProgressDom(state, dom) {
    state.progressDom = dom;
  },
  setProgressLyricDom(state, dom) {
    state.progressLyricDom = dom;
  },
  //设置进度条比值
  setProportion(state, proportion) {
    state.lyricPage.proportion = proportion.toFixed(3);
  },
  //改变播放时间
  changeCurrentTime(state, { offsetX, dom }) {
    const { clientWidth } = dom;
    const proportion = offsetX / clientWidth;
    const currentTime = proportion * state.lyricPage.allTimeNumber;
    state.lyricPage.currentTime = transformTime(currentTime);
    state.audioDom.currentTime = currentTime;
    if (!state.lyricPage.isPlay) {
      state.audioDom.play();
      state.lyricPage.isPlay = true;
    }
    this.commit("setProportion", proportion);
  },
  setDropInitInstance(state, dom) {
    state.lyricPage.dropInitInstance =
      state.lyricPage.proportion * dom.clientWidth;
  },
  //拖动进度条
  dropProgress(state, { relativeInstance, dom }) {
    let result = state.lyricPage.dropInitInstance + relativeInstance;
    const { clientWidth } = dom;
    //超出了左边界范围
    if (result < 0) {
      result = 0;
    }
    //超出了右边界
    else if (result > clientWidth) {
      result = clientWidth;
    }
    this.commit("setProportion", result / clientWidth);
  },
  stopUpdateTime(state) {
    state.audioDom.timeupdate = state.audioDom.ontimeupdate;
    state.audioDom.ontimeupdate = null;
  },
  startUpdateTime(state) {
    state.audioDom.ontimeupdate = state.audioDom.timeupdate;
  },
  openVolume(state) {
    if (!state.lyricPage.isOpenVolume) {
      state.lyricPage.isOpenVolume = true;
    }
  },
  closeVolume(state) {
    if (state.lyricPage.isOpenVolume) {
      state.lyricPage.isOpenVolume = false;
    }
  },
  openVolumeLyric(state) {
    if (!state.lyricPage.isOpenVolumeLyric) {
      state.lyricPage.isOpenVolumeLyric = true;
    }
  },
  closeVolumeLyric(state) {
    if (state.lyricPage.isOpenVolumeLyric) {
      state.lyricPage.isOpenVolumeLyric = false;
    }
  },
  dropProgressVolume(state, relativeInstance) {
    const initInstance = state.lyricPage.initVolumeProportion * 130;
    let result = initInstance + relativeInstance;
    if (result < 0) {
      result = 0;
    } else if (result > 130) {
      result = 130;
    }
    this.commit("setVolumeProportion", result / 130);
  },
  setVolumeProportion(state, volumeProportion) {
    state.lyricPage.volumeProportion = volumeProportion.toFixed(2);
  },
  setInitVolumeProportion(state) {
    state.lyricPage.initVolumeProportion = state.lyricPage.volumeProportion;
  },
  changeCurrentVolume(state) {
    // const volumeProportion = state.lyricPage.volumeProportion;
    const audioDom = state.audioDom;
    audioDom.volume = state.lyricPage.volumeProportion;
    // volumeProportion, audioDom;
  },
  setMusicHallSelectedPlayLists(state, payload) {
    state.musicHallSelectedPlayLists = payload;
  },
  setRankingLists(state, payload) {
    state.rankingLists.length = 0;
    state.rankingLists = payload;
  },
  setLyric(state, payload) {
    state.lyricPage.lyric = payload;
  },
  setLyricDom(state, dom) {
    state.lyricDom = dom;
  },
  setLyricScrollTop(state, scrollTop) {
    state.lyricDom.scrollTop = scrollTop;
  },
  setLyricPlayRow(state, idx) {
    state.lyricPage.lyricPlayRow = idx;
  },
};

function _setIsAddFalse(state) {
  if (state.queue.isAdd) {
    state.queue.isAdd = false;
  }
}

function _setIsAddTrue(state) {
  if (!state.queue.isAdd) {
    state.queue.isAdd = true;
  }
}

//初始化控制歌词页面
function _initLyricPage(state) {
  const isOpen = state.lyricPage.isOpen;
  const audioDom = state.audioDom;
  const initObj = {
    // isOpen:false,
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
    // clientWidth_lyric: 0,
    // clientWidth: 0,
    proportion: 0,
    allTimeNumber: 0,
    albumName: "无",
    lyricPlayRow: 1,
  };
  Object.keys(initObj).forEach((key) => {
    state.lyricPage[key] = initObj[key];
  });

  audioDom.onended = null;
  audioDom.onerror = null;
  audioDom.ontimeupdate = null;
  state.lyricPage.isOpen = isOpen;
  stopMusic(state);
}

//完全停止音乐(非pause)
function stopMusic(state) {
  const audioDom = state.audioDom;
  audioDom.src = "";
}

export default mutations;
