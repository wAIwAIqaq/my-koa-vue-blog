<!--文章列表项-->
<template>
  <section>
    <div class="article-empty" v-if="list && list.length === 0">暂无文章~</div>
    <ul class="article-box" v-if="list && list.length > 0">
      <li
        class="articles-item"
        v-for="item in list"
        :key="item._id"
        @click="toArticleDetail(item._id)"
      >
        <div class="articles-item-info">
          <!-- 文章标题 -->
          <h1 class="articles-item-title">{{ item.title }}</h1>
          <!-- 文章描述 -->
          <div class="articles-item-description">{{ item.description }}</div>
          <ul class="articles-item-intro">
            <!-- 分类 -->
            <li class="articles-item-category">{{ item.category_id.name }}</li>
            <!-- 文章作者 -->
            <li class="articles-item-author">
              <i class="el-icon-user"></i>
              {{ item.author }}
            </li>
            <!-- 文章浏览数 -->
            <li class="articles-item-browse">
              <i class="el-icon-view"></i>
              {{ item.browse }}
            </li>
          </ul>
        </div>
        <!-- 文章配图 -->
        <div class="articles-images">
          <img v-lazy="item.cover" alt="" />
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  name: "ArticleItem",
  methods: {
    toArticleDetail(_id) {
      this.$router.push(`/article/detail/?id=${_id}`);
    },
  },
};
</script>

<style scoped lang="less">
.article-empty {
  text-align: center;
  padding: 32px 0;
  color: #515a6e;
  font-size: 16px;
}

.articles-item {
  cursor: pointer;
  padding: 32px;
  display: flex;
  border-bottom: 1px solid #f6f6f6;
  transition: 0.12s ease-in;

  &:hover {
    background: #f6f6f6;
  }

  &:hover .articles-item-title {
    color: #2d8cf0;
  }
}

.articles-item-info {
  flex: 1;
}

.articles-item-title {
  color: #17233d;
  font-size: 26px;
  font-weight: 500;
}

.articles-item-description {
  color: #808695;
  font-size: 18px;
  padding: 24px 0;
}

.articles-item-intro {
  display: flex;
  align-items: center;
}

.articles-item-intro li {
  display: flex;
  align-items: center;
  margin-right: 32px;
  font-size: 16px;
  color: #9ea7b4;
  white-space: nowrap;
}

.articles-item-intro .articles-item-category {
  padding: 5px 32px;
  font-size: 16px;
  color: #409eff;
  border-radius: 96px;
  background: rgba(51, 119, 255, 0.1);
}

.articles-images {
  width: 100px;
  margin-left: 32px;

  & img {
    width: 100%;
    border-radius: 6px;
  }
}
</style>
