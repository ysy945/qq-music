<template>
  <div
    :class="{ 'queue-item': true, 'queue-item-played': isPlayed }"
    @dblclick="dblclick"
  >
    <div class="queue-item-left" style="width: 100%">
      <p :class="{ ellipsis: true, 'is-played': isPlayed }">
        {{ props.details.songName }}
      </p>
      <p :class="{ ellipsis: true, 'is-played': isPlayed }">
        {{ props.details.singer }}
      </p>
    </div>
    <div
      :class="{ 'queue-item-right': true, 'queue-item-right-played': isPlayed }"
    >
      <p>{{ props.details.time }}</p>
    </div>
    <div
      :class="{
        'queue-item-right-hover': true,
        'queue-item-right-hover-played': isPlayed,
      }"
    >
      <i
        :class="{
          position: true,
          iconfont: true,
          'icon-24gl-play': !isPlayed,
          'icon-zanting1': isPlayed,
        }"
        @click.stop="props.playMusicClick(props.details)"
      ></i>
      <!-- <i class="first-stop position iconfont icon-zanting1"></i> -->
      <i
        :class="{
          position: true,
          iconfont: true,
          'icon-xihuan1': true,
          like: props.details.isLike,
        }"
        :title="likeTitle"
      ></i>
      <i class="position iconfont icon-xiazai" title="下载"></i>
      <i
        class="position iconfont icon-shanchu"
        title="删除"
        @click.stop="props.deleteSong($event, props.details)"
        @dblclick.stop=""
      ></i>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    details: Object,
    params: Object,
    playMusicClick: Function,
    currentPlayData: Object,
    deleteSong: Function,
  },
  setup(props) {
    const likeTitle = computed(() => {
      return props.details.isLike ? "取消喜欢" : "喜欢";
    });
    const isPlayed = computed(
      () =>
        props.currentPlayData.id === props.details.id &&
        props.currentPlayData.isPlay === true
    );
    function dblclick() {
      props.playMusicClick(props.details);
    }
    return {
      props,
      likeTitle,
      isPlayed,
      dblclick,
    };
  },
});
</script>

<style scoped>
.queue-item {
  width: 100%;
  height: 70px;
  /* border: 1px solid black; */
  display: grid;
  grid-template-columns: 6fr 4fr;
  box-sizing: border-box;
  padding: 13px 0 13px 20px;
}
.queue-item-played {
  background-color: #f8f8f8;
}
.queue-item:hover {
  background-color: #f8f8f8;
}
.queue-item:hover > .queue-item-right-hover {
  display: block;
}
.queue-item:hover > .queue-item-right {
  display: none;
}
.queue-item-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.queue-item-left :nth-child(1) {
  font-size: 14px;
  width: 165px;
}
.queue-item-left :nth-child(2) {
  font-size: 12px;
  color: #8b8b8b;
  width: 165px;
}
.queue-item-right {
  position: relative;
  /* display: none; */
}
.queue-item-right-played {
  display: none;
}
.queue-item-right > p {
  position: absolute;
  bottom: 0;
  right: 20px;
  font-size: 12px;
  color: #8b8b8b;
}
.queue-item-right-hover {
  display: none;
  line-height: 44px;
  align-items: center;
}
.queue-item-right-hover-played {
  display: block !important;
}
.queue-item-right-hover > i {
  margin-right: 10px;
  font-size: 17px;
  cursor: pointer;
  transition: color 0.2s;
  color: #8b8b8b;
}
.queue-item-right-hover > i:nth-child(1) {
  font-weight: 600;
}
.queue-item-right-hover > i:hover {
  color: #1ecd98;
}
.queue-item-right-hover > i:nth-child(2):hover {
  color: #ff6664;
}
.like {
  color: #ff6664 !important;
}
.is-played {
  color: #1ecd98 !important;
}
</style>
