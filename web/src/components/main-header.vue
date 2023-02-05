<template>
  <header class="header-wrap">
    <section class="header-inner">
      <div class="logo">
        <div class="logo-box" @click="toLink('/')">
          <img src="../assets/images/logo.png" alt="logo" />
        </div>
      </div>

      <div class="nav">
        <ul class="nav-box">
          <li
            v-for="(item, index) in nav"
            @click="handleClick(index)"
            :key="item.id"
          >
            <router-link
              :class="
                index === currentIndex ? 'nav-item nav-item-active' : 'nav-item'
              "
              :to="item.router"
              >{{ item.name }}</router-link
            >
          </li>
        </ul>
      </div>

      <div class="search">
        <el-input
          size="default"
          @keyup.enter.native="search"
          prefix-icon="el-icon-search"
          v-model="keyword"
          placeholder="搜索文章.."
          style="width: auto"
        />
      </div>

      <div class="login" v-if="!userInfo">
        <router-link to="/login">登录</router-link>
        <span>|</span>
        <router-link to="/register">注册</router-link>
      </div>
      <div class="userInfo" v-else>
        <el-dropdown @command="handleCommand">
          <a href="javascript:;">
            <img
              class="userAvatar"
              src="../assets/images/unavatar.png"
              alt=""
              v-if="!userInfo.cover" />
            <img class="userAvatar" :src="userInfo.cover" alt="" v-else
          /></a>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" command="/myPage"
              >我的主页</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-edit" command="/writeArticle"
              >写文章</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-setting" command="/setting"
              >设置</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-warning" command="/about"
              >关于</el-dropdown-item
            >
            <el-dropdown-item
              icon="el-icon-d-arrow-right"
              divided
              @click.native="logout"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </section>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  data() {
    return {
      keyword: "",
      currentIndex: 0,
      nav: [
        {
          name: "文章",
          router: "/home",
        },
        {
          name: "关于",
          router: "/about",
        },
      ],
    };
  },
  methods: {
    toLink(path) {
      this.$router.push(path);
    },
    handleCommand(path) {
      this.$router.push(path);
    },
    handleClick(i) {
      this.currentIndex = i;
    },
    // 搜索
    search() {
      const keyword = "/home?keywords=" + this.keyword;
      this.$router.push({
        path: keyword,
      });
      this.keyword = "";
    },
    logout() {
      // 退出操作
      localStorage.removeItem("token");
      this.$router.go(0);
    },
  },
};
</script>

<style scoped lang="less">
/*新添加的样式*/
.login {
  margin-left: 20px;
  display: flex;
  a {
    padding: 10px;
    color: #2d8cf0;
    text-decoration: none;
  }
  span {
    padding: 10px;
    color: #2d8cf0;
    cursor: pointer;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.el-dropdown {
  font-size: 12px;
}
.userInfo {
  margin: 10px;
  a {
    .userAvatar {
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}
.header-wrap {
  width: 100%;
  height: 96px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
}

.header-inner {
  margin: 0 auto;
  width: 70%;
  display: flex;
  align-items: center;
}

.logo-box {
  height: 50px;
  display: flex;
  align-items: center;

  & img {
    height: 100%;
  }
}

.nav {
  flex: 1;
}

.nav-box {
  display: flex;
  align-items: stretch;
  padding: 0 32px;
  a {
    text-decoration: none;
  }
}

.nav-item {
  cursor: pointer;
  color: #17233d;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  padding: 0 32px;
  white-space: nowrap;

  &:hover {
    color: #2d8cf0;
  }
}

.nav-item-active {
  text-decoration: underline;
  color: #2d8cf0;
}

@media screen and (min-width: 200px) and (max-width: 900px) {
  .search {
    display: none;
  }

  .header-inner {
    box-sizing: border-box;
    width: 100%;
    padding: 0 32px;
  }
}
</style>
