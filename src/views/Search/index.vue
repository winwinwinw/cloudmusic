<template>
  <div>
    <div>
      <van-search
        v-model="kw"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="kw=''"
        @input="searchChangeFn"
      />
    </div>

    <!-- 搜索容器 -->
      <div class="search_wrap" v-if="kw.length === 0 || hotSearchList.length === 0">
        <!-- 标题 -->
        <p class="hot_title">热门搜索</p>
        <!-- 热搜关键词容器 -->
        <div class="hot_name_wrap">
          <!-- 每个搜索关键词 -->
          <span
            class="hot_item"
            v-for="(hots,index) in hotSearchList"
            :key="index"
            @click="keyWordInputFn(hots.first) "
          >{{ hots.first}}</span>
        </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad(kw)"
        offset="30"
      >
        <MusicItem
          v-for="item in searchList"
          :key="item.id"
          :name="item.name"
          :id="item.id"
          :albumName="item.alia[0]"
          :singerName="item.ar[0].name"
        ></MusicItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchListAPI, searchListAPI } from '../../api'
import MusicItem from '../../components/MusicItem'

export default {
  data () {
    return {
      kw: '',
      loading: false,
      finished: false,
      hotSearchList: [],
      searchList: [],
      timer: null,
      page: 1
    }
  },
  components: {
    MusicItem
  },
  async created () {
    const res = await hotSearchListAPI()
    this.hotSearchList = res.data.result.hots
  },
  methods: {
    async searchChangeFn () { // 搜索框内容改变时触发,关键词填入时不触发
      this.page = 1
      clearTimeout(this.timer)
      if (this.kw.length === 0) {
        this.searchList = []
        return
      }
      this.timer = setTimeout(async () => {
        const res = await this.searchFn()
        this.searchList = res.data.result.songs
      }, 100)
    },
    async keyWordInputFn (kwInput) { // 关键词填入
      this.page = 1
      this.kw = kwInput
      const res = await this.searchFn()
      this.searchList = res.data.result.songs
    },
    async searchFn () {
      return await searchListAPI({
        keywords: this.kw,
        limit: 20,
        offset: (this.page - 1) * 20
      })
    },
    async onLoad (keyWord) {
      this.page++
      const res = await this.searchFn(keyWord)
      console.log(res.data.result.songCount)
      if (this.searchList.length >= res.data.result.songCount) {
        this.finished = true
      }
      this.searchList = [...this.searchList, ...res.data.result.songs]
      this.loading = false
    }
  }

}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 10px;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 12px;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 10px 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 32px;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 0 14px;
  font-size: 14px;
  line-height: 32px;
  color: #333;
  /*border-color: #d3d4da;*/
  border-radius: 32px;
  border: 1px solid #d3d4da;
}
</style>
