<template>
  <div
    :class="{ navItem: true, 'navItem-checked': props.checked }"
    @click="props.onClick($event, props.params)"
    :style="props.style"
  >
    <i :class="props.iconClass"></i>
    <span class="navItem-text">{{ props.text }}</span>
    <i
      id="navItem-play"
      class="iconfont icon-ziyuanldpi"
      v-show="props.isPlay"
    ></i>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    iconClass: {
      type: String,
    },
    onClick: {
      type: Function,
    },
    style: {
      type: Object,
    },
    isPlay: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "推荐",
    },
    params: Object,
  },
  setup(props) {
    return { props };
  },
});
</script>

<style scoped>
.navItem {
  cursor: pointer;
  width: 155px;
  height: 30px;
  margin: 0px auto;
  border-radius: 5px;
  line-height: 28px;
}
.navItem > i {
  padding: 0 10px;
  vertical-align: bottom;
  color: black;
  font-weight: bolder;
  font-size: 17px;
}
/* .navItem > #navItem-play {
  color: #1ecc94;
} */
#navItem-play {
  color: #ff6664;
}
.navItem:hover {
  background-color: #d9d9d9;
}

.navItem-checked {
  background-image: linear-gradient(to right, #54dabf, #1ecc94);
}
.navItem-checked > span,
.navItem-checked > i {
  color: #d2f6ee !important;
}

.navItem-text {
  font-size: 13px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 500;
}
#navItem-play {
  padding: 0 0 0 65px;
}
</style>
