<template>
  <section>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm create-article"
      label-width="100px"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="文章标题" />
      </el-form-item>
      <el-form-item label="文章简介" prop="description">
        <el-input v-model="ruleForm.description" placeholder="文章简介" />
      </el-form-item>
      <el-form-item label="文章关键字" prop="keywords">
        <el-input v-model="ruleForm.keywords" placeholder="文章关键字" />
      </el-form-item>
      <el-form-item label="文章分类" prop="category_id">
        <template>
          <el-select
            v-if="categoryList && categoryList.length > 0"
            v-model="ruleForm.category_id"
          >
            <el-option
              v-for="(item, index) in categoryList"
              :value="item.name"
              :key="index"
              >{{ item.name }}</el-option
            >
          </el-select>
          <el-button style="margin-left:10px" type="text" @click="showCreateCategoryDialog"
            >创建分类</el-button
          >
        </template>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover" style="margin-bottom: 20px">
        <div class="cover">
          <div class="upload">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:5000/api/v1/article/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              name="cover"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
      </el-form-item>
      <el-form label="文章内容" prop="content">
        <mavon-editor
          v-model="ruleForm.content"
          :ishljs="true"
          ref="md"
          class="md-editor"
        ></mavon-editor>
      </el-form>
      <el-form>
        <el-button class="btn" @click="handleReset('ruleForm')" plain
          >重置</el-button
        >
        <el-button
          class="btn"
          type="primary"
          @click="handleSubmit('ruleForm')"
          style="margin-left: 8px"
          plain
          >提交</el-button
        >
      </el-form>
    </el-form>
    <createCategoryDialog
      :dialog-visible="createCategoryDialogVisible"
      :category-list="categoryList"
      @close-category-dialog="closeCategoryDialog"
    />
    {{ createCategoryDialogVisible }}
  </section>
</template>
<script>
import { mapActions, mapState } from "vuex";
import CreateCategoryDialog from "./createCategory.vue";
export default {
  components: {
    CreateCategoryDialog,
  },
  data() {
    const validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入文章标题"));
      } else {
        callback();
      }
    };
    const validateDescription = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入文章简介"));
      } else {
        callback();
      }
    };
    const validateContent = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入文章内容"));
      } else {
        callback();
      }
    };
    const validateKeywords = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入文章关键字"));
      } else {
        callback();
      }
    };
    const validateCategory_id = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择文章分类"));
      } else {
        callback();
      }
    };
    return {
      token: "",
      id: this.$route.params.id,
      detail: null,
      imageUrl: "",
      ruleForm: {
        title: "",
        category_id: "",
        cover: "",
        description: "",
        keywords: "",
        content: "",
      },
      rules: {
        title: [{ validator: validateTitle, trigger: "blur" }],
        description: [{ validator: validateDescription, trigger: "blur" }],
        keywords: [{ validator: validateKeywords, trigger: "blur" }],
        content: [{ validator: validateContent, trigger: "blur" }],
        category_id: [{ validator: validateCategory_id, trigger: "blur" }],
      },
      createCategoryDialogVisible: false,
    };
  },
  created() {
    // 获取分类列表
    this.getCategoryList();
    this.getAuthor();
  },
  computed: {
    ...mapState({ categoryList: (state) => state.category.categoryList }),
    ...mapState({ author: (state) => state.user.userInfo.nickname }),
  },
  methods: {
    ...mapActions({
      getCategoryList: "category/articleList",
      createArticle: "article/createArticle",
    }),
    getAuthor() {
      this.ruleForm.author = this.author;
    },
    // 上传图片失败
    handleAvatarError(response) {
      this.$message.error("上传失败!");
      console.log(response);
    },
    handleAvatarSuccess(response, file, fileList) {
      const imageUrl = `http://localhost:5000/images/${response.data}`;
      this.imageUrl = imageUrl;
      this.ruleForm.cover = imageUrl;
      this.$message.success("上传成功");
    },
    // 提交
    handleSubmit(ruleForm) {
      this.$refs[ruleForm].validate(async (valid) => {
        if (valid) {
          // 创建文章
          this._createArticle();
        } else {
          this.$message.error("请完成表单!");
        }
      });
    },
    handleReset(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    // 创建文章业务逻辑
    async _createArticle() {
      let res = await this.createArticle(this.ruleForm);
      if (res.data.code === 200) {
        this.$message.success("创建文章成功");
        this.$router.push("/home");
      } else {
        this.$message.error(`${res.data.msg}`);
      }
    },

    showCreateCategoryDialog() {
      this.createCategoryDialogVisible = true;
    },

    closeCategoryDialog() {
      this.createCategoryDialogVisible = false;
    },
  },
};
</script>
<style scoped lang="less">
.create-article {
  margin: 20px auto;
  padding: 30px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 70%;
  min-height: 1300px;
  border-radius: 10px;
  background-color: #ffffff;
}
.cover {
  display: flex;
}

.cover .upload {
  margin-right: 32px;
}
.avatar-uploader {
  border: 1px dashed #8c939d;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding-bottom: -30px;
  &:hover {
    border-color: #2d8cf0;
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: auto;
  height: auto;
  max-width: 300px;
  max-height: 100%;
  display: inline-block;
  margin-bottom: -20px;
}
.md-editor {
  height: 900px;
}
.btn {
  margin: 20px;
}
</style>
