<template>
  <section class="comment-create">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      label-position="left"
      class="demo-ruleForm"
    >
      <el-form-item label="评论" prop="content">
        <el-input
          type="textarea"
          v-model="ruleForm.content"
          placeholder="请输入评论内容"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')">清空</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">{{
          comment_type === "comment" ? "评论" : "回复"
        }}</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    target_id: {
      type: String,
    },
    comment_type: {
      type: String,
      default() {
        return "comment";
      },
    },
    comment_id: {
      type: String,
    },
  },
  data() {
    return {
      ruleForm: {
        nickname: "",
        content: "",
      },
      rules: {
        content: [
          { required: true, message: "请输入评论", trigger: "blur" },
          {
            type: "string",
            min: 2,
            message: "评论不能少于2个字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.userInfo.nickname,
      commentCover: (state) => state.user.userInfo.cover,
    }),
  },
  methods: {
    ...mapActions({
      createComment: "comment/createComment",
      createReply: "reply/createReply",
    }),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            if (this.comment_type === "comment") {
              //  评论操作
              this.ruleForm.target_id = this.target_id;
              this.ruleForm.nickname = this.nickname;
              let res = await this.createComment(this.ruleForm);
              this.$emit("updateComment", res.data.data, "comment");
              this.$message({
                message: "评论成功",
                type: "success",
              });
            } else if (this.comment_type === "reply") {
              this.ruleForm.comment_id = this.comment_id;
              this.ruleForm.nickname = this.nickname;
              this.ruleForm.cover = this.cover;
              //  回复操作
              let res = await this.createReply(this.ruleForm);
              // 通知父组件更新
              this.$emit("updateReply", res.data.data, "reply");
            }
            // 重置表单
            this.resetForm("ruleForm");
          } catch (e) {
            console.log(e);
          }
        } else {
          this.$message({
            message: "表单验证失败!",
            type: "error",
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.comment-header {
  font-size: 28px;
  font-weight: 500;
  color: #2d8cf0;
  padding: 32px 0;
}
</style>

