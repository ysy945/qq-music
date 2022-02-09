<template>
  <h1>推荐</h1>
  <h2 class="content-list-title">Hi 今日为你推荐</h2>
  <ul class="content-top">
    <li>
      <SongSheet
        imgUrl="http://y.qq.com/music/common/upload/t_music_radio/1261958.jpg?max_age=2592000"
        title="每日30首"
        :isEffect="false"
        :id="999888555"
        :style="{ width: '12.5vw' }"
        height="12.5vw"
        width="12.5vw"
      />
    </li>
    <li>
      <SongSheet
        imgUrl="http://y.qq.com/music/common/upload/t_music_radio/1260297.jpg?max_age=2592000"
        title="百万收藏"
        :isEffect="false"
        :id="999888666"
        :style="{ width: '12.5vw' }"
        width="12.5vw"
        height="12.5vw"
      />
    </li>
    <li>
      <SongSheet
        imgUrl="http://y.qq.com/music/common/upload/t_music_radio/1652761.jpg?max_age=2592000"
        title="新歌推荐"
        :isEffect="false"
        :id="999888777"
        :style="{ width: '12.5vw' }"
        width="12.5vw"
        height="12.5vw"
      />
    </li>
  </ul>

  <h2 class="content-list-title">你的歌单保障库</h2>
  <ul class="content-songList">
    <li v-for="p in songListsData.slice(0, 12)" :key="p.id">
      <SongSheet
        :imgUrl="p.picUrl"
        :title="p.name"
        :number="p.playCount"
        :id="p.id"
        :style="{ width: '12.5vw' }"
        height="12.5vw"
        width="12.5vw"
        :onClick="songSheetClick"
      />
    </li>
  </ul>

  <div style="display: flex">
    <h2 class="content-list-title" style="margin-right: 20px">大家都在听</h2>
    <Button
      :checked="false"
      :onClick="playAllSongs"
      :params="randomSongsData.slice(0, 6)"
    />
  </div>
  <ul class="content-single-song-container">
    <li v-for="p in randomSongsData.slice(0, 6)" :key="p.id" style="width: 96%">
      <Song
        :details="p"
        :addSongClick="addSong"
        :currentPlayData="state.lyricPage"
        :playClick="playMusicClick"
      />
    </li>
  </ul>

  <h2 class="content-list-title" style="margin-right: 20px">
    符合你最近的音乐
  </h2>
  <ul class="content-songList">
    <li v-for="p in songListsData.slice(12, 18)" :key="p.id">
      <SongSheet
        :imgUrl="p.picUrl"
        :title="p.name"
        :number="p.playCount"
        :id="p.id"
        :style="{ width: '12.5vw' }"
        height="12.5vw"
        width="12.5vw"
        :onClick="songSheetClick"
      />
    </li>
  </ul>

  <h2 class="content-list-title" style="margin-right: 20px">
    如何? 换个口味吧
  </h2>
  <ul class="content-songList">
    <li v-for="p in songListsData.slice(18, 24)" :key="p.id">
      <SongSheet
        :imgUrl="p.picUrl"
        :title="p.name"
        :number="p.playCount"
        :id="p.id"
        :style="{ width: '12.5vw' }"
        height="12.5vw"
        width="12.5vw"
        :onClick="songSheetClick"
      />
    </li>
  </ul>

  <div style="display: flex">
    <h2 class="content-list-title" style="margin-right: 20px">你的私人推荐</h2>
    <Button
      :checked="false"
      :onClick="playAllSongs"
      :params="randomSongsData.slice(6, 10)"
    />
  </div>
  <ul class="content-single-song-container">
    <li
      v-for="p in randomSongsData.slice(6, 10)"
      :key="p.id"
      style="width: 96%"
    >
      <Song
        :details="p"
        :addSongClick="addSong"
        :currentPlayData="state.lyricPage"
        :playClick="playMusicClick"
      />
    </li>
  </ul>

  <h2 class="content-list-title" style="margin-right: 20px">你的喜爱</h2>
  <ul class="content-songList">
    <li v-for="p in songListsData.slice(24, 30)" :key="p.id">
      <SongSheet
        :imgUrl="p.picUrl"
        :title="p.name"
        :number="p.playCount"
        :id="p.id"
        :style="{ width: '12.5vw' }"
        height="12.5vw"
        width="12.5vw"
        :onClick="songSheetClick"
      />
    </li>
  </ul>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SongSheet from "../staticComponents/SongSheet.vue";
import Button from "../staticComponents/Button.vue";
// import SongSheetPlus from "../staticComponents/SongSheetPlus.vue";
import Song from "../staticComponents/Song.vue";
import recommendGet from "../send/recommendGet";
import randomSongsGet from "../send/randomSongsGet";
export default defineComponent({
  props: {},
  components: {
    SongSheet,
    Button,
    Song,
    // SongSheetPlus,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = store.state;
    let songListsData = reactive([]);
    let randomSongsData = reactive([]);
    store.commit("setLoadState", false);
    if (state.recommendSongLists.length <= 0) {
      recommendGet(({ result }) => {
        songListsData.push(...result);
        store.commit("setLoadState", true);
        store.commit("backToTop");
        store.commit("setRecommendSongLists", result);
      });
    } else {
      songListsData = state.recommendSongLists;
      store.commit("setLoadState", true);
      store.commit("backToTop");
    }

    if (state.randomSongs.length <= 0) {
      randomSongsGet(({ result }) => {
        randomSongsData.push(...result);
        store.commit("setRandomSongs", result);
      });
    } else {
      randomSongsData = state.randomSongs;
    }

    const songSheetClick = function (event, id) {
      router.push(`/songSheetDetail/${id}`);
    };
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
    function addSong(event, details) {
      store.commit("addSongToQueue", details);
    }
    //播放所有歌曲
    function playAllSongs(event, params) {
      store.dispatch("playAllMusic", params);
    }

    return {
      songSheetClick,

      songListsData,
      randomSongsData,
      playMusicClick,
      state,
      store,
      addSong,
      playAllSongs,
    };
  },
});
</script>

<style>
.content-list-title {
  font-weight: 400;
  font-size: 21px;
  line-height: 30px;
  height: 30px;
}
.content-songList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.content-top {
  display: flex;
}
.content-top > li {
  margin-right: 22px;
}

.content-songList > li {
  margin-bottom: 20px;
}

.content-single-song-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
