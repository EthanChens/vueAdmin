<template>
  <div class="login">
    <div class="login-warp">
      <ul class="menu-tab">
        <li
          v-for="(item, index) in menuTab"
          :key="index"
          :class="{ current: isActivate == index }"
          @click="changeType($event)"
        >
          {{ item.text }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="email">
          <span class="c-woo">邮箱</span>
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <span class="c-woo">密码</span>
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" v-if="isActivate == 1">
          <span class="c-woo">确认密码</span>
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <span class="c-woo">验证码</span>
          <el-row :gutter="10">
            <el-col :span="15" :xs="12">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="5" :xs="5">
              <el-button type="success" @click="getYZM">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="text-align:center;margin-top:2rem;">
          <el-button
            style="width:100%;"
            type="danger"
            @click="submitForm('ruleForm')"
            >{{isActivate == 0 ? '登录' : '注册'}}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCode } from "@/controller/login.js";
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      var regs = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === "") {
        return callback(new Error("邮箱不能为空"));
      } else if (!regs.test(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.pass !== "") {
        }
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [{ text: "登录" }, { text: "注册" }],
      isActivate: 0,
      ruleForm: {
        pass: "",
        checkPass: "",
        email: "",
        code: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        checkPass: [{ validator: checkPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    changeType(event) {
      this.isActivate = $(event.currentTarget).index();
    },
    submitForm() {
      console.log(process.env.VUE_APP_ADC);
    },
    //获取验证码
    getYZM() {
      var a = getCode({
		  email: this.ruleForm.email
	  });
	  console.log(a)
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background-color: #344a5f;
}
.login-warp {
  width: 20.625rem;
  position: absolute;
  top: 6rem;
  left: 50%;
  z-index: 1;
  margin-left: -10.3125rem;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    line-height: 1.875rem;
    width: 5.5rem;
    cursor: pointer;
    border-radius: 0.125rem;
    color: #fff;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.el-form-item {
  margin-bottom: 1rem;
}
.c-woo {
  color: #fff;
}
/deep/ .el-form-item__content {
  margin-left: 0 !important;
}
/deep/ .el-form-item__error {
  top: 105%;
}
@media (max-width: 375px) {
  .login-warp {
    width: 15rem;
    margin-left: -7.5rem;
  }
}
</style>
