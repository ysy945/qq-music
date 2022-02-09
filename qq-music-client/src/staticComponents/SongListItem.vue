<template>
  <div
    :class="{ songListItem: true, 'backColor-played': isPlayed }"
    @dblclick="dblclick"
  >
    <div :class="{ 'songListItem-left-box': true, 'color-played': isPlayed }">
      <i
        :class="{
          position: true,
          iconfont: true,
          'icon-24gl-play': !isPlayed,
          'icon-zanting1': isPlayed,
        }"
        @click="playClick(props.details)"
      ></i>
      <!-- <i class="first-stop position iconfont icon-zanting1"></i> -->
      <i
        class="position iconfont icon-jiahao"
        title="添加到"
        @click="props.addSongClick($event, props.details)"
      ></i>
      <i class="position iconfont icon-xiazai" title="下载"></i>
      <i class="position iconfont icon-gengduo" title="更多操作"></i>
      <span class="like position iconfont icon-xihuan1"></span>
      <p
        :class="{
          'songListItem-left-box-text': true,
          'color-played': isPlayed,
          ellipsis: true,
        }"
      >
        {{ props.details.songName }}
      </p>
    </div>
    <div class="songListItem-singer-box">
      <p
        :class="{ 'color-played': isPlayed, ellipsis: true }"
        style="width: 13vw"
      >
        {{ props.details.singer }}
      </p>
    </div>
    <div class="songListItem-album-box">
      <p :class="{ 'color-played': isPlayed }">
        {{ props.details.albumName || "无" }}
      </p>
    </div>
    <div class="songListItem-time-box">
      <p :class="{ 'color-played': isPlayed }">无</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
export default defineComponent({
  props: {
    details: Object,
    addSongClick: Function,
    playClick: Function,
    currentPlayData: Object,
  },
  setup(props) {
    const isPlayed = computed(
      () =>
        props.currentPlayData.id === props.details.id &&
        props.currentPlayData.isPlay === true
    );
    function dblclick() {
      props.playClick(props.details);
    }
    return { props, isPlayed, dblclick };
  },
});
</script>

<style scoped>
.songListItem {
  transition: background-color 0.2s;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  /* background-color: rgb(3, 245, 245); */
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 70px;
  /* line-height: 60px; */
}
.songListItem:hover {
  background-color: #eeeeee;
}
.songListItem:hover > .songListItem-left-box > i {
  display: block;
}
.songListItem-left-box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.position {
  transition: color 0.2s;
  color: #7f7f7f;
  cursor: pointer;
  position: absolute;
  font-size: 18px;
  display: none;
  top: 15.5px;
}
.position:hover {
  color: #1dc690;
}
.songListItem-left-box > i {
  font-weight: 600;
}
.songListItem-left-box > i:nth-child(1) {
  right: 100px;
}
.songListItem-left-box > i:nth-child(2) {
  right: 80px;
  font-weight: 400;
}
.songListItem-left-box > i:nth-child(3) {
  right: 55px;
}
.songListItem-left-box > i:nth-child(4) {
  right: 30px;
}
.like {
  left: 10px;
  color: #c0c0c0;
  display: block;
}
.like:hover {
  color: #ff6664;
}
.songListItem-left-box-text {
  margin-left: 40px;
  color: #535353;
  font-size: 14px;
  /* max-width: 300px; */
  width: 24vw;
}
.songListItem-singer-box,
.songListItem-album-box,
.songListItem-time-box {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.color-played {
  color: #1dc690;
}
.color-played > i {
  color: #1dc690;
}
.backColor-played {
  background-color: #eeeeee;
}
</style>
