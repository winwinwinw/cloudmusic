<template>
  <div>
    <van-nav-bar
      :title="$route.meta.title"
      fixed
    >
      <template #left>
        <van-icon name="arrow-left" size="0.7rem" color="#000" @click="$router.replace('/layout/home')"/>
      </template>
    </van-nav-bar>
    <div>
      <van-search
        v-model="kw"
        :placeholder="searchHotVal"
        show-action
        @cancel="kw=''"
        @input="searchChangeFn"
        @search="kw=searchHotVal"
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
        >{{ hots.first }}</span>
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
          v-for="(item,index) in searchList"
          :key="index"
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
      kw: '', // 输入框中的关键词
      loading: false,
      finished: false,
      hotSearchList: [], // 热搜列表
      searchList: [], // 搜索列表
      timer: null, // 用来清除定时器
      page: 1, // 页数,默认为1页
      searchHotVal: this.$route.query.searchHotVal// 推荐热搜关键词
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
      this.finished = false
      clearTimeout(this.timer) // 清除定时器
      if (this.kw.length === 0) { // 判断关键词是否为空,为空则清空搜索列表 阻止发送请求
        this.searchList = []
        return
      }
      this.timer = setTimeout(async () => {
        const res = await this.searchFn() // 获取搜索列表
        this.searchList = res.data.result.songs
      }, 100)
    },
    async keyWordInputFn (kwInput) { // 关键词填入
      this.page = 1
      this.finished = false
      this.kw = kwInput // 填入关键词
      const res = await this.searchFn() // 获取搜索列表
      this.searchList = res.data.result.songs
    },
    async searchFn () { // 因为要多次调用,所以将searchListAPI封装
      return await searchListAPI({
        keywords: this.kw,
        limit: 10,
        offset: (this.page - 1) * 10
      })
    },
    async onLoad (keyWord) {
      this.page++
      const res = await this.searchFn(keyWord)
      if (this.searchList.length + 10 >= res.data.result.songCount) {
        this.finished = true
        return
      }
      this.searchList = [...this.searchList, ...res.data.result.songs] // 将新数据与旧数据合并
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
