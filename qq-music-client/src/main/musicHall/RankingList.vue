<template>
  <div class="rankingList">
    <ul class="rankingList-selected-songList">
      <li v-for="p in state.rankingLists.slice(0, 4)" :key="p.id">
        <SongSheetPlus
          size="12vw"
          :content="[p.tracks[0], p.tracks[1], p.tracks[2]]"
          :sideStyle="{ width: '14vw' }"
          :imgUrl="p.picUrl"
          :number="p.playCount"
          :id="p.id"
          :title="p.name"
          :onClick="songSheetClick"
        />
      </li>
    </ul>

    <p class="rankingList-selected-title">特色榜</p>
    <ul class="rankingList-selected-songList">
      <li v-for="p in state.rankingLists.slice(4, 16)" :key="p.id">
        <SongSheet
          :imgUrl="p.picUrl"
          :title="p.name"
          :number="p.playCount"
          :id="p.id"
          :style="{ width: '12.5vw' }"
          height="12.5vw"
          width="12.5vw"
          :onClick="songSheetClick"
        />
      </li>
    </ul>

    <p class="rankingList-selected-title">全球榜</p>
    <ul class="rankingList-selected-songList">
      <li v-for="p in state.rankingLists.slice(16, 35)" :key="p.id">
        <SongSheet
          :imgUrl="p.picUrl"
          :title="p.name"
          :number="p.playCount"
          :id="p.id"
          :style="{ width: '12.5vw' }"
          height="12.5vw"
          width="12.5vw"
          :onClick="songSheetClick"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import SongSheetPlus from "../../staticComponents/SongSheetPlus.vue";
import SongSheet from "../../staticComponents/SongSheet.vue";
import rankingListGet from "../../send/rankingListGet";

export default defineComponent({
  components: {
    SongSheetPlus,
    SongSheet,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = store.state;
    if (state.rankingLists.length === 0) {
      store.commit("setLoadState", false);
      rankingListGet((result) => {
        store.commit("setRankingLists", result);
        store.commit("setLoadState", true);
        store.commit("backToTop");
      });
    }

    function songSheetClick(event, id) {
      router.push(`/songSheetDetail/${id}`);
    }
    return {
      state,
      store,
      songSheetClick,
    };
  },
});
</script>

<style>
.rankingList-selected-songList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.rankingList-selected-songList > li {
  margin-bottom: 20px;
}
.rankingList-selected-title {
  font-size: 22px;
  font-weight: 500;
}
</style>
