<template>
  <div class="header">
    <i
      class="header-left-arrow iconfont icon-xiangzuojiantou"
      title="后退"
      @click="routerBack"
    ></i>
    <i
      class="header-right-arrow iconfont icon-xiangyoujiantou"
      title="前进"
      @click="routerGo"
    ></i>
    <div class="header-search">
      <input
        type="text"
        placeholder="搜索歌曲"
        v-model="searchKeyWords"
        @keyup.enter="searchSongs"
      />
      <i class="iconfont icon-sousuo" title="搜索" @click="searchSongs"></i>
    </div>
    <i
      id="header-get-music-by-listen"
      title="听歌识曲"
      class="iconfont icon-tinggeshiqu"
    ></i>
    <i class="base first iconfont icon-xiangxiajiantou" title="用户信息"></i>
    <i class="base second iconfont icon-huanfu" title="换肤"></i>
    <i class="base third iconfont icon-liebiao" title="主菜单"></i>
    <img
      class="base header-img"
      src="https://p1.music.126.net/iMYQNzWbR4oM1b85Y61jxg==/109951166679850771.jpg?param=200y200"
      alt=""
    />
    <div class="header-nickname">南、小鸟</div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import searchGet from "../send/searchGet";
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = store.state;
    const searchKeyWords = ref("");

    const routerBack = function () {
      if (state.loadState) {
        router.back();
      }
    };
    const routerGo = function () {
      if (state.loadState) {
        router.forward();
      }
    };

    function searchSongs() {
      store.commit("setLoadState", false);
      // store.commit("backToTop");
      searchGet(
        (data) => {
          router.push("/search");
          store.commit("setSongSheetLists", data.result);
          store.commit("setLoadState", true);
          store.commit("backToTop");
        },
        () => {},
        { keyWords: searchKeyWords.value }
      );
    }
    return {
      routerBack,
      routerGo,
      searchKeyWords,
      searchSongs,
      store,
      state,
    };
  },
});
</script>

<style scoped>
.header {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #fafafa;
  padding: 20px;
  line-height: 40px;
}
.header-left-arrow,
.header-right-arrow {
  transition: color 0.2s;
  cursor: pointer;
  font-size: 16px;
  font-weight: bolder;
}
.header-left-arrow {
  color: #838383;
}
.header-right-arrow {
  margin-left: 20px;
  color: #b9b9b9;
}
.header-right-arrow:hover,
.header-left-arrow:hover,
.header-nickname:hover,
.header-search > i:hover,
#header-get-music-by-listen:hover,
.base:hover {
  color: #1ecc94;
}
.header-search {
  display: inline-block;
  width: 200px;
  height: 40px;
  background-color: #e0e0e0;
  line-height: 40px;
  border-radius: 20px;
  margin-left: 40px;
}
.header-search > input {
  width: 150px;
  padding: 0;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  display: inline-block;
  margin-bottom: 4px;
  background-color: #e0e0e0;
  border: none;
  outline: medium;
  margin-left: 20px;
  font-size: 17px;
}
.header-search > input::placeholder {
  font-size: 14px;
}
.header-search > i {
  transition: color 0.2s;
  cursor: pointer;
}

#header-get-music-by-listen {
  cursor: pointer;
  transition: color 0.3s;
  position: absolute;
  margin-left: 20px;
  font-weight: 100;
  font-size: 25px;
  color: #838383;
}
.base {
  transition: color 0.3s;
  cursor: pointer;
  position: absolute;
  font-size: 20px;
  font-weight: 600;
  color: #7b7b7b;
}

.first {
  right: 100px;
  top: 21.5px;
}
.second {
  right: 60px;
  top: 21.5px;
}
.third {
  right: 20px;
  top: 21.5px;
}
.header-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  right: 200px;
  top: 20px;
}
.header-nickname {
  transition: color 0.3s;
  position: absolute;
  right: 130px;
  bottom: 20px;
  color: #7b7b7b;
}
</style>
