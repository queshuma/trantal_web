<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <indexTop></indexTop>
            </el-header>
            <el-container class="content">
                <el-aside width="200px">
                    <shopLeft></shopLeft>
                </el-aside>
                <el-container>
                    <el-main>
                        <h2>收货信息</h2>
                        <el-table :data="receive_data" style="width: 100%" max-height="250">
                            <el-table-column fixed prop="receiveName" label="收件人姓名" width="180" />
                            <el-table-column prop="receivePhone" label="收件手机号" width="220" />
                            <el-table-column prop="receiveAddress" label="收件地址" />
                            <el-table-column fixed="right" label="操作" width="120">
                                <template #default="scope">
                                    <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <!-- 用户地址输入框 -->
                        <el-form :inline="true" :model="receive_item" class="demo-form-inline" style="margin: 20px 0;">
                            <el-form-item label="收件人姓名">
                                <el-input v-model="receive_item.receiveName" />
                            </el-form-item>
                            <el-form-item label="联系方式">
                                <el-input v-model="receive_item.receivePhone" />
                            </el-form-item>
                            <el-form-item label="收件人地址">
                                <el-input v-model="receive_item.receiveAddress" />
                            </el-form-item>
                            <el-button class="mt-4" style="width: 100%" @click="onAddItem">添加收件地址</el-button>
                        </el-form>

                    </el-main>
                </el-container>
            </el-container>
            <el-footer>
                <indexBottom></indexBottom>
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="js">

import { ref, reactive, onMounted } from 'vue'
import axios from 'axios';
import dayjs from 'dayjs'
import { el } from 'element-plus/es/locales.mjs';

const now = new Date()
const receive_data = ref([])
const receive_item = reactive({
    receiveName: '',
    receivePhone: '',
    receiveAddress: '',
})

onMounted(() => {
    axios.request({
        url: 'http://localhost/Receive/findByUserId',
        method: 'GET',
        params: {},
        data: {},
        withCredentials: true, // 确保发送凭据
    })
        .then(response => {
            receive_data.value = response.data.result
            console.log(receive_data.value)
        })
})

const deleteRow = (index) => {
    const address_id = receive_data.value[index].receiveId
    axios.request({
        url: 'http://localhost/Receive/remove',
        method: 'POST',
        params: {
            receiveId: address_id,
        },
        data: {},
        withCredentials: true, // 确保发送凭据
    })
        .then(response => {
            alert("地址删除成功")
            console.log(response.data)
            window.location.reload()
        })
}

const onAddItem = () => {
    if (receive_item.receiveAddress.length == 0
        || receive_item.receiveName.length == 0
        || receive_item.receiveName.length == 0) {
        alert("请补充收件信息")
    } else {
        axios.request({
            url: 'http://localhost/Receive/add',
            method: 'POST',
            params: {
                receiveAddress: receive_item.receiveAddress,
                receiveName: receive_item.receiveName,
                receivePhone: receive_item.receivePhone
            },
            data: {},
            withCredentials: true, // 确保发送凭据
        })
            .then(response => {
                console.log(response.data)
                if (response.data.resultMsg === 'hasReceive') {
                    alert("地址已存在,已为您刷新页面")
                    window.location.reload()
                } else {
                    alert("地址添加成功")
                    console.log(response.data)
                    window.location.reload()
                }
            })
    }
}



</script>

<style lang="scss" scoped>
body {
    position: relative;
}

.el-main {
    min-height: 800px;
}

.content {
    width: 80%;
    margin: 0 auto;
    padding: 0;

}

.el-header {
    padding: 0;
    margin: 0;
    height: auto;
}

.el-footer {
    padding: 0;
    margin: 0;
}
</style>
