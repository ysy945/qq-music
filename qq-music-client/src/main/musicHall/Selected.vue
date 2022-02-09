<template>
  <div class="musicHall-selected">
    <p class="musicHall-selected-title">
      官方歌单
      <span>官方甄选订阅歌单</span>
    </p>

    <ul class="musicHall-selected-songList">
      <li v-for="p in state.musicHallSelectedPlayLists.slice(0, 6)" :key="p.id">
        <SongSheet
          :imgUrl="p.coverImgUrl"
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

    <p class="musicHall-selected-title">
      推荐歌单
      <span>官方甄选歌单</span>
    </p>

    <ul class="musicHall-selected-songList">
      <li
        v-for="p in state.musicHallSelectedPlayLists.slice(6, 12)"
        :key="p.id"
      >
        <SongSheet
          :imgUrl="p.coverImgUrl"
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

    <p class="musicHall-selected-title">
      精选歌单
      <span>都是你最爱听</span>
    </p>

    <ul class="musicHall-selected-songList">
      <li
        v-for="p in state.musicHallSelectedPlayLists.slice(12, 18)"
        :key="p.id"
      >
        <SongSheet
          :imgUrl="p.coverImgUrl"
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
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import SongSheet from "../../staticComponents/SongSheet.vue";
import playListsGet from "../../send/playListsGet";
export default defineComponent({
  components: {
    SongSheet,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = store.state;
    const musicHallSelectedPlayLists = state.musicHallSelectedPlayLists;
    if (musicHallSelectedPlayLists.length === 0) {
      store.commit("setLoadState", false);
      playListsGet(
        (data) => {
          store.commit("setMusicHallSelectedPlayLists", data);
          store.commit("setLoadState", true);
          store.commit("backToTop");
        },
        () => {},
        {}
      );
    }

    function songSheetClick(event, id) {
      router.push(`/songSheetDetail/${id}`);
    }
    return {
      state,
      songSheetClick,
    };
  },
});
</script>

<style>
.musicHall-selected-title {
  font-size: 22px;
  font-weight: 500;
}
.musicHall-selected-title > span {
  font-size: 13px;
  vertical-align: middle;
  color: #7b7b7b;
  margin-left: 15px;
}
.musicHall-selected-songList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
