<template>
  <div
    :class="{ button: true, 'button-checked': props.checked }"
    :style="props.style"
    @click="props.onClick($event, props.params)"
  >
    <i :class="props.iconClass"></i>
    <span>{{ props.text }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    iconClass: {
      type: String,
      default: "iconfont icon-24gl-play",
    },
    text: {
      type: String,
      default: "播放全部",
    },
    checked: {
      type: Boolean,
      default: false,
    },
    style: Object,
    params: Object,
    onClick: Function,
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style scoped>
.button {
  transition: background-color 0.3s;
  width: 110px;
  height: 32px;
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  background-color: #e1e1e1;
}
.button:hover {
  background-color: #dadada;
}

.button-checked {
  background-image: linear-gradient(to right, #54dabf, #1ecc94);
}
.button-checked > i,
.button-checked > span {
  color: white !important;
}

.button > i {
  font-weight: 600;
  font-size: 18px;
  vertical-align: middle;
}

.button > span {
  font-size: 13px;
  padding-left: 5px;
}
</style>
