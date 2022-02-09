import transformTime from "../utils/transformTime";
import lyricGet from "../send/lyricGet";
import parseLrc from "../utils/parseLrc";
import isEmptyObj from "../utils/isEmptyObj";
import throttle from "../utils/throttle";
const actions = {
  playMusicAsync(context, details) {
    _playMusicAsync(context, details);
  },
  nextMusic(context) {
    const details = context.state.queue.songs[context.state.lyricPage.idx];
    _nextMusic(context, details);
  },
  previousMusic(context) {
    const details = context.state.queue.songs[context.state.lyricPage.idx];
    _previousMusic(context, details);
  },
  insertQueue({ commit, state }, details) {
    let currentIdx = state.lyricPage.idx;
    //第一次点击
    if (currentIdx === null) {
      currentIdx = -1;
    }
    state.queue.songs.splice(currentIdx + 1, 0, details);
    state.queue.songs.forEach((song, index) => (song.idx = index));
    _playMusicAsync({ commit, state }, state.queue.songs[currentIdx + 1]);
  },
  playAllMusic({ commit }, songs) {
    //清空队列
    commit("clearQueue");
    //添加所有歌曲到队列
    commit("addAllSongsToQueue", songs);
    //播放第一首歌曲
    this.dispatch("playMusicAsync", songs[0]);
  },
  deleteQueueSong({ state, commit }, details) {
    const { idx } = details;
    //删除的歌曲正在播放
    if (state.lyricPage.idx === idx) {
      state.queue.songs.splice(idx, 1);
      state.queue.songs.forEach((song, index) => (song.idx = index));
      // console.log(state.queue.songs.length);
      if (state.queue.songs.length === 0) {
        commit("clearQueue");
      } else if (idx >= state.queue.songs.length) {
        this.dispatch("playMusicAsync", state.queue.songs[0]);
      } else {
        this.dispatch("playMusicAsync", state.queue.songs[idx]);
      }
    } else {
      if (state.lyricPage.idx > idx) {
        state.lyricPage.idx--;
      }
      state.queue.songs.splice(idx, 1);
      state.queue.songs.forEach((song, index) => (song.idx = index));
    }
  },
};

function _playMusicAsync({ commit, state }, details) {
  if (state.queue.songs.length === 0) {
    return;
  }
  const audioDom = state.audioDom;
  audioDom.src = details.songResource;

  lyricGet(
    (result) => {
      result = parseLrc(result);
      if (isEmptyObj(result)) {
        result = {
          "00:00": ["没有找到歌词"],
        };
      }
      commit("setLyric", result);
      // console.log(result.split(/\[[0-9]{2}:[0-9]{2}\.[0-9]{2,3}\]/));
    },
    () => {},
    { id: details.id }
  );
  audioDom.oncanplay = function () {
    commit("playMusic", details);
  };
  audioDom.ontimeupdate = function () {
    ontimeupdate(commit, state, audioDom);
  };
  audioDom.onended = function () {
    onended(commit, state, state.queue.songs[state.lyricPage.idx]);
  };
  audioDom.onerror = function () {
    onerror(commit, state, details);
  };
}

function onerror(commit, state, details) {
  _nextMusic({ commit, state }, details);
}

function onended(commit, state, details) {
  // console.log(details);
  _nextMusic({ commit, state }, details);
}

function ontimeupdate(commit, state, audioDom) {
  //处理进度条的逻辑
  const currentTime = transformTime(audioDom.currentTime);
  commit("setCurrentTime", currentTime);
  let proportion = audioDom.currentTime / audioDom.duration;
  if (!audioDom.duration) {
    proportion = 0;
  }
  commit("setProportion", proportion);
  //处理歌词轮播
  checkLyricRotationThrottle(state, audioDom, commit);
}

const checkLyricRotationThrottle = throttle(checkLyricRotation, 1000);

function checkLyricRotation(state, audioDom, commit) {
  const lyric = state.lyricPage.lyric;
  const children = state.lyricDom.children;
  const beforeIdx = state.lyricPage.lyricPlayRow;
  children[beforeIdx].classList.remove("lyric-playing");
  const { lyricScrollTop, idx } = getLyricScrollTop(
    lyric,
    audioDom.currentTime + 0.7,
    children,
    commit
  );
  children[idx].classList.add("lyric-playing");
  const currentScrollTop = state.lyricDom.scrollTop;
  const average = (lyricScrollTop - currentScrollTop) / 10;
  let i = 1;
  const flag = setInterval(() => {
    if (i === 11) {
      clearInterval(flag);
      return;
    }
    if (i === 10) commit("setLyricScrollTop", lyricScrollTop);
    else {
      if (average === 0) {
        i++;
        return;
      }
      commit("setLyricScrollTop", currentScrollTop + i * average);
    }
    i++;
  }, 20);
  // commit("setLyricScrollTop", lyricScrollTop);
}

function getLyricScrollTop(lyric, currentTime, children, commit) {
  const keys = Object.keys(lyric);
  let scrollTop = 0;

  for (let i = 1; i < keys.length; i++) {
    if (transformTimeToNumber(keys[i]) >= currentTime) {
      commit("setLyricPlayRow", i);
      return { lyricScrollTop: scrollTop, idx: i };
    } else {
      scrollTop += children[i].clientHeight;
    }
  }
  commit("setLyricPlayRow", keys.length);
  return { lyricScrollTop: scrollTop, idx: keys.length };
}

function transformTimeToNumber(string) {
  const arr = string.split(":");
  return parseInt(arr[0]) * 60 + parseInt(arr[1]);
}

function _nextMusic({ commit, state }, details) {
  const audioDom = state.audioDom;
  let { idx } = details;
  const length = state.queue.songs.length;
  if (idx === length - 1) {
    idx = 0;
  } else idx++;
  const nextDetails = state.queue.songs[idx];
  audioDom.src = nextDetails.songResource;
  lyricGet(
    (result) => {
      result = parseLrc(result);
      if (isEmptyObj(result)) {
        result = {
          "00:00": ["没有找到歌词"],
        };
      }
      commit("setLyric", result);
      commit("setLyricPlayRow", 1);
      // console.log(result.split(/\[[0-9]{2}:[0-9]{2}\.[0-9]{2,3}\]/));
    },
    () => {},
    { id: nextDetails.id }
  );
  audioDom.oncanplay = function () {
    commit("playMusic", nextDetails);
  };
  audioDom.onerror = function () {
    commit("playMusic", nextDetails);
    // console.log(nextDetails.idx);
    if (details.idx !== nextDetails.idx) {
      _nextMusic({ commit, state }, nextDetails);
    }
  };
}

function _previousMusic({ commit, state }, details) {
  const audioDom = state.audioDom;
  let { idx } = details;
  const length = state.queue.songs.length;
  if (idx === 0) {
    idx = length - 1;
  } else idx--;
  const previousDetails = state.queue.songs[idx];
  audioDom.src = previousDetails.songResource;
  lyricGet(
    (result) => {
      result = parseLrc(result);
      if (isEmptyObj(result)) {
        result = {
          "00:00": ["没有找到歌词"],
        };
      }
      commit("setLyric", result);
      commit("setLyricPlayRow", 1);
      // console.log(result.split(/\[[0-9]{2}:[0-9]{2}\.[0-9]{2,3}\]/));
    },
    () => {},
    { id: previousDetails.id }
  );
  audioDom.oncanplay = function () {
    commit("playMusic", previousDetails);
  };
  audioDom.onerror = function () {
    commit("playMusic", previousDetails);
    _previousMusic({ commit, state }, previousDetails);
  };
}

export default actions;
