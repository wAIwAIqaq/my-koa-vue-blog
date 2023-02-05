<template>
  <section class="comment">
    <i class="el-icon-chat-line-round"></i>
    <div class="comment-header">评论列表</div>
    <ul class="comment-box" v-if="comment && comment.length > 0">
      <!-- 评论列表 -->
      <li class="comment-item" v-for="item in comment" :key="item._id">
        <div class="comment-avatar">
          <el-avatar
            v-if="item.cover"
            fit="cover"
            :src="item.cover"
          ></el-avatar>
          <el-avatar
            v-else
            fit="cover"
            src="http://localhost:5000/images/unavatar.png"
          ></el-avatar>
        </div>
        <div class="comment-info">
          <!-- 评论者姓名 -->
          <h1 class="comment-username">{{ item.nickname }}</h1>
          <p class="comment-content">{{ item.content }}</p>
          <!-- 回复列表 -->
          <div
            class="comment-reply"
            v-if="item.ReplyList && item.ReplyList.length > 0"
          >
            <ul class="comment-box" style="margin-left: 50px">
              <li
                class="comment-item"
                v-for="reply in item.ReplyList"
                :key="reply._id"
              >
                <div class="comment-avatar">
                  <el-avatar
                    v-if="reply.cover"
                    fit="cover"
                    :src="reply.cover"
                  ></el-avatar>
                  <el-avatar
                    v-else
                    fit="cover"
                    src="http://localhost:5000/images/unavatar.png"
                  ></el-avatar>
                </div>
                <div class="comment-info">
                  <h1 class="comment-username">
                    来自「{{ reply.nickname }}」的回复
                  </h1>
                  <p class="comment-content">{{ reply.content }}</p>
                </div>
              </li>
            </ul>
          </div>
          <el-button
            size="mini"
            class="comment-reply-btn"
            style="margin: 10px 50px"
            @click="reply(item._id, item.nickname)"
          >
            点击回复
          </el-button>
        </div>
      </li>
    </ul>
    <ul
      class="load-more-comment"
      @click="loadMoreComment"
      v-if="page && page.comment_currentPage < page.comment_total_pages"
    >
      <i class="el-icon-bottom" style="color: #2d8cf0">加载更多评论...</i>
    </ul>
    <!-- 回复弹窗 -->
    <el-dialog :title="replyNickName" :visible.sync="show">
      <v-comment-create
        @updateReply="updateReply"
        :comment_type="commentType"
        :comment_id="comment_id"
      />
    </el-dialog>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
import VCommentCreate from "./comment-create";

export default {
  props: {
    target_id: {
      type: String,
    },
    target_type: {
      type: String,
      default() {
        return "article";
      },
    },
  },
  computed: {
    ...mapState({
      comment: (state) => state.comment.commentList,
      page: (state) => state.comment.commentPage,
    }),
  },
  components: {
    VCommentCreate,
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
      },
      show: false,
      // 评论id
      comment_id: "",
      // 回复昵称
      replyNickName: "",
      commentType: "reply",
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions({ getTargetComments: "comment/getTargetComments" }),
    // 回复评论
    reply(id, name) {
      this.show = true;
      this.comment_id = id;
      this.replyNickName = `回复「${name}」:`;
    },
    updateReply(newReply, type) {
      // 更新评论
      this.show = !this.show;
      // 通知父组件更新
      this.$emit("updateComment", newReply, type);
    },
    async loadMoreComment() {
      // 加载更多评论
      if (
        this.page &&
        this.page.comment_currentPage !== this.page.comment_total_pages
      ) {
        this.currentPage++;
        // 获取该目标文章下所有的评论
        const res = await this.getTargetComments({
          target_id: this.target_id,
          currentPage: this.currentPage,
        });
        const { currentPage, total, total_pages, pageSize } = res.data.data;
        const newCommentList = [...this.comment, ...res.data.data.commentList];
        this.$store.commit("comment/SET_COMMENT_LIST", newCommentList);
        this.$store.commit("comment/SET_COMMENT_PAGE", {
          comment_currentPage: currentPage,
          comment_total: total,
          comment_total_pages: total_pages,
          comment_pageSize: pageSize,
        });
      } else {
        this.$message({
          message: "没有更多评论了",
          type: "warining",
        });
      }
    },
  },
};
</script>
<style scoped lang='less'>
.comment-header {
  font-size: 25px;
  margin-bottom: 20px;
}
.load-more-comment {
  text-align: center;
  margin: 32px 0;
  font-size: 18px;
  color: #2d8cf0;
  cursor: pointer;
}
.el-icon-chat-line-round {
  display: inline-block;
  float: left;
  font-size: 32px;
}
</style>

