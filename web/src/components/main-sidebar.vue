<template>
  <article class="sidebar">
    <div class="sidebar-box" v-if="advertiseList && advertiseList.length > 0">
      <div class="sidebar-header">
        <div class="sidebar-header-title">
          <i class="el-icon-s-grid" style="color: #2d8cf0"></i>
          广告
        </div>
      </div>
      <div class="sidebar-box-content">
        <ul>
          <li class="sidebar-box-content-item">
            <a href="http://www.baidu.com" target="_blank">
              <h1>百度一下</h1>
            </a>
            <span></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="sidebar-box">
      <div class="sidebar-header">
        <div class="sidebar-header-title">
          <i class="el-icon-paperclip" style="color: #2d8cf0"></i>
          链接
        </div>
      </div>
      <div class="sidebar-box-content">
        <ul>
          <li class="sidebar-box-content-item">
            <a href="https://github.com/wAIwAIqaq" target="_blank">
              <div>
                <i class="el-icon-link"></i>
                Github
              </div>
            </a>
            <span></span>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "main-sidebar",
  data() {
    return {
      advertiseList: [],
    };
  },
};
</script>

<style scoped lang="less">
.sidebar {
  width: 350px;
}

@media screen and (min-width: 200px) and (max-width: 750px) {
  .sidebar {
    display: none;
  }
}

.sidebar-box {
  margin-bottom: 32px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 1px 2px 3px #f0f0f0;
  background: #fff;
}

.sidebar-box-content {
  padding: 0 32px;
}

.sidebar-box-content-item {
  cursor: pointer;
  display: flex;
  margin: 24px 0;
  align-items: center;
  justify-content: space-between;
  color: #657180;

  &:hover {
    color: #2d8cf0;
  }
}

.sidebar-box-content-item h1 {
  font-size: 16px;
  font-weight: 400;
}

.sidebar-box-content-item a {
  flex: 1;
  color: #657180;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: #2d8cf0;
  }
}

.sidebar-box-content-item span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-top: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.icon {
  margin-right: 10px;
}
</style>
