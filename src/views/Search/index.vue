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
      kw: '', // 输入框中的关键词
      loading: false,
      finished: false,
      /* List 组件通过 loading 和 finished 两个变量控制加载状态，
      当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true。
      此时可以发起异步操作并更新数据，
      数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。 */
      hotSearchList: [], // 热搜列表
      searchList: [], // 搜索列表
      timer: null, // 用来清除定时器
      page: 1 // 页数,默认为1页
    }
  },
  components: {
    MusicItem
  },
  async created () {
    const res = await hotSearchListAPI()
    this.hotSearchList = res.data.result.hots // 在创建阶段调用该方法(hotSearchListAPI)获取热搜列表
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
      this.timer = setTimeout(async () => { // 设置定时器:防止短时间内多次发送请求
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
      return await searchListAPI({ // 在调用searchListAPI之后会返回一个promise对象,所以需要return
        keywords: this.kw,
        limit: 10,
        offset: (this.page - 1) * 10 // 偏移量,用来控制页数 (this.page - 1) * 10 为固定公式
      })
    },
    async onLoad (keyWord) { // 向下滚动时触发滚动事件 并使页数加一 在重新调用searchListAPI 更新搜索列表
      this.page++
      const res = await this.searchFn(keyWord)
      if (this.searchList.length + 30 >= res.data.result.songCount) { // 获取搜索的歌曲最多为300,当搜索列表的长度更新到300之后会出现key值重复的情况,所以提前结束更新
        this.finished = true
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
