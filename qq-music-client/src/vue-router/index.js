import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../main/Home.vue";
import MusicHall from "../main/musicHall/MusicHall.vue";
import Video from "../main/Video.vue";
import RadioSta from "../main/RadioSta";
import AuditionList from "../main/AuditionList.vue";
import PlayedRecently from "../main/PlayedRecently.vue";
import LocalAndDownload from "../main/LocalAndDownload.vue";
import UserLike from "../main/UserLike.vue";
import SongSheetDetail from "../main/SongSheetDetail.vue";
import Songs from "../main/Songs.vue";
import Commits from "../main/Commits.vue";
import Search from "../main/search/Search.vue";
import SearchSongs from "../main/search/Songs.vue";
import SearchVideo from "../main/search/Video.vue";
import SearchSinger from "../main/search/Singer.vue";
import SearchAlbum from "../main/search/Album.vue";
import SearchSongLists from "../main/search/SongLists.vue";
import MusicHallSelected from "../main/musicHall/Selected.vue";
import MusicHallRankingList from "../main/musicHall/RankingList.vue";
import MusicHallSinger from "../main/musicHall/Singer.vue";
import MusicHallClassifiedSongList from "../main/musicHall/ClassifiedSongList.vue";
import MusicHallAudioStation from "../main/musicHall/AudioStation.vue";
const routes = [
  {
    path: "/",
    redirect: "/home",
    // children: [
    //   {
    //     path: "/",
    //     component: Content,
    //   },
    // ],
    // children: [
    //   {
    //     path: "/",
    //     component: Content,
    //   },
    // ],
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/musicHall",
    component: MusicHall,
    children: [
      {
        path: "",
        component: MusicHallSelected,
      },
      {
        path: "rankingList",
        component: MusicHallRankingList,
      },
      {
        path: "singer",
        component: MusicHallSinger,
      },
      {
        path: "classifiedSongList",
        component: MusicHallClassifiedSongList,
      },
      {
        path: "audioStation",
        component: MusicHallAudioStation,
      },
    ],
  },
  {
    path: "/video",
    component: Video,
  },
  {
    path: "/radioSta",
    component: RadioSta,
  },
  {
    path: "/userLike",
    component: UserLike,
  },
  {
    path: "/localAndDownload",
    component: LocalAndDownload,
  },
  {
    path: "/playedRecently",
    component: PlayedRecently,
  },
  {
    path: "/auditionList",
    component: AuditionList,
  },
  {
    path: "/songSheetDetail/:id",
    component: SongSheetDetail,
    children: [
      {
        path: "",
        component: Songs,
      },
      {
        path: "commits",
        component: Commits,
      },
    ],
  },
  {
    path: "/search",
    component: Search,
    children: [
      {
        path: "",
        component: SearchSongs,
      },
      {
        path: "video",
        component: SearchVideo,
      },
      {
        path: "singer",
        component: SearchSinger,
      },
      {
        path: "album",
        component: SearchAlbum,
      },
      {
        path: "songLists",
        component: SearchSongLists,
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
