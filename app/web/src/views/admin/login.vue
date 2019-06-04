<template>
  <div class="login">
    <div class="l-box">
      <h1 class="title">Easily-Admin管理后台</h1>

      <!-- 登陆表单控件 -->
      <a-form :form="form" @submit="handleSubmit" class="form-item">
        <a-form-item :wrapper-col="{ span: 14, offset: 5 }">
          <a-input
            v-decorator="[
              'username',
              { rules: [{ required: true, message: '用户名不能为空' }] }
            ]"
            placeholder="用户名"
          >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 5 }">
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '密码不能为空' }] }
            ]"
            placeholder="密码"
            type="password"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 5 }">
          <a-button type="primary" html-type="submit" block>登陆</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },

  components: {},

  computed: {},

  methods: {
    // 提交表单方法
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$ajax({
            method: "post",
            url: "/admin/login",
            data: {
              username: values.username,
              password: values.password
            }
          })
            .then(result => {
              if (result.data.code === 200) {
                this.$message.success("登陆成功！");
                this.$store.commit("login", result.data.token);
                this.$router.push("/admin");
              } else {
                this.$message.error("登陆失败，用户名或密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/bg.jpg") no-repeat scroll 50% / cover;
  position: relative;
  .l-box {
    width: 450px;
    height: 300px;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 20px;
    .title {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 15px;
    }
    .form-item {
      text-align: center;
    }
  }
}
</style>
