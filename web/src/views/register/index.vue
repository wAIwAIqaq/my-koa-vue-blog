<template>
  <div class="login-bg">
    <div class="login" id="login">
      <div class="log-bg">
        <div class="log-logo">欢迎来到注册页面!</div>
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
          <el-form-item label="确认密码" prop="password2" label-width="100px">
            <el-input
              type="password"
              v-model="ruleForm.password2"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq" label-width="100px">
            <el-input
              type="text"
              v-model="ruleForm.qq"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="E-mail" prop="email" label-width="100px">
            <el-input
              type="text"
              v-model="ruleForm.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <img
            src="http://localhost:5000/api/v1/captcha"
            id="captcha"
            ref="captcha"
            @click="changeCaptcha"
          />
          <el-form-item label="验证码" prop="captcha" label-width="100px">
            <el-input type="text" v-model="ruleForm.captcha" name="cpt" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >注册</el-button
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
    const validatePassword2 = (rule, value, callback) => {
      // const regex = /^[a-zA-Z0-9]{6,15}$/;
      if (value === "") {
        console.log(this.ruleForm.password);
        callback(new Error("请确认密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        /*  else if (!regex.test(value)) {
        callback(new Error("密码必须在6~15位之间,包含字符、数字和 _"));
      }  */
        callback();
      }
    };
    const validateQQ = (rule, value, callback) => {
      // const regex = /^[a-zA-Z0-9]{6,15}$/;
      if (value === "") {
        callback(new Error("请输入您的QQ号"));
      } else {
        /*  else if (!regex.test(value)) {
        callback(new Error("密码必须在6~15位之间,包含字符、数字和 _"));
      }  */
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      // const regex = /^[a-zA-Z0-9]{6,15}$/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        /*  else if (!regex.test(value)) {
        callback(new Error("密码必须在6~15位之间,包含字符、数字和 _"));
      }  */
        callback();
      }
    };
    const validateCaptcha = (rule, value, callback) => {
      // const regex = /^[a-zA-Z0-9]{6,15}$/;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        /*  else if (!regex.test(value)) {
        callback(new Error("密码必须在6~15位之间,包含字符、数字和 _"));
      }  */
        callback();
      }
    };
    return {
      ruleForm: {
        nickname: "",
        password: "",
        password2: "",
        qq: "",
        email: "",
        captcha: "",
      },
      rules: {
        nickname: [{ validator: validateNickname, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        password2: [{ validator: validatePassword2, trigger: "blur" }],
        qq: [{ validator: validateQQ, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }],
      },
    };
  },
  created() {
    // 获取验证图片
    this._getCaptchaImg();
  },
  methods: {
    ...mapActions({
      userRegister: "user/userRegister",
      getCaptchaImg: "user/getCaptchaImg",
    }),
    _getCaptchaImg() {},
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await this.userRegister(this.ruleForm);
          this.$message({
            message: "注册成功",
            type: "success",
          });
          this.$router.push("/login");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeCaptcha() {
      this.$refs.captcha.src =
        "http://localhost:5000/api/v1/captcha?r=" + Date.now();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped lang="less">
.login-bg {
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 70%;
}
.login {
  overflow: hidden;
  width: 600px;
  z-index: 10;
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
#captcha {
  margin: -30px 0 0 112px;
}
.log-bg {
  background: url("../../assets/login-bg.jpg");
  width: 100%;
  max-height: 312px;
  min-height: 50px;
  overflow: hidden;
}
.log-logo {
  height: 80px;
  margin: 20px auto;
  text-align: center;
  line-height: 80px;
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
