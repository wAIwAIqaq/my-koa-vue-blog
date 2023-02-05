<template>
  <el-dialog
    :visible.sync="visible"
    :beforeClose="closeDialog"
    :close-on-click-modal="true"
  >
    <el-form>
      <el-form-item label="分类名称">
        <el-input v-model="categoryName"></el-input>
      </el-form-item>
      <el-form-item>
        <template>
          <div style="display:flex;gap:10px;flex-wrap: wrap;">
            <el-tag v-for="item in categoryList">{{ item.name }}</el-tag>
          </div>
        </template>
      </el-form-item>
    </el-form>
    <div style="display:flex;flex-direction: row-reverse;">
      <el-button type="primary" size="small" @click="createCategoryHandler"
        >提交</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    categoryList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: false,
      categoryName: "",
    };
  },
  watch: {
    dialogVisible(newVal) {
      this.visible = newVal;
    },
  },
  methods: {
    ...mapActions({
      createCategory: "category/createCategory",
    }),
    closeDialog() {
      this.$emit("close-category-dialog", false);
    },
    async createCategoryHandler() {
      const res = await this.createCategory({
        name: this.categoryName,
        keywords: "",
      });
      if (res.data && res.data.code === 200) {
        this.$message.success("分类创建成功");
        this.closeDialog();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
