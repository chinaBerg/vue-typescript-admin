<template>
  <div class="page-login-container">
    <section class="login__form">
      <h3 class="login__title">系统登录</h3>
      <el-form ref="Form" :model="formData" :rules="formRules">
        <el-form-item prop="account">
          <el-input
            type="text"
            placeholder="请输入帐号"
            autofocus
            v-model.trim="formData.account">
            <i class="iconfont icon-account" slot="prepend"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="login__item-pass">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model.trim="formData.password"
            @on-keydown.enter="handleLogin">
            <i class="iconfont icon-password" slot="prepend"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="login__item-submit">
          <el-button
            class="w100"
            type="primary"
            :loading="isLoading"
            @click="handleLogin">
            {{isLoading ? '登录中' : '登录'}}
          </el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import { AccountModule } from '@/store';

import { Form } from 'element-ui';
import { isFalsy } from 'utility-types';

@Component({
  name: 'Dashboard',
})
export default class extends Vue {
  @Ref() Form!: Form

  /** 登录Loaidng */
  private isLoading = false

  /** 表单数据 */
  private formData = {
    account: 'admin',
    password: '123456',
  }

  /** 表单验证规则 */
  private readonly formRules = {
    account: [
      { required: true, message: '账号不能为空', trigger: 'change' },
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'change' },
      {
        min: 6, max: 20, message: '密码长度为6-20位', trigger: 'change',
      },
    ],
  }

  /**
   * handleLogin
   * @description 发送登录请求
   */
  private handleLogin() {
    if (this.isLoading) return;
    this.Form.validate(async (valid) => {
      if (valid) {
        try {
          this.isLoading = true;
          await AccountModule.login();
          const { redirect } = this.$route.query;
          this.$router.replace({
            path: isFalsy(redirect) ? '/' : decodeURIComponent(redirect as string),
          });
        } catch (error) {
          this.$message.error(error);
        } finally {
          this.isLoading = false;
        }
      }
    });
  }
}
</script>

<style lang="less" scoped>
  @import url('../../styles/var.less');
  .page-login-container {
    width: 100%;
    height: 100%;
    background: url('../../assets/images/login/bg.jpg') no-repeat left center #f0f2f5;
    background-size: 100% auto;
    .login__form {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 400px;
      padding: 0 20px;
      background: #fff;
      border-radius: 10px;
      transform: translate(-50%, -50%);
      overflow: hidden;
      .login__title {
        padding: 20px 0;
        text-align: center;
        font-size: 22px;
      }
    }
  }
</style>
