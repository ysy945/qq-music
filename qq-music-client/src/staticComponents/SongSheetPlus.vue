<template>
  <div
    @click="props.onClick($event, props.id)"
    class="songSheetPlus"
    :style="props.style"
  >
    <SongSheet
      :imgUrl="props.imgUrl"
      :number="props.number"
      :width="props.size"
      :height="props.size"
      :id="props.id"
      :style="{
        backgroundColor: '#EEEEEE',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        width: props.size,
      }"
      :noTransform="true"
    />
    <div
      class="songSheet-side"
      :style="{ height: props.size, ...props.sideStyle }"
    >
      <h3 class="songSheet-side-title">{{ props.title }}</h3>
      <h6 class="songSheet-side-text" v-show="props.content[0]">
        1 {{ props.content[0] }}
      </h6>
      <h6 class="songSheet-side-text" v-show="props.content[1]">
        2 {{ props.content[1] }}
      </h6>
      <h6 class="songSheet-side-text" v-show="props.content[2]">
        3 {{ props.content[2] }}
      </h6>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SongSheet from "./SongSheet.vue";

export default defineComponent({
  props: {
    //播放量
    number: {
      type: Number,
      default: 100,
    },
    //点击的回调函数
    onClick: Function,
    imgUrl: {
      type: String,
      required: true,
    },
    //图片的样式
    size: {
      type: String,
      default: "12vw",
    },
    //每个歌单的id(必须传)
    id: {
      type: Number,
      required: true,
    },
    params: Object,
    style: Object,
    sideStyle: Object,
    title: String,
    content: Array,
  },
  components: {
    SongSheet,
  },

  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style scoped>
.songSheetPlus {
  cursor: pointer;
  transition: transform 0.6s;
  display: flex;
}
.songSheet-side {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 15px;
  background-color: #eeeeee;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  min-height: 150px;
  min-width: 150px;
}
.songSheetPlus:hover {
  transform: translateY(-10px);
}
.songSheet-side-title {
  transition: color 0.2s;
  margin: 0;
  font-size: 20px;
}

.songSheet-side-title:hover {
  color: #1ecc94;
}

.songSheet-side-text {
  transition: color 0.2s;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 100;
  font-size: 12px;
  color: #787878;
  letter-spacing: 1px;
}
.songSheet-side-text:hover {
  color: #1ecc94;
}
</style>
