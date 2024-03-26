<template>
    <el-dialog v-model="$store.state.HomeModule.userEditVisible" title="修改个人信息">
        <!-- {{ data.userAccount }} -->
        <el-form>
            <el-form-item label="昵称" :label-width="formLabelWidth">
                <el-input v-model="data.userAccount" autocomplete="off" />
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="data.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮箱账号" :label-width="formLabelWidth">
                <el-input v-model="data.userEmail" model="form.email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth">
                <el-input v-model="data.userPhone" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="formUpdate">
                    修改
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="js" setup>
import { reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

let store = useStore()

const formLabelWidth = '140px'
const data = ref()

watch(() => store.state.HomeModule.currentUserInfo, (newValue) => {
    data.value = newValue;
    data.value = newValue
});
let formUpdate = () => {
    axios.request({
        url: 'http://localhost/User/user',
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        params: {},
        data: data.value,
        withCredentials: true
    })
        .then(response => {
            // 处理获取到的数据
            UserData.value = response.data.result
        })
    
        store.state.HomeModule.userEditVisible = false
}
</script>
<style scoped>
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>