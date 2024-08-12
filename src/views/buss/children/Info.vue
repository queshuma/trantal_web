<template>
  <div class="content">
    <h1>商家信息</h1>
    <el-form :inline="true" label-width="180px" class="demo-ruleForm" :size="formSize" status-icon>
      <el-form-item label="品牌名称">
        <el-input v-model=UserData.userAccount />
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input v-model=UserData.userName />
      </el-form-item>
      <el-form-item label="联系手机号">
        <el-input v-model=UserData.userPhone />
      </el-form-item>
      <el-form-item label="邮箱地址">
        <el-input v-model=UserData.userEmail />
      </el-form-item>
      <el-form-item label="邮箱地址">
        <el-input v-model=UserData.userEmail />
      </el-form-item>
      <el-form-item label="注册时间">
        <el-input v-model=UserData.userTime :disabled="true" />
      </el-form-item>
      <el-form-item label="最后登录时间">
        <el-input v-model=UserData.userLast :disabled="true" />
      </el-form-item>
      <el-form-item style="width: 100%;">
        <el-button type="primary" @click="submitInfo">
          提交信息
        </el-button>
        <el-button @click="resetForm">重置信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="js" setup>
import { onMounted, reactive, ref } from 'vue'

import link from "@/api/Link.js";

const formSize = ref('default')
const UserData = ref({})

onMounted(() => {
  link("/User/info", 'GET',{},{},{}, true).then(response => {
    UserData.value = response.data.result
  })
})

const submitInfo = () => {
  link("/User/user", 'PUT',{}, UserData.value, { 'Content-Type': 'application/json' }, true).then(response => {
    UserData.value = response.data.result
  })
}

const resetForm = () => {
  link("/User/info/id", 'GET',{}, {}, {}).then(response => {
    UserData.value = response.data.result
  })
}
</script>

<style lang="scss" scoped>
.content {
  width: 80%;
  margin: 20px auto;
}
</style>