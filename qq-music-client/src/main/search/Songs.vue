<template>
  <div class="songs-list-title">
    <p>歌曲</p>
    <p>歌手</p>
    <p>专辑</p>
    <p>时长</p>
  </div>
  <div v-for="p in state.songSheetLists" :key="p.id">
    <SongListItem
      :details="p"
      :addSongClick="addSong"
      :currentPlayData="state.lyricPage"
      :playClick="playMusicClick"
    />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent } from "vue";
import SongListItem from "../../staticComponents/SongListItem.vue";
export default defineComponent({
  components: {
    SongListItem,
  },
  setup() {
    const store = useStore();
    const state = store.state;
    function addSong(event, details) {
      store.commit("addSongToQueue", details);
    }
    function playMusicClick(details) {
      //查看当前队列中是否有这首歌曲
      const findResult = state.queue.songs.find(
        (song) => song.id === details.id
      );
      //如果没找到
      if (!findResult) {
        store.dispatch("insertQueue", details);
      }
      //找到了
      else {
        //如果没有播放则播放这首歌
        if (!(store.state.lyricPage.id === details.id)) {
          store.dispatch("playMusicAsync", details);
          //如果正在播放则暂停这首音乐
        } else {
          store.commit("toggleMusicState");
        }
      }
    }
    return {
      state,
      // console,
      addSong,
      store,
      playMusicClick,
    };
  },
});
</script>

<style></style>
