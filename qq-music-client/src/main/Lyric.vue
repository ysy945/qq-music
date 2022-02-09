<template>
  <div
    :class="{ lyric: true, 'lyric-isOpen': !state.lyricPage.isOpen }"
    @click="closeQueuePage"
  >
    <div class="lyric-vague">
      <img :src="state.lyricPage.picUrl" alt="" />
    </div>
    <div class="lyric-vague1"></div>

    <div class="lyric-content">
      <header class="lyric-header">
        <i
          class="iconfont icon-xiangxiajiantou"
          title="退出"
          @click="closeLyricPage"
        ></i>
      </header>

      <article class="lyric-article">
        <section class="lyric-article-left">
          <img :src="state.lyricPage.picUrl" alt="" />
        </section>
        <section class="lyric-article-right">
          <div class="lyric-article-right-detail">
            <h2 class="lyric-article-right-detail-name">
              {{ state.lyricPage.songName }}
            </h2>
            <p>歌手: {{ state.lyricPage.singer }}</p>
            <p>专辑: {{ state.lyricPage.albumName }}</p>
            <section class="lyric-article-right-detail-content" id="lyric">
              <header
                :style="{ height: '45%', width: '100%', 'flex-shrink': 0 }"
              ></header>
              <div v-for="(p, index) in state.lyricPage.lyric" :key="index">
                <p v-for="(one, index) in p" :key="index">{{ one }}</p>
              </div>
              <footer
                :style="{ height: '45%', width: '100%', 'flex-shrink': 0 }"
              ></footer>
            </section>
          </div>
        </section>
      </article>

      <footer class="lyric-footer">
        <div class="footer">
          <div
            class="footer-progress"
            id="footer-progress-lyric"
            @mousedown="checkProgressLyricClick"
          >
            <p
              class="footer-progress-bar"
              :style="{ width: store.getters.progressLyric + 'px' }"
            ></p>
            <p
              class="footer-progress-bar-button"
              :style="{ left: store.getters.progressLyric - 5 + 'px' }"
              @mousedown.stop="checkProgressLyricButtonDown"
              @mouseup.stop="checkProgressLyricButtonUp"
            ></p>
            <footer class="footer-progress-bar-background"></footer>
          </div>

          <div class="footer-left-box">
            <i class="iconfont icon-xihuan1"></i>
            <i class="iconfont icon-xiazai"></i>
            <i class="iconfont icon-gengduo"></i>
          </div>

          <div class="footer-controller">
            <i class="iconfont icon-shunxubofang" title="播放顺序"></i>
            <i
              class="iconfont icon-shangyishou"
              title="上一首"
              @click="previousMusic"
            ></i>
            <i
              :class="{
                iconfont: true,
                'icon-24gf-playCircle': !state.lyricPage.isPlay,
                'icon-zanting': state.lyricPage.isPlay,
                'zanting-style': state.lyricPage.isPlay,
              }"
              @click="toggleMusicState"
            ></i>
            <i
              class="iconfont icon-xiayishou"
              title="下一首"
              @click="nextMusic"
            ></i>
            <i
              class="iconfont icon-yinliang volume-control"
              title="音量"
              @click.stop="openVolumeLyric"
            >
              <div
                v-show="state.lyricPage.isOpenVolumeLyric"
                @mousedown.stop=""
              >
                <section class="volume-control-progress">
                  <p
                    class="volume-control-progress-bar"
                    :style="{ height: store.getters.volumeHeight + 'px' }"
                  ></p>
                  <span
                    class="volume-control-progress-button"
                    :style="{ bottom: store.getters.volumeHeight - 5 + 'px' }"
                    @mousedown.stop="checkVolumeDown"
                    @mouseup.stop="checkVolumeUp"
                  ></span>
                </section>
                <section class="volume-control-progress-proportion">
                  {{ parseInt(state.lyricPage.volumeProportion * 100) }}%
                </section>
                <div></div>
              </div>
            </i>
          </div>

          <div class="footer-right-box">
            <span>{{ state.lyricPage.currentTime }}/</span>
            <span>{{ state.lyricPage.allTime }}</span>
            <span>词</span>
            <span>
              <i
                class="iconfont icon-bofangduilie"
                @click.stop="openQueuePage"
              ></i>
              <span @click.stop="openQueuePage">{{
                state.queue.songs.length
              }}</span>
              <span
                class="footer-right-box-red-dot"
                v-show="state.queue.isAdd"
              ></span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import throttle from "../utils/throttle";
