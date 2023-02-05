<template>
  <div class="login-bg">
    <div class="login" id="login">
      <div class="log-bg">
        <div class="log-cloud cloud1"></div>
        <div class="log-cloud cloud2"></div>
        <div class="log-cloud cloud3"></div>
        <div class="log-cloud cloud4"></div>

        <div class="log-logo">欢迎来到登录页面!</div>
      </div>
      <div class="log-email">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="nickname" label-width="100px">
            <el-input
              type="text"
              v-model="ruleForm.nickname"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" label-width="100px">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    const validateNickname = (rule, value, callback) => {
      // const regex = /^[a-zA-Z0-9]{4,16}$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      // const regex = /^[a-zA-Z0-9]{6,15}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } /*  else if (!regex.test(value)) {
        callback(new Error("密码必须在6~15位之间,包含字符、数字和 _"));
      }  */ else {
        callback();
      }
    };
    return {
      ruleForm: {
        nickname: "",
        password: "",
      },
      rules: {
        nickname: [{ validator: validateNickname, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },

  methods: {
    ...mapActions({
      userLogin: "user/userLogin",
    }),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await this.userLogin(this.ruleForm);
          localStorage.setItem("token", res.data.msg.token);
          this.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang='less'>
.login-bg {
  position: relative;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 70%;
  min-height: 900px;
  background-color: #f0f0f0;
}
.login {
  position: fixed;
  overflow: hidden;
  margin: auto;
  top: 0;
  bottom: 250px;
  right: 0;
  left: 80px;
  height: 600px;
  width: 600px;
  min-height: 700px;
  z-index: 10;
  right: 140px;
  background: #fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 3px 16px -5px #070707;
  box-shadow: 0px 3px 16px -5px #070707;
}
.log-close {
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  top: 12px;
  right: 12px;
  opacity: 1;
}
.log-close:hover .icons {
  transform: rotate(180deg);
}
.log-close .icons {
  opacity: 1;
  transition: all 0.3s;
}

.log-bg {
  background: url("../../assets/login-bg.jpg");
  width: 100%;
  height: 312px;
  overflow: hidden;
}
.log-logo {
  height: 80px;
  margin: 120px auto 25px;
  text-align: center;
  color: #666;
  font-weight: bold;
  font-size: 40px;
  background-image: -webkit-linear-gradient(
    bottom,
    rgb(255, 115, 190),
    rgb(11, 157, 255)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.log-text {
  color: #666;
  font-size: 26px;
  text-align: center;
  margin: 0 auto;
}
.log-logo,
.log-text {
  z-index: 2;
}
.icons {
  background: url(../../assets/images/icons.png) no-repeat;
  display: inline-block;
}
.close {
  height: 16px;
  width: 16px;
  background-position: -13px 0;
}
.login-email {
  height: 17px;
  width: 29px;
  background-position: -117px 0;
}

.log-btns {
  padding: 15px 0;
  margin: 0 auto;
}
.log-btn {
  width: 402px;
  display: block;
  text-align: left;
  line-height: 50px;
  margin: 0 auto 15px;
  height: 50px;
  color: #fff;
  font-size: 26px;
  -webkit-border-radius: 5px;
  background-color: #3b5999;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  position: relative;
}
.log-btn.tw {
  background-color: #13b4e9;
}
.log-btn.email {
  background-color: #50e3ce;
}
.log-btn:hover,
.log-btn:focus {
  color: #fff;
  opacity: 0.8;
}

.log-email {
  text-align: center;
  margin-top: 20px;
  padding: 40px 40px 10px 0px;
}
</style>