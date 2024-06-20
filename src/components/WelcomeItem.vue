<script setup>

import {Lock, User} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";


import {ref} from "vue";
import {useRouter} from "vue-router";
import {useTokenStore} from "@/store/token";
import {tologin,toregister} from "@/api/user.js";


const router=useRouter()

const tokenStore=useTokenStore()

const form=ref(null)

const registerData=ref({
  username:'',password:'',rePassword:''
})

const isRegister=ref(false)


const login=async () => {
    const result=await tologin(registerData.value);
    ElMessage.success(result.msg?result.msg:'登录成功')
    tokenStore.setToken(result.data)
    router.push('/buju')
}
const register=async ()=>{
  const result=await toregister(registerData.value);
  ElMessage.success(result.message?result.message:'注册成功')

}

const clearRegisterData=()=>{
  registerData.value={
    username:'',password:'',rePassword:''
  }
}



</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
      <el-col :span="6"   :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form ref="form" size="large" autocomplete="on" v-if="isRegister" :model="registerData" >

        <el-form-item prop="username">
         <h1>注册</h1>
        </el-form-item>

        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名"   v-model="registerData.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"   v-model="registerData.password"></el-input>
        </el-form-item>

        <el-form-item prop="rePassword">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"   v-model="registerData.rePassword"></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="danger" auto-insert-space @click="register"> 注册</el-button>
        </el-form-item>

        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData()"> ← 返回 </el-link>
        </el-form-item>
      </el-form>

      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>

        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
<!--：prefix-icon"User" 是输入框的用户标象用户的-->

        </el-form-item>

        <el-form-item prop="password">
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"  v-model="registerData.password"></el-input>
        </el-form-item>

        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button"  type="primary" auto-insert-space @click="login"> 登录 </el-button>
        </el-form-item>

        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true;clearRegisterData()">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>

  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    //background:
    //    //url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
    //url('@/assets/login_bg.jpg') no-repeat center / cover;
    //border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;


    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>