export default defineComponent({
  setup() {
    const store = useStore();
    const state = store.state;
    function openQueuePage() {
      store.commit("openQueuePage");
    }
    function closeLyricPage() {
      store.commit("closeLyricPage");
    }
    function closeQueuePage() {
      if (state.queue.isOpen) {
        store.commit("closeQueuePage");
      }
    }
    function nextMusic() {
      store.dispatch("nextMusic");
    }
    function previousMusic() {
      store.dispatch("previousMusic");
    }
    function toggleMusicState() {
      store.commit("toggleMusicState");
    }
    function checkProgressLyricClick(event) {
      const offsetX = event.offsetX;
      store.commit("changeCurrentTime", {
        offsetX,
        dom: state.progressLyricDom,
      });
    }
    function checkProgressLyricButtonDown(event) {
      store.commit("setDropInitInstance", state.progressLyricDom);
      store.commit("stopUpdateTime");
      document.onmousemove = throttle(function (docEvt) {
        //鼠标移动距离
        const relativeInstance = docEvt.screenX - event.screenX;
        store.commit("dropProgress", {
          relativeInstance,
          dom: state.progressLyricDom,
        });
      }, 20);
      document.onmouseup = checkProgressLyricButtonUp;
    }
    function checkProgressLyricButtonUp() {
      if (document.onmouseup) {
        const progressLyricDom = state.progressLyricDom;
        const offsetX =
          state.lyricPage.proportion * progressLyricDom.clientWidth;
        store.commit("startUpdateTime");
        store.commit("changeCurrentTime", { offsetX, dom: progressLyricDom });
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }
    function openVolumeLyric() {
      store.commit("openVolumeLyric");
    }
    function checkVolumeDown(event) {
      store.commit("setInitVolumeProportion");
      document.onmousemove = throttle(function (docEvt) {
        const relativeInstance = event.screenY - docEvt.screenY;
        store.commit("dropProgressVolume", relativeInstance);
        store.commit("changeCurrentVolume");
      }, 20);
      document.onmouseup = checkVolumeUp;
    }
    function checkVolumeUp() {
      document.onmousemove = null;
      document.onmouseup = null;
    }

    onMounted(() => {
      const dom = document.getElementById("footer-progress-lyric");
      const lyricDom = document.getElementById("lyric");
      store.commit("setProgressLyricDom", dom);
      store.commit("setLyricDom", lyricDom);
    });
    return {
      openQueuePage,
      state,
      closeLyricPage,
      closeQueuePage,
      nextMusic,
      previousMusic,
      toggleMusicState,
      store,
      checkProgressLyricClick,
      checkProgressLyricButtonDown,
      checkProgressLyricButtonUp,
      openVolumeLyric,
      checkVolumeDown,
      checkVolumeUp,
    };
  },
});
</script>

<style scoped>
.lyric {
  transition: height 0.3s;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  /* top: 0; */
  z-index: 4;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /* background-color: palegoldenrod; */
}
.lyric-isOpen {
  height: 0;
}
.lyric-vague,
.lyric-vague1 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0;
  filter: blur(40px);
  z-index: -2;
}
.lyric-vague1 {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
.lyric-vague > img {
  width: 100%;
  height: 100vh;
  transform: scale(1.5);
}
.lyric-header > i {
  transition: color 0.2s;
  cursor: pointer;
  font-weight: 600;
  color: #c7c5c5;
}
.lyric-header > i:hover {
  color: #1ecd98;
}
.lyric-content {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 20px auto 80px;
  padding: 20px 40px 0px 40px;
  box-sizing: border-box;
}
.lyric-article {
  width: 100%;
  height: 100%;
  /* border: 1px solid white; */
  display: grid;
  grid-template-columns: 42fr 58fr;
}
.lyric-article-left {
  width: 100%;
  height: 100%;
  /* background-color: pink; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.lyric-article-right {
  width: 82%;
  height: 83vh;
  padding: 14vh 0;
  /* background-color: pink; */
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lyric-article-right-detail {
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lyric-article-right-detail-name {
  font-size: 25px;
  font-weight: 500;
  color: white;
  opacity: 0.8;
  margin-bottom: 15px;
}
.lyric-article-right-detail-content {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.lyric-article-right-detail-content > div {
  transition: color 0.2s;
  color: white;
  opacity: 0.8;
  flex-shrink: 0;
}
.lyric-article-right-detail-content > div > p {
  transition: color 0.5s;
  padding: 10px 0;
  text-align: center;
}
.lyric-article-right-detail-content > div:nth-child(1) {
  margin-top: 50%;
}
.lyric-playing {
  color: #1ecd98 !important;
}

.lyric-article-right-detail > p {
  font-size: 14px;
  color: #a09da3;
  opacity: 0.8;
}

.lyric-article-right-detail > section::-webkit-scrollbar {
  display: none;
}
.lyric-article-right-detail > section > p {
  color: white;
  opacity: 0.8;
}
.lyric-article-left > img {
  width: 26vw;
  height: 26vw;
  min-width: 350px;
  min-height: 350px;
}

.footer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0);
  display: grid;
  grid-template-columns: 400px auto 400px;
  grid-auto-rows: 10px 70px;
}
.footer-progress {
  grid-column-start: 1;
  grid-column-end: 4;
  position: relative;
}
.footer-progress-bar-background {
  height: 2px;
  background-color: rgba(146, 144, 144, 0.3);
  margin-top: 8px;
}
.footer-progress-bar {
  height: 2px;
  bottom: 0;
  position: absolute;
  background-color: #1ecd98;
}
.footer-progress-bar-button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  background-color: #1ecd98;
  /* border: 0.1px solid black; */
  top: 4px;
  display: none;
}
.footer-progress:hover > .footer-progress-bar-button {
  display: block;
}
.footer-left-box {
  position: relative;
  line-height: 70px;
  padding: 0;
}
.footer-left-box > i {
  transition: color 0.2s;
  cursor: pointer;
  margin-right: 15px;
  font-size: 20px;
  color: #c7c5c5;
}
.footer-left-box > i:nth-child(1):hover {
  color: #f45555;
}
.footer-left-box > i:hover {
  color: #1ecd98;
}

.footer-controller {
  line-height: 70px;
  text-align: center;
}
.footer-controller > i {
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.2s;
  color: white;
}
.footer-controller > i:hover {
  color: #1ecd98;
}
.footer-controller > i:nth-child(1) {
  margin-right: 10px;
}
.footer-controller > i:nth-child(2) {
  /* margin-left: 10px; */
  font-size: 25px;
}
.footer-controller > i:nth-child(3) {
  margin: 0 10px;
  font-size: 40px;
  color: #1ecf9f;
}
.zanting-style {
  margin: 10px 11.5px 0 11.5px !important;
  font-size: 37px !important;
  /* padding-top: 10px !important; */
}
.footer-controller > i:nth-child(4) {
  font-size: 25px;
}

.footer-controller > i:nth-child(5) {
  margin-left: 10px;
  font-weight: 600;
  font-size: 18px;
}
.footer-right-box {
  display: flex;
  justify-content: flex-end;
  line-height: 70px;
}
.footer-right-box > * {
  vertical-align: middle;
  color: #c7c5c5;
}
.footer-right-box > span:nth-child(1),
.footer-right-box > span:nth-child(2) {
  font-size: 13px;
}
.footer-right-box > span:nth-child(3) {
  margin: 0 10px;
  cursor: pointer;
  display: inline-block;
  height: 0;
  transition: color 0.2s;
}
.footer-right-box > span:nth-child(3):hover {
  color: #1ecf9f;
}
.footer-right-box > span:nth-child(4) {
  cursor: pointer;
  display: inline-block;
  height: 0px;
  transition: color 0.2s;
}
.footer-right-box > span:nth-child(4) > i {
  font-size: 15px;
}
.footer-right-box > span:nth-child(4) > span {
  font-size: 12px;
}
.footer-right-box > span:nth-child(4):hover > * {
  color: #1ecf9f;
}
.volume-control-progress-proportion {
  color: black;
}
</style>
