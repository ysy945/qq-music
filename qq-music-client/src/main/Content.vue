<template>
  <div style="width: 100%; height: 100%; overflow: hidden; position: relative">
    <div :class="{ content: true, loading: !state.loadState }">
      <router-view> </router-view>
    </div>
    <div :class="{ 'content-lazy-loading': true, load: state.loadState }">
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
    </div>
    <audio src="" id="audio" :volume="0.5"></audio>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
// import Home from "./Home.vue";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    // Home,
  },
  setup() {
    // content.scrollTop = 100;
    const store = useStore();
    const state = store.state;

    //挂载的时候获取dom
    onMounted(() => {
      store.commit("setContentDom");
      store.commit("setAudioDom");
    });

    return { state };
  },
});
</script>

<style>
.content {
  width: 100%;
  height: 100%;
  /* border: 1px solid black; */
  box-sizing: border-box;
  overflow-y: scroll;
  background-color: #fafafa;
  /* display: flex; */
  /* justify-content: space-evenly; */
  /* align-items: center; */
  /* flex-wrap: wrap; */
  padding: 20px;
  position: relative;
}
.content > h1 {
  margin-bottom: 10px;
}
.content::-webkit-scrollbar {
  width: 10px;
}
.content::-webkit-scrollbar-thumb:hover {
  background-color: #c4c4c4;
}
.content::-webkit-scrollbar-thumb {
  background-color: #d3d3d3;
  border-radius: 10px;
}
.loading {
  visibility: hidden;
}
.content-lazy-loading {
  position: absolute;
  z-index: 2;
  background-color: #fcfcfc;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.4s;
  overflow: hidden;
}
.load {
  width: 0;
}

.sk-chase {
  width: 100px;
  height: 100px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2s infinite ease-in-out both;
}

.sk-chase-dot:before {
  content: "";
  display: block;
  width: 25%;
  height: 25%;
  background-color: #1ecd98;
  border-radius: 100%;
  animation: sk-chase-dot-before 2s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
  animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2) {
  animation-delay: -1s;
}
.sk-chase-dot:nth-child(3) {
  animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4) {
  animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5) {
  animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6) {
  animation-delay: -0.6s;
}
.sk-chase-dot:nth-child(1):before {
  animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2):before {
  animation-delay: -1s;
}
.sk-chase-dot:nth-child(3):before {
  animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4):before {
  animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5):before {
  animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes sk-chase {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot {
  80%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  }
  100%,
  0% {
    transform: scale(1);
  }
}
</style>
