<template>
  <!-- <router-view></router-view> -->
  <div class="main" @click="closeQueuePage">
    <Nav />
    <Header />
    <Content />
    <Footer />
  </div>
  <Queue />
  <Lyric />
</template>

<script>
import { useStore } from "vuex";
import "./style/static.css";
import Content from "./main/Content.vue";
import Footer from "./main/Footer.vue";
import Header from "./main/Header.vue";
// import PlayList from "./main/PlayList.vue";
import Nav from "./main/Nav.vue";
import Queue from "./main/Queue.vue";
import Lyric from "./main/Lyric.vue";
export default {
  name: "App",
  components: {
    Content,
    Footer,
    Header,
    // PlayList,
    Nav,
    Queue,
    Lyric,
  },
  setup() {
    const store = useStore();
    const state = store.state;
    function closeQueuePage() {
      // eslint-disable-next-line no-empty
      if (state.queue.isOpen) {
        store.commit("closeQueuePage");
      }
    }
    document.onmousedown = function () {
      store.commit("closeVolume");
      store.commit("closeVolumeLyric");
    };
    return {
      closeQueuePage,
    };
  },
};
</script>

<style>
.main {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 210px auto;
  grid-template-rows: 80px auto 80px;
  min-width: 1250px;
  /* min-height: 500px; */
}
</style>
