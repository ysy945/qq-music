const getters = {
  progress: (state) => {
    if (state.progressDom) {
      return state.progressDom.clientWidth * state.lyricPage.proportion;
    } else {
      return 0;
    }
  },
  progressLyric: (state) => {
    if (state.progressLyricDom) {
      return state.progressLyricDom.clientWidth * state.lyricPage.proportion;
    } else {
      return 0;
    }
  },
  volumeHeight: (state) => {
    return state.lyricPage.volumeProportion * 130;
  },
};

export default getters;
