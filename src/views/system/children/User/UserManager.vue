<template>
  <h1>用户管理页面</h1>
  <el-input v-model="search" size="default" placeholder="请输入用户手机号：" class="user_search" />
  <el-table :data="tableData.userInfo"
    border style="width: 100%">
    <el-table-column label="用户昵称" prop="userAccount" width="140px" />
    <el-table-column label="用户姓名" prop="userName" width="120px"/>
    <el-table-column label="手机号" prop="userPhone"  width="120px"/>
    <el-table-column label="邮箱地址" prop="userEmail" />
    <el-table-column
        prop="userStatus"
        label="用户状态"
        width="90px"
      >
        <template #default="scope">
          <el-tag type="success"
            v-if="scope.row.userStatus == 1">正常</el-tag
          >
          <el-tag type="danger"
              v-else>封禁</el-tag
            >
        </template>
      </el-table-column>
    <el-table-column label="注册时间" prop="userTime" />
    <el-table-column label="最后登录" prop="userLast" />
    <el-table-column label="操作" align="center" width="80px">
      <template #default="scope">
        <el-button size="small" type="warning" @click="handleEditStatus(userStatesNormal, scope.row)" v-if="scope.row.userStatus == 1">封禁</el-button>
        <el-button size="small" type="warning" @click="handleEditStatus(userStatesBanned, scope.row)" v-else>解禁</el-button>
        <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" disabled=true>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
            <!-- 分页 -->
      <div class="page-option">
          <el-pagination :page-size="8" :pager-count="10" layout="prev, pager, next" :total=tableData.userCout
              @current-change="pageChange" />
      </div>
              <userEdit/>
</template>

<script lang="js" setup>
import userEdit from '../../../../components/userEdit.vue'
import { computed, ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

const search = ref('')
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
  userCout: 0,
})
const defaultPage = 1

let store = useStore()
onMounted(() => { 
  getUserCout()
  getUser(defaultPage)
})

watch(search, (newValue) => {
  getUserCout()
  getUser(defaultPage)
});

const handleEditStatus = (index, row) => {
  if (index == userStatesNormal) {
    row.userStatus = userStatesBanned
    updateUserStatus(row.userId, userStatesBanned)
  } else if (index == userStatesBanned) { 
    row.userStatus = userStatesNormal
    updateUserStatus(row.userId, userStatesNormal)
  }
  // store.commit('SET_USEREDIT', row)
}

//获取用户信息
const getUser = function (page) { 
  console.log(search.value)
  if (search.value == '') {
    axios.request({
      url: 'http://localhost/User/info/all',
      method: 'GET',
      params: {
        pageNum: page,
        pageSize: 8
      },
      data: {}
    })
      .then(response => {
        // 处理获取到的数据
        tableData.userInfo = response.data.result
      })
  } else { 
    axios.request({
      url: 'http://localhost/User/info/name',
      method: 'GET',
      params: {
        'userName': search.value
      },
      data: {}
    })
      .then(response => {
        // 处理获取到的数据
        tableData.userInfo = response.data.result
      })
  }
  
}

//获取用户信息数量
const getUserCout = function () {
  if (search.value == '') {
    axios.request({
      url: 'http://localhost/User/cout',
      method: 'GET',
      params: {
      },
      data: {}
    })
      .then(response => {
        // 处理获取到的数据
        tableData.userCout = response.data.result
        // console.log(response.data.result)
      })
  } else { 
    tableData.userCout = 1;
  }
  
}

//改变页码
const pageChange = function (page) { 
  getUser(page)
}

//修改用户信息
const handleEdit = (index, row) => {
  console.log(index, row)
  store.commit('SET_USEREDIT', row)
}

//删除用户(禁用)
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
.user_search {
    width: 300px;
    float: right;
    margin: 10px 0;
}
</style>