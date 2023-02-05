<!--文章列表-->
<template>
  <section class="articles">
    <article class="article-list">
      <!-- 文章分类显示 -->
      <ul class="category" v-if="categoryList && categoryList.length > 0">
        <li
          class="category-item"
          v-for="(item, i) in categoryList"
          :key="item._id"
          :class="{ 'category-item-active': categoryIndex == i }"
          @click="changeCategory(item._id, i)"
        >
          {{ item.name }}
        </li>
      </ul>
      <!-- 文章组件-->
      <v-article-item :list="list" />

      <div class="page">
        <!-- 分页组件 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page.currentPage"
          :page-size="page.pageSize"
          layout="total, prev, pager, next"
          :total="page.total"
        ></el-pagination>
      </div>
    </article>

    <!-- 侧边栏 -->
    <v-main-sidebar />
  </section>
</template>

<script>
import VArticleItem from "../../components/article-item";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    VArticleItem,
    VMainSidebar: () => import("../../components/main-sidebar"),
  },
  name: "list",
  data() {
    return {
      list: [],
      page: {},
      currentPage: 1,
    };
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.category.categoryList,
      categoryIndex: (state) => state.category.categoryIndex,
      articleList: (state) => state.article.articleList,
    }),
  },
  async created() {
    await this.getCategoryList();
    this.getArticle();
  },
  watch: {
    $route(to, from) {
      this.getArticle();
    },
  },
  methods: {
    ...mapActions({
      getCategoryList: "category/list",
      getArticleList: "article/list",
    }),
    async getArticle() {
      const params = {
        currentPage: this.currentPage,
        pageSize: 4,
        category_id: this.$route.query.category_id,
        keywords: this.$route.query.keywords,
      };
      let res = await this.getArticleList(params);
      const { currentPage, articleList, total, pageSize } = res.data.data;
      this.list = articleList;
      this.page = { currentPage, pageSize, total };
      console.log(this.page);
    },
    changeCategory(id, i) {
      this.$store.commit("category/SET_CATEGORY_INDEX", i);
      // 保存索引到本地缓存
      localStorage.setItem("categoryIndex", i);
      this.$router.push({
        query: {
          category_id: id,
        },
      });
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(this.currentPage);
      this.getArticle();
    },
  },
};
</script>

<style scoped lang="less">
.category {
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  height: 64px;
  line-height: 64px;
  display: flex;
  border-bottom: 1px solid #f0f0f0;
}

.category-item {
  margin-left: 32px;
  cursor: pointer;
  color: #515a6e;
  font-size: 16px;
  font-weight: normal;

  &:hover {
    color: #2d8cf0;
  }
}

.category-item-active {
  color: #2d8cf0;
}

.articles {
  width: 70%;
  display: flex;
  min-height: 80vh;
  margin: 24px auto;
}

.article-list {
  flex: 1;
  margin-right: 32px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 2px 3px #f0f0f0;
  background: #fff;
}

@media screen and (min-width: 200px) and (max-width: 750px) {
  .articles {
    width: 100%;
  }

  .article-list {
    margin-right: 0;
  }
}
</style>