<template>
  <div class="search">
    <div class="search-title">
      <p
        :class="{ 'search-title-checked': checked.songs }"
        @click="togglePage('songs')"
      >
        歌曲
      </p>
      <p
        :class="{ 'search-title-checked': checked.video }"
        @click="togglePage('video')"
      >
        视频
      </p>
      <p
        :class="{ 'search-title-checked': checked.album }"
        @click="togglePage('album')"
      >
        专辑
      </p>
      <p
        :class="{ 'search-title-checked': checked.songLists }"
        @click="togglePage('songLists')"
      >
        歌单
      </p>
      <p
        :class="{ 'search-title-checked': checked.singer }"
        @click="togglePage('singer')"
      >
        歌手
      </p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const checked = reactive({
      songs: true,
      singer: false,
      video: false,
      album: false,
      songLists: false,
      current: "songs",
    });
    //切换页面(路由)
    const togglePage = function (key) {
      checked[checked.current] = false;
      checked[key] = true;
      checked.current = key;
      if (key === "songs") {
        router.push(`/search/`);
      } else {
        router.push(`/search/${key}`);
      }
    };
    return {
      checked,
      togglePage,
    };
  },
});
</script>

<style>
.search-title {
  margin: 0px 0 20px 0;
  display: flex;
}
.search-title-checked {
  color: #1ecd98;
  padding-bottom: 10px;
  border-bottom: 4px solid #1ecd98;
}
.search-title > p {
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 50px;
}
.search-title > p:hover {
  color: #1ecd98;
}
</style>
