<template>
<div>
  <div class="header">
    <van-icon
      name="arrow-left"
      size="20"
      class="left-icon"
      @click="$router.back()"
      color="black"
    />
  </div>
<MusicItem
  v-for="(item,index) in songList"
  :key="index"
  :name="item.al.name"
  :id="item.al.id"
  :albumName="item.alia[0]"
  :singerName="item.ar[0].name"
></MusicItem>
</div>
</template>

<script>
import MusicItem from '../../components/MusicItem'
import { getSongListAPI } from '../../api'
export default {
  name: 'index',
  data () {
    return {
      songListId: this.$route.query.songListID,
      songList: []
    }
  },
  components: {
    MusicItem
  },
  async created () {
    const res = await getSongListAPI({
      songListId: this.songListId
    })
    this.songList = res.data.songs
    console.log(res)
  }
}
</script>

<style scoped>
.header {
  height: 50px;
}
.left-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  z-index: 10001;
  color: #fff;
}

</style>
