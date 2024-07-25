<template>
  <h1>商家管理页面</h1>
  <el-table :data="tableData.userInfo.slice(
    (
      currentPage4 - 1) * pageSize4,
    currentPage4 * pageSize4
  )" border style="width: 100%">
    <el-table-column label="品牌名称" prop="userAccount" width="140px" />
    <el-table-column label="负责人姓名" prop="userName" width="120px" />
    <el-table-column label="手机号" prop="userPhone" width="120px" />
    <el-table-column label="邮箱地址" prop="userEmail" />
    <el-table-column prop="userStatus" label="品牌状态" width="90px">
      <template #default="scope">
        <el-tag type="success" v-if="scope.row.userStatus == 1">正常</el-tag>
        <el-tag type="danger" v-else>封禁</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="注册时间" prop="userTime" />
    <el-table-column label="最后登录" prop="userLast" />
    <el-table-column label="操作" align="center" width="80px">
      <template #default="scope">
        <el-button size="small" type="warning" @click="handleEditStatus(userStatesNormal, scope.row)"
          v-if="scope.row.userStatus == 1">封禁</el-button>
        <el-button size="small" type="warning" @click="handleEditStatus(userStatesBanned, scope.row)"
          v-else>解禁</el-button>
        <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
          disabled=true>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :current-page="currentPage4"
    layout="total, sizes, prev, pager, next, jumper" :total="tableData.userInfo.length" @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
  <userEdit />
</template>

<script lang="js" setup>
import userEdit from '../../../components/userEdit.vue'
import { computed, ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { shouldTransformRef } from 'vue/compiler-sfc';

//分页的配置信息
const currentPage4 = ref(1)
const pageSize4 = ref(9)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const userEditVisiable = ref(false)
const userStatesNormal = 1
const userStatesBanned = 2
const tableData = reactive({
  userInfo: [],
  bussShow: []
})
let store = useStore()
onMounted(() => {
  axios.request({
    url: 'http://localhost/User/info/level',
    method: 'get',
    params: {
      userLevel: 1,
    },
    data: {}
  })
    .then(response => {
      // 处理获取到的数据
      console.log(response.data.result)
      tableData.userInfo = response.data.result
      tableData.bussShow = tableData.userInfo
    })
})


const handleEditStatus = (index, row) => {
  if (index == userStatesNormal) {
    row.userStatus = userStatesBanned
    updateUserStatus(row.userId, userStatesBanned)
  } else if (index == userStatesBanned) {
    row.userStatus = userStatesNormal
    updateUserStatus(row.userId, userStatesNormal)
  }
}
const handleEdit = (index, row) => {
  store.commit('SET_USEREDIT', row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}
const handleSizeChange = (val) => {
  pageSize4.value = val
}
const handleCurrentChange = (val) => {
  currentPage4.value = val
}
const updateUserStatus = (userId, userStatus) => {
  axios.request({
    url: 'http://localhost/User/status',
    method: 'PUT',
    params: {
      userId: userId,
      userStatus: userStatus
    },
    data: {
    }
  })
    .then(response => {
      // 处理获取到的数据
      // tableData.userInfo = response.data.result
      console.log(response.data)
    })
}


</script>
<style lang="scss" scoped>
.el-button {
  margin: 0;
}
</style>