<template>
<div>
  <van-cell-group>
    <van-cell
      center
      :title="name"
      :label="singerName+(albumName !== undefined ?'-'+albumName:'')"
    >
      <template v-slot:right-icon>
        <van-icon name="play-circle-o" size="0.6rem"/>
      </template>
    </van-cell>
  </van-cell-group>
</div>
</template>

<script>
export default {
  name: 'MusicItem',
  props: {
    name: String, // 歌名
    id: Number, // ID
    albumName: String, // 专辑名
    singerName: String // 歌手名
  }
}
</script>

<style scoped>

</style>
