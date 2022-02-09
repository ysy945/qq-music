<template>
  <div class="musicHall">
    <div class="musicHall-title">
      <p
        :class="{ 'musicHall-title-checked': checked.selected }"
        @click="togglePage('selected')"
      >
        精选
      </p>
      <p
        :class="{ 'musicHall-title-checked': checked.rankingList }"
        @click="togglePage('rankingList')"
      >
        排行
      </p>
      <p
        :class="{ 'musicHall-title-checked': checked.singer }"
        @click="togglePage('singer')"
      >
        歌手
      </p>
      <p
        :class="{ 'musicHall-title-checked': checked.classifiedSongList }"
        @click="togglePage('classifiedSongList')"
      >
        分类歌单
      </p>
      <p
        :class="{ 'musicHall-title-checked': checked.audioStation }"
        @click="togglePage('audioStation')"
      >
        有声电台
      </p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const checked = reactive({
      selected: false,
      audioStation: false,
      classifiedSongList: false,
      singer: false,
      rankingList: false,
      current: getPath(),
    });
    checked[checked.current] = true;

    function getPath() {
      let path = "selected";
      if (route.fullPath !== "/musicHall/" && route.fullPath !== "/musicHall") {
        path = route.fullPath.split("/")[2];
      }
      return path;
    }

    watch(
      () => route.fullPath,
      () => {
        changeChecked(getPath());
      }
    );

    //切换页面(路由)
    const togglePage = function (key) {
      if (key === "selected") {
        router.push(`/musicHall/`);
      } else {
        router.push(`/musicHall/${key}`);
      }
    };

    function changeChecked(key) {
      checked[checked.current] = false;
      checked[key] = true;
      checked.current = key;
    }
    return {
      checked,
      togglePage,
    };
  },
});
</script>

<style>
.musicHall-title {
  margin: 0px 0 20px 0;
  display: flex;
}
.musicHall-title-checked {
  color: #1ecd98;
  padding-bottom: 10px;
  border-bottom: 4px solid #1ecd98;
}
.musicHall-title > p {
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 50px;
}
.musicHall-title > p:hover {
  color: #1ecd98;
}
</style>
