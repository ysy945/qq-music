<template>
  <div class="nav">
    <div class="nav-music-tag">
      <i>QQ音乐</i>
    </div>
    <div class="nav-music-online">
      <p class="nav-music-online-title">在线音乐</p>
      <NavItem
        :checked="checkedNavItem['home']"
        iconClass="iconfont icon-tuijiansel"
        :onClick="navItemClick"
        :isPlay="state.lyricPage.isPlay"
        :params="{ path: 'home' }"
      />
      <NavItem
        :checked="checkedNavItem['musicHall']"
        iconClass="iconfont icon-yinle"
        :onClick="navItemClick"
        text="音乐馆"
        :params="{ path: 'musicHall' }"
      />
      <NavItem
        :checked="checkedNavItem['video']"
        iconClass="iconfont icon-shipintianchong"
        :onClick="navItemClick"
        text="视频"
        :params="{ path: 'video' }"
      />
      <NavItem
        :checked="checkedNavItem['radioSta']"
        iconClass="iconfont icon-diantai"
        :onClick="navItemClick"
        text="电台"
        :params="{ path: 'radioSta' }"
      />
    </div>
    <div class="nav-my-music">
      <p class="nav-my-music-title">我的音乐</p>
      <NavItem
        :checked="checkedNavItem['userLike']"
        iconClass="iconfont icon-xihuan"
        :onClick="navItemClick"
        text="我喜欢"
        :params="{ path: 'userLike' }"
      />
      <NavItem
        iconClass="iconfont icon-bendisucai"
        :onClick="navItemClick"
        text="本地和下载"
        :checked="checkedNavItem['localAndDownload']"
        :params="{ path: 'localAndDownload' }"
      />
      <NavItem
        iconClass="iconfont icon-zuijinlaifang"
        :onClick="navItemClick"
        text="最近播放"
        :checked="checkedNavItem['playedRecently']"
        :params="{ path: 'playedRecently' }"
      />
      <NavItem
        iconClass="iconfont icon-liebiao"
        :onClick="navItemClick"
        text="试听列表"
        :checked="checkedNavItem['auditionList']"
        :params="{ path: 'auditionList' }"
      />
    </div>
    <div class="nav-song-list-created">
      <p class="nav-song-list-created-title">创建的歌单</p>
      <NavItem :onClick="function () {}" text="who" />
      <NavItem :onClick="function () {}" text="新建歌单1" />
      <NavItem :onClick="function () {}" text="最新歌曲" />
      <NavItem :onClick="function () {}" text="我最爱听" />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import NavItem from "../staticComponents/NavItem.vue";
export default defineComponent({
  components: {
    NavItem,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const route = useRoute();
    watch(
      () => route.fullPath,
      () => {
        changeCheckedNavItem({ path: route.fullPath });
      }
    );
    const state = store.state;
    const checkedNavItem = reactive({
      home: true,
      musicHall: false,
      video: false,
      radioSta: false,
      userLike: false,
      localAndDownload: false,
      playedRecently: false,
      auditionList: false,
      currentChecked: "home",
    });
    function navItemClick(event, params) {
      // console.log("我是navItem组件");
      router.push("/" + params.path);
    }
    function changeCheckedNavItem(params) {
      const path = params.path.split("/")[1];
      //只有当监测的路由在这里面的时候才去跳转
      if (Object.keys(checkedNavItem).find((key) => path === key)) {
        //之前得状态改为false
        checkedNavItem.currentChecked &&
          (checkedNavItem[checkedNavItem.currentChecked] = false);
        //当前点击得改为true
        checkedNavItem[path] = true;
        //修改currentChecked
        checkedNavItem.currentChecked = path;
      }
      //没找到初始化即可
      else {
        //之前得状态改为false
        checkedNavItem[checkedNavItem.currentChecked] = false;
        //当前选中为其他
        checkedNavItem.currentChecked = null;
      }
    }
    return {
      props,
      navItemClick,
      checkedNavItem,
      state,
      changeCheckedNavItem,
    };
  },
});
</script>

<style scoped>
.nav {
  grid-row-start: 1;
  grid-row-end: 4;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  padding: 0px 15px;
  overflow: scroll;
}
.nav::-webkit-scrollbar {
  display: none;
}
.nav-music-tag,
.nav-music-online,
.nav-my-music,
.nav-song-list-created {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  flex-shrink: 0;
}
.nav-music-tag > i {
  font-size: 30px;
  font-weight: bolder;
  background-image: linear-gradient(to right, #81eed8, #1ecc94);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  justify-content: center;
}
.nav-music-tag {
  height: 95px;
}
.nav-music-online {
  height: 200px;
}
.nav-my-music {
  height: 210px;
}
.nav-song-list-created {
  height: 200px;
}
.nav-music-online-title,
.nav-my-music-title,
.nav-song-list-created-title {
  font-size: 12px;
  color: #787878;
  margin-left: 20px;
}
</style>
