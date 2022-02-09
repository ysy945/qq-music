<template>
  <div class="songSheetDetail-header">
    <div class="songSheetDetail-header-left">
      <img :src="data.coverImgUrl" alt="" />
    </div>
    <div class="songSheetDetail-header-detail">
      <h1>{{ data.name }}</h1>
      <div class="songSheetDetail-header-detail-user">
        <img :src="data.userImgUrl" alt="" />
        <p class="songSheetDetail-header-detail-username" style="color: black">
          {{ data.nickname }}
        </p>
        <p v-for="p in data.tags" :key="p">#{{ p }}</p>
      </div>
      <p class="songSheetDetail-header-detail-descriptor">
        {{ data.description }}
      </p>
      <div class="songSheetDetail-header-detail-function">
        <Button :checked="true" :params="data" @click="playAllSongs" />
        <div style="width: 10px"></div>
        <Button text="收藏" iconClass="iconfont icon-xihuan" />
        <div class="songSheetDetail-header-detail-function-more">
          <i class="iconfont icon-gengduo"></i>
        </div>
      </div>
    </div>
  </div>

  <div class="songSheetDetail-title">
    <p
      @click="togglePage('songs')"
      :class="{ 'songSheetDetail-title-checked': checked.songs }"
    >
      歌曲{{ state.songSheetLists.length }}
    </p>
    <p
      @click="togglePage('commits')"
      :class="{ 'songSheetDetail-title-checked': checked.commits }"
    >
      评论(暂未开通)
    </p>
  </div>

  <router-view> </router-view>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
// import SongListItem from "../staticComponents/SongListItem.vue";
import Button from "../staticComponents/Button.vue";
import songsDetailGet from "../send/songsDetailGet";
export default defineComponent({
  components: {
    // SongListItem,
    Button,
  },
  setup() {
    const store = useStore();
    const state = store.state;
    store.commit("setLoadState", false);
    const router = useRouter();
    const route = useRoute();
    const id = route.params.id;
    // router.replace(`/songSheetDetail/${id}/songs`);
    const data = reactive({
      // coverImgUrl: "",
      // description: "",
      // details: [],
      // name: "",
      // nickname: "",
      // tags: [],
      // userImgUrl: "",
    });
    const checked = reactive({
      songs: true,
      commits: false,
      current: "songs",
    });

    //请求数据
    songsDetailGet(
      ({ result }) => {
        Object.keys(result).forEach((key) => {
          data[key] = result[key];
        });
        store.commit("setSongSheetLists", result.details);
        store.commit("setLoadState", true);
        store.commit("backToTop");
      },
      (err) => {
        console.log(err);
      },
      id
    );

    //切换页面(路由)
    const togglePage = function (key) {
      checked[checked.current] = false;
      checked[key] = true;
      checked.current = key;
      if (key === "songs") {
        router.push(`/songSheetDetail/${id}/`);
      } else {
        router.push(`/songSheetDetail/${id}/${key}`);
      }
    };

    //播放所有歌曲
    function playAllSongs(event, params) {
      store.dispatch("playAllMusic", params.details);
    }

    return {
      togglePage,
      checked,
      state,
      data,
      playAllSongs,
    };
  },
});
</script>

<style>
.songSheetDetail-header {
  box-sizing: border-box;
  padding: 0 10px 10px 10px;
  display: grid;
  grid-template-columns: 195px 1fr;
  height: 190px;
}
.songSheetDetail-header-left {
  height: 100%;
}
.songSheetDetail-header-left > img {
  width: 170px;
  height: 170px;
  border-radius: 10px;
}
.songSheetDetail-header-detail {
  width: 60vw;
}
.songSheetDetail-header-detail-user {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 10px;
}
.songSheetDetail-header-detail-user > img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.songSheetDetail-header-detail-user > p {
  transition: color 0.3s;
  margin-right: 20px;
  font-size: 12px;
  color: #9b9b9b;
}
.songSheetDetail-header-detail-username {
  cursor: pointer;
  transition: color 0.2s;
}
.songSheetDetail-header-detail-username:hover {
  color: #1ecd98 !important;
}
.songSheetDetail-header-detail-descriptor {
  /* width: 80px; */
  font-size: 12px;
  color: #9b9b9b;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.songSheetDetail-header-detail-function {
  margin-top: 20px;
  display: flex;
}
.songSheetDetail-header-detail-function-more {
  width: 32px;
  height: 32px;
  background-color: #e1e1e1;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.songSheetDetail-header-detail-function-more:hover {
  background-color: #dadada;
}
.songSheetDetail-title {
  margin: 0px 0 20px 0;
  display: flex;
}
.songSheetDetail-title-checked {
  color: #1ecd98;
  padding-bottom: 10px;
  border-bottom: 4px solid #1ecd98;
}
.songSheetDetail-title > p {
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 50px;
}
.songSheetDetail-title > p:hover {
  color: #1ecd98;
}
</style>
