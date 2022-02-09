<template>
  <div class="songSheet-item" :style="props.style">
    <div
      :class="{
        'no-transform': props.noTransform,
        'songSheet-item-first': !props.noTransform,
      }"
      @click.prevent="props.onClick($event, props.id)"
      :style="{ height: props.height, width: props.width }"
    >
      <img class="songSheet-item-img" :src="props.imgUrl" alt="" />
      <div class="songSheet-item-effect-data" v-if="props.isEffect">
        <span
          :class="props.iconClass"
          v-show="props.isIcon"
          :style="{ fontSize: props.iconFontSize, padding: props.padding }"
          >{{ playCount }}</span
        >
        <span v-show="!props.isIcon">{{ playCount }}</span>
      </div>
      <div class="songSheet-item-hover-center">
        <i class="iconfont icon-24gf-playCircle"></i>
      </div>
      <div class="songSheet-item-hover"></div>
    </div>
    <p class="songSheet-item-title" v-show="props.title">{{ props.title }}</p>
    <p class="songSheet-item-content" v-show="props.content">
      {{ props.content }}
    </p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

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
    style: Object,
    title: {
      type: String,
      default: "",
    },
    //下方的文字
    content: {
      type: String,
      default: "",
    },
    //是否需要图标
    isIcon: {
      type: Boolean,
      default: true,
    },
    //是否显示右下角的播放量
    isEffect: {
      type: Boolean,
      default: true,
    },
    //需要的图标类名
    iconClass: {
      type: String,
      default: "iconfont icon-touting",
    },
    //icon的大小
    iconFontSize: {
      type: String,
      default: "12px",
    },
    //每个歌单的id(必须传)
    id: {
      type: Number,
      required: true,
    },
    padding: {
      type: String,
    },
    height: {
      type: String,
      default: "12vw",
    },
    width: {
      type: String,
      default: "12vw",
    },
    noTransform: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let playCount = "0";
    if (props.number >= 100000000) {
      playCount = (props.number / 100000000).toFixed(1) + "亿";
    } else if (props.number >= 10000) {
      playCount = (props.number / 10000).toFixed(1) + "万";
    }
    return {
      props,
      playCount,
    };
  },
});
</script>

<style scoped>
/* 歌单样式 */
.songSheet-item {
  width: 12vw;
  min-width: 150px;
}

.songSheet-item-first,
.no-transform {
  width: 100%;
  height: 12vw;
  transition: transform 0.6s;
  position: relative;
  min-width: 150px;
  min-height: 150px;
}
.songSheet-item-img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.songSheet-item-hover {
  cursor: pointer;
  transition: opacity 0.6s;
  border-radius: 10px;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(53, 52, 52);
  opacity: 0;
  z-index: 1;
}
.songSheet-item-hover:hover {
  opacity: 0.5;
}
.no-transform:hover {
  transform: translateY(0px) !important;
}
.songSheet-item-first:hover {
  transform: translateY(-10px);
}

.songSheet-item-first:hover > .songSheet-item-img,
.no-transform:hover > .songSheet-item-img {
  filter: blur(0.8px);
}
.songSheet-item-title,
.songSheet-item-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: color 0.2s;
}
.songSheet-item-title {
  margin-left: 2.5%;
  width: 95%;
  padding-top: 7px;
  font-size: 13px;
}
.songSheet-item-title:hover {
  color: #1ecc94;
}
.songSheet-item-content {
  color: #7b7b7b;
  padding-top: 3px;
  font-size: 12px;
}

.songSheet-item-content:hover {
  color: #1ecc94;
}

.songSheet-item-effect-data {
  position: absolute;
  font-size: 12px;
  bottom: 3%;
  right: 3%;
  color: white;
  padding: 0.2vw 0.7vw;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}
.songSheet-item-effect-data > span {
  font-size: 12px;
}
.no-transform:hover > .songSheet-item-effect-data,
.songSheet-item-first:hover > .songSheet-item-effect-data {
  display: none;
}
.songSheet-item-hover {
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-transform:hover > .songSheet-item-hover-center,
.songSheet-item-first:hover > .songSheet-item-hover-center {
  display: block;
}
.songSheet-item-hover-center:hover + .songSheet-item-hover {
  opacity: 0.5;
}
.songSheet-item-hover-center {
  cursor: pointer;
  display: none;
  margin: auto;
  z-index: 2;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.3s;
  text-align: center;
  line-height: 50px;
}

.songSheet-item-hover-center > i {
  font-size: 60px;
  color: white;
}
.songSheet-item-hover-center > i:hover {
  color: #1ecf9c;
}
</style>
