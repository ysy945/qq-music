<template>
  <div class="footer">
    <div
      class="footer-progress"
      id="footer-progress"
      @mousedown="checkProgressClick"
    >
      <p
        class="footer-progress-bar"
        :style="{ width: store.getters.progress + 'px' }"
      ></p>
      <p
        class="footer-progress-bar-button"
        :style="{ left: store.getters.progress - 5 + 'px' }"
        @mousedown.stop="checkProgressButtonDown"
        @mouseup.stop="checkProgressButtonUp"
      ></p>
      <footer class="footer-progress-bar-background"></footer>
    </div>
    <div class="footer-left-box">
      <img :src="state.lyricPage.picUrl" alt="" />
      <div
        class="footer-left-box-img-cover"
        title="展开歌曲详情页"
        @click="openLyricPage"
      >
        <i class="iconfont icon-xiangshangjiantou"></i>
      </div>

      <div>
        <p class="footer-song-detail ellipsis">
          <span class="footer-song-name">{{ state.lyricPage.songName }}</span>

          <span
            class="footer-song-composer"
            v-show="Boolean(state.lyricPage.singer)"
          >
            - {{ state.lyricPage.singer }}</span
          >
        </p>
        <div class="footer-song-icon">
          <i class="iconfont icon-xihuan1"></i>
          <i class="iconfont icon-xiazai"></i>
          <i class="iconfont icon-gengduo"></i>
        </div>
      </div>
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
      <i class="iconfont icon-xiayishou" title="下一首" @click="nextMusic"></i>
      <i
        class="iconfont icon-yinliang volume-control"
        title="音量"
        @click.stop="openVolume"
      >
        <div v-show="state.lyricPage.isOpenVolume" @mousedown.stop="">
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
        <i class="iconfont icon-bofangduilie" @click.stop="openQueuePage"></i>
        <span @click.stop="openQueuePage">{{ state.queue.songs.length }}</span>
      </span>
      <span style="width: 40px">
        <span
          class="footer-right-box-red-dot"
          v-show="state.queue.isAdd"
        ></span>
      </span>
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
      store.commit("initQueueScrollTop");
    }
    function openLyricPage() {
      store.commit("openLyricPage");
    }
    function toggleMusicState() {
      store.commit("toggleMusicState");
    }
    function nextMusic() {
      store.dispatch("nextMusic");
    }
    function previousMusic() {
      store.dispatch("previousMusic");
    }
    function checkProgressClick(event) {
      const offsetX = event.offsetX;
      store.commit("changeCurrentTime", {
        offsetX,
        dom: store.state.progressDom,
      });
    }
    function checkProgressButtonDown(event) {
      store.commit("setDropInitInstance", state.progressDom);
      store.commit("stopUpdateTime");
      document.onmousemove = throttle(function (docEvt) {
        //鼠标移动距离
        const relativeInstance = docEvt.screenX - event.screenX;
        store.commit("dropProgress", {
          relativeInstance,
          dom: state.progressDom,
        });
      }, 20);
      document.onmouseup = checkProgressButtonUp;
    }

    function checkProgressButtonUp() {
      if (document.onmouseup) {
        const progressDom = state.progressDom;
        const offsetX = state.lyricPage.proportion * progressDom.clientWidth;
        store.commit("startUpdateTime");
        store.commit("changeCurrentTime", { offsetX, dom: progressDom });
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }

    function openVolume() {
      store.commit("openVolume");
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
      const dom = document.getElementById("footer-progress");
      store.commit("setProgressDom", dom);
    });

    return {
      openQueuePage,
      state,
      openLyricPage,
      toggleMusicState,
      nextMusic,
      previousMusic,
      store,
      checkProgressClick,
      checkProgressButtonDown,
      checkProgressButtonUp,
      openVolume,
      checkVolumeDown,
      checkVolumeUp,
    };
  },
});
</script>

<style>
.footer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #fafafa;
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
  background-color: #d9d9d9;
  margin-top: 8px;
}
.footer-progress-bar {
  height: 2px;
  bottom: 0;
  position: absolute;
  background-color: #1ecd98;
}
.footer-progress-bar-button {
  cursor: pointer;
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
  display: flex;
  padding: 15px;
  position: relative;
}
.footer-left-box > img {
  width: 40px;
  height: 40px;
  margin: 0 15px 0 25px;
  border-radius: 5px;
}
.footer-left-box-img-cover {
  cursor: pointer;
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: rgba(63, 57, 57, 0.5);
  border-radius: 5px;
  left: 40px;
  display: none;
}
.footer-left-box-img-cover > i {
  position: absolute;
  font-size: 20px;
  font-weight: bolder;
  color: #d9d9d9;
  left: 10px;
  top: 10px;
}
.footer-left-box > img:hover ~ .footer-left-box-img-cover,
.footer-left-box-img-cover:hover {
  display: block;
}

.footer-song-detail > span {
  font-size: 13px;
}
.footer-song-detail {
  width: 26vw;
}
.footer-song-composer {
  color: #8b8b8b;
}
.footer-song-icon > i {
  font-size: 18px;
  padding-right: 15px;
  color: #c0c0c0;
  cursor: pointer;
  transition: color 0.3s;
}
.footer-song-icon :nth-child(1):hover {
  color: #f45555;
}
.footer-song-icon > i:hover {
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
  color: #7b7b7b;
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
.footer-right-box-red-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
  background-color: #ff6664;
  vertical-align: middle;
}
.volume-control {
  position: relative;
}
.volume-control > div {
  position: absolute;
  width: 50px;
  height: 200px;
  background-color: white;
  border-radius: 5px;
  top: -220px;
  right: -15px;
  cursor: initial;
  z-index: 6;
  box-shadow: 0 0 10px 0.1px rgb(92, 91, 91);
}
.volume-control > div > div {
  position: absolute;
  border-width: 10px;
  border-style: solid;
  /* width: 50px; */
  /* height: 50px; */
  border-color: transparent transparent white transparent;
  /* background-color: rosybrown; */
  top: 199px;
  border-radius: 2px;
  transform: rotateX(180deg);
  right: 15px;
}
.volume-control-progress {
  height: 130px;
  width: 2px;
  background-color: #ececec;
  margin: 20px auto;
  position: relative;
}
.volume-control-progress-bar {
  position: absolute;
  bottom: 0;
  width: 2px;
  background-color: #1ecd98;
  height: 50px;
}
.volume-control-progress-button {
  position: absolute;
  bottom: 47px;
  width: 10px;
  height: 10px;
  background: #1ecd98;
  border-radius: 50%;
  right: -4px;
  cursor: pointer;
}
.volume-control-progress-proportion {
  font-size: 15px;
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-weight: 500;
  height: 0px;
  color: black;
}
</style>
