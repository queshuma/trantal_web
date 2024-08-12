<template>
    <div class="content">
        <h1>订单管理页面</h1>
        <el-input v-model="search" size="default" placeholder="请输入商品名称：" class="object_search" />
        <el-table :data="tableData.orderInfo" border style="width: 100%">
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
                <!-- 分页 -->
            <div class="page-option">
                <el-pagination :page-size=defatultPageSize :pager-count="10" layout="prev, pager, next" :total=tableData.orderCout
                    @current-change="pageChange" />
            </div>
    </div>
</template>

<script lang="js" setup>
import { computed, ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import objectEdit from '../../../components/objectEdit.vue'
import { selectGroupKey, tagEmits } from 'element-plus'
import { useRouter } from 'vue-router'
import link from "@/api/Link.js";

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
const defaultPage = 1
const defatultPageSize = 6
const tableData = reactive({
    orderCout: 0,
    orderInfo: []
})

let store = useStore()
onMounted(() => {
    orderCout()
    getObject(defaultPage)
})

//获取订单数量
const orderCout = function () {
  link("/Order/cout/buss", 'GET',{}, {}, {}, true).then(response => {
    tableData.orderCout = response.data.result
  })
}

//获取订单数据
const getObject = function (page) {
  link("/Order/info/buss", 'GET',{}, {
    pageNum: page,
    pageSize: defatultPageSize
  }, {}, true).then(response => {
    tableData.orderInfo = response.data.result
  })
}

//跳转到商品详情页
const skipDetail = function (index, row) { 
    console.log(index)
    console.log(row.objectId)
    router.push('/detail?id=' + row.objectId)
    
}

//页码点击事件
const pageChange = function (page) {
    getObject(page)
}

//编辑商品信息
const handleEdit = (index, row) => {
    router.push("/Buss/orderDispose?orderUUID=" + row.orderUUID + "&objectId=" + row.objectId)
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