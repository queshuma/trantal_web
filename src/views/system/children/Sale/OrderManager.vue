<template>
    <div class="content">
        <h1>商品管理页面</h1>
        <el-input v-model="search" size="default" placeholder="请输入商品名称：" class="object_search" />
        <el-table :data="orderInfo" border style="width: 100%">
            <el-table-column label="订单Id" prop="orderUUID" />
            <el-table-column label="商品名称" prop="objectName" />
            <el-table-column label="商品价格" prop="objectPrice" />
            <el-table-column label="数量" prop="orderCout" />
            <el-table-column label="收件人姓名" prop="orderName" />
            <el-table-column prop="userStatus" label="状态" width="90px">
                <template #default="scope">
                    <el-tag type="primary" v-if="scope.row.orderStatus == 0">待发货</el-tag>
                    <el-tag type="info" v-if="scope.row.orderStatus == 1">待收货</el-tag>
                    <el-tag type="success" v-if="scope.row.orderStatus == 2">已收货</el-tag>
                    <el-tag type="danger" v-if="scope.row.orderStatus == 3">发起退货</el-tag>
                    <el-tag type="warning" v-if="scope.row.orderStatus == 4">确认退货</el-tag>
                    <el-tag type="default" v-if="scope.row.orderStatus == 5">取消订单</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="下单时间" prop="orderTime" width="160px" />
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button size="small" type="success" @click="skipDetail(scope.$index, scope.row)">访问</el-button>
                    <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">更新</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="js" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const search = ref('')
//分页的配置信息
const currentPage4 = ref(1)
const pageSize4 = ref(9)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const objectEditVisible = ref(true)
const objectStatesNormal = 1
const objectStatesBanned = 2
const orderInfo = ref([])

let store = useStore()
onMounted(() => {
    axios.request({
        url: 'http://localhost/Order/info/all',
        method: 'GET',
        params: {},
        data: {},
        withCredentials: true
    })
        .then(response => {
            // 处理获取到的数据
            orderInfo.value = response.data.result
            console.log("data", response.data.result)
        })
})

const skipDetail = function (index, row) {
    console.log(index)
    console.log(row.objectId)
    router.push('/detail?id=' + row.objectId)

}

const handleEdit = (index, row) => {
    router.push("/Admin/orderDispose?orderUUID=" + row.orderUUID + "&objectId=" + row.objectId)
}

</script>
<style lang="scss" scoped>
.el-button {
    margin: 0;
}

.object_search {
    width: 300px;
    float: right;
    margin: 10px 0;
}

.content {
    max-width: 90%;
    margin: 40px auto;
}
</style>