<!--文章详情-->
<template>
  <section class="article-detail">
    <div class="article-container">
      <h1 class="article-title">{{ article.title }}</h1>
      <ul class="article-intro">
        <li class="articles-item-category">{{ article.category }}</li>
        <li>
          <!-- 文章作者 -->
          <i class="el-icon-user"></i>
          {{ article.author }}
        </li>
        <li>
          <!-- 文章浏览数 -->
          <i class="el-icon-view"></i>
          {{ article.browse }}
        </li>
        <li>
          <!-- 评论数 -->
          <i class="el-icon-chat-round"></i>
          {{ article.commentTotal }}
        </li>
      </ul>
      <div class="article-content">
        <!-- 内容显示组件 -->
        <mavon-editor
          style="height: 100%"
          :ishljs="true"
          v-model="article.content"
          :defaultOpen="'preview'"
          :editable="false"
          :subfield="false"
          :toolbarsFlag="false"
        />
      </div>

      <!-- 新建评论-->
      <div class="comment-header">
        <i class="el-icon-edit-outline"></i>
        欢迎评论
      </div>
      <v-comment-create
        :target_id="article._id"
        :target_type="targetType"
        @updateComment="updateComment"
      />
      <!-- 评论列表 -->
      <div>
        <v-comment-list :target_id="id" @updateComment="updateComment" />
      </div>
    </div>
    <!-- 侧边栏  -->
    <v-main-sidebar />
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {
    VMainSidebar: () => import("../../components/main-sidebar"),
    VCommentCreate: () => import("../../components/comment-create"),
    VCommentList: () => import("../../components/comment-list"),
  },
  name: "detail",
  data() {
    return {
      article: {
        content: "",
      },
      id: this.$route.query.id,
      targetType: "article",
      commentList: [],
    };
  },
  created() {
    this._getArticleDetail();
  },
  computed: {
    ...mapState({ commentCover: (state) => state.user.userInfo.cover }),
  },
  methods: {
    updateComment(newComment, type) {
      if (type === "comment") {
        newComment.cover = this.commentCover;
        this.commentList.unshift(newComment);
      } else if (type === "reply") {
        // 更新回复
        this._getArticleDetail();
      }
    },
    ...mapActions({
      getArticleDetail: "article/detail",
    }),
    async _getArticleDetail() {
      let res = await this.getArticleDetail({ id: this.id });
      let {
        ArticleDetail,
        CommentList,
        comment_currentPage,
        comment_pageSize,
        comment_total,
        comment_total_pages,
      } = res.data.data;
      this.commentList = CommentList;
      this.article = ArticleDetail;
      this.article.category = this.article.category_id.name;
      this.article.commentTotal = comment_total;
      // 设置评论列表
      this.$store.commit("comment/SET_COMMENT_LIST", CommentList);
      this.$store.commit("comment/SET_COMMENT_PAGE", {
        comment_currentPage,
        comment_total,
        comment_total_pages,
        comment_pageSize,
      });
    },
  },
};
</script>

<style scoped lang="less">
.article-detail {
  width: 70%;
  margin: 24px auto;
  min-height: 80vh;
  border-radius: 6px;
  box-sizing: border-box;
  display: flex;
}

.article-container {
  box-sizing: border-box;
  flex: 1;
  padding: 32px;
  margin-right: 32px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 2px 3px #f0f0f0;
  background: #fff;
}

.article-title {
  color: #17233d;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
}

.article-intro {
  color: #515a6e;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
}

.article-intro li {
  display: flex;
  align-items: center;
  margin-right: 24px;
  font-size: 16px;
  color: #9ea7b4;
  white-space: nowrap;
}

li.articles-item-category {
  height: 28px;
  line-height: 28px;
  padding: 0 24px;
  font-size: 16px;
  color: #409eff;
  border-radius: 64px;
  background: rgba(51, 119, 255, 0.1);
}

.comment-header {
  font-size: 28px;
  font-weight: 500;
  color: #2d8cf0;
  padding: 32px 0 16px;
  display: flex;
  align-items: center;
}

@media screen and (min-width: 200px) and (max-width: 750px) {
  .article-detail {
    width: 100%;
  }

  .article-container {
    margin-right: 0;
  }
}
</style>