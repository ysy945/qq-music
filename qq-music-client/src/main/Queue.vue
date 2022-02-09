<template>
  <div :class="{ queue: true, isOpen: !state.queue.isOpen }" id="queue">
    <header class="queue-header">
      <h2 class="queue-header-title">播放队列</h2>
      <section class="queue-header-section">
        <span>{{ state.queue.songs.length }}首</span>
        <i class="iconfont icon-icon-piliangcaozuo" title="批量操作"></i>
        <i class="iconfont icon-shanchu" title="清空" @click="clearQueue"></i>
      </section>
    </header>

    <article class="queue-article" id="queue-article">
      <ul style="margin: 0">
        <li v-for="p in state.queue.songs" :key="p.id">
          <QueueItem
            :details="p"
            :playMusicClick="playMusic"
            :currentPlayData="state.lyricPage"
            :deleteSong="deleteSong"
          />
        </li>
      </ul>
    </article>

    <footer class="queue-footer">
      <div>
        <p></p>
        <i class="iconfont icon-bofangduilie" @click="closeQueuePage">收起</i>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import QueueItem from "../staticComponents/QueueItem.vue";
export default defineComponent({
  components: {
    QueueItem,
  },
  setup() {
    const store = useStore();
    function closeQueuePage() {
      store.commit("closeQueuePage");
    }
    function clearQueue() {
      store.commit("clearQueue");
    }
    function playMusic(details) {
      //如果没有播放则播放这首歌
      if (!(store.state.lyricPage.id === details.id)) {
        store.dispatch("playMusicAsync", details);
        //如果正在播放则暂停这首音乐
      } else {
        store.commit("toggleMusicState");
      }
    }
    function deleteSong(event, details) {
      store.dispatch("deleteQueueSong", details);
    }
    //挂载时候获得queue这个dom
    onMounted(() => {
      store.commit("setQueueArticleDom");
    });

    return {
      closeQueuePage,
      state: store.state,
      clearQueue,
      playMusic,
      deleteSong,
    };
  },
});
</script>

<style>
.queue {
  position: fixed;
  width: 300px;
  height: 100%;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 0 15px 1px rgb(190, 189, 189);
  overflow: hidden;
  transition: width 0.5s;
  display: grid;
  grid-template-rows: 100px auto 80px;
  z-index: 5;
  top: 0;
}
.isOpen {
  width: 0;
}
.queue-header {
  box-sizing: border-box;
  padding: 20px;
}
.queue-header-title {
  font-size: 20px;
  font-weight: 500;
  color: black;
}
.queue-article {
  overflow-y: scroll;
}
.queue-article::-webkit-scrollbar-thumb {
  background-color: #d3d3d3;
  border-radius: 10px;
}
.queue-article::-webkit-scrollbar {
  width: 5px;
}
.queue-article::-webkit-scrollbar-thumb:hover {
  background-color: #c4c4c4;
}

.queue-header-section {
  margin-top: 3px;
  width: 260px;
  /* height: 10px; */
}
.queue-header-section > * {
  transition: color 0.2s;
  color: #808080;
  vertical-align: middle;
}
.queue-header-section > span {
  padding-right: 174px;
  font-size: 12px;
}
.queue-header-section > i:hover {
  color: #1ecd98;
}
.queue-header-section > i:nth-child(2) {
  font-size: 14px;
  margin-right: 20px;
  cursor: pointer;
}
.queue-header-section > i:nth-child(3) {
  cursor: pointer;
  font-size: 18px;
}
.queue-footer {
  box-sizing: border-box;
}
.queue-footer > div {
  padding: 8px 20px;
  height: 62px;
  position: relative;
}
.queue-footer > div > i {
  font-size: 13px;
  color: #808080;
  position: absolute;
  right: 20px;
  bottom: 25px;
  transition: color 0.2s;
  cursor: pointer;
}
.queue-footer > div > i:hover {
  color: #1ecd98;
}
.queue-footer > div > p {
  width: 100%;
  height: 2px;
  background-color: #1ecd98;
}
</style>
