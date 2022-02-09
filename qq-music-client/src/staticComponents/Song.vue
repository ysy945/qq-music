<template>
  <div
    class="song"
    @dblclick="dblclick"
    :class="{ 'backColor-played': isPlayed }"
  >
    <div class="song-left">
      <img :src="props.details.picUrl" alt="" class="song-left-img" />
    </div>
    <div class="song-right">
      <p class="song-right-song-title" :class="{ 'color-played': isPlayed }">
        {{ props.details.songName }}
      </p>
      <p class="song-right-singer-name">{{ props.details.singer }}</p>
      <i
        :class="{
          first: true,
          position: true,
          iconfont: true,
          'icon-24gl-play': !isPlayed,
          'icon-zanting1': isPlayed,
        }"
        @click="props.playClick(props.details)"
      ></i>
      <!-- <i class="first-stop position iconfont icon-zanting1"></i> -->
      <i
        class="second position iconfont icon-jiahao"
        @click="props.addSongClick($event, props.details)"
      ></i>
      <i class="third position iconfont icon-xiazai"></i>
      <i class="fourth position iconfont icon-gengduo"></i>
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
.song {
  box-sizing: border-box;
  padding: 10px 10px 10px 0;
  display: flex;
  width: 100%;
  height: 80px;
  position: relative;
}
.song:hover {
  background-color: #eeeeee;
}
.song:hover > .song-right > .position {
  display: block;
}
.song-left {
  width: 60px;
  height: 60px;
}
.song-left-img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.song-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}
.song-right-song-title {
  font-size: 12px;
  margin-bottom: 5px;
}
.song-right-singer-name {
  color: #7b7b7b;
  font-size: 12px;
}

.position {
  transition: color 0.2s;
  color: #7f7f7f;
  cursor: pointer;
  position: absolute;
  font-size: 18px;
  display: none;
}
.position:hover {
  color: #1dc690;
}
.first {
  right: 100px;
  top: 30px;
  font-weight: 800;
}
.second {
  right: 75px;
  top: 30px;
}
.third {
  right: 48px;
  top: 30px;
}
.fourth {
  right: 21px;
  top: 30px;
}
.backColor-played {
  background-color: #eeeeee;
}
.color-played {
  color: #1dc690;
}
</style>
