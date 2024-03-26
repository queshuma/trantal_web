<template>
    <h1>购物车管理页面</h1>
    <el-input v-model="search" size=default placeholder="请输入商品名称：" class="object_search" />
    <el-table :data="tableData.objectInfo" border style="width: 100%">
        <el-table-column label="商品Id" prop="objectWithBussVO.objectId" />
        <el-table-column label="商品名称" prop="objectWithBussVO.objectName" />
        <el-table-column label="商品分类" prop="objectWithBussVO.classesName" />
        <el-table-column label="商品价格" prop="objectWithBussVO.objectPrice" />
        <el-table-column label="购物车数量" prop="shopCout" />
        <el-table-column label="所属商家" prop="objectWithBussVO.bussAccount" />
        <el-table-column label="上架时间" prop="objectWithBussVO.objectTime" width="160px" />
        <el-table-column label="用户编号" prop="userId" width="160px" />
        
    </el-table>
    <!-- 分页 -->
    <div class="page-option">
        <el-pagination :page-size="9" :pager-count="10" layout="prev, pager, next" :total=tableData.objectCout
            @current-change="pageChange" />
    </div>
    <objectEdit />
</template>

<script lang="js" setup>
import { computed, ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import objectEdit from '../../../../components/objectEdit.vue'
import { selectGroupKey, tagEmits } from 'element-plus'

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
const tableData = reactive({
    objectInfo: [],
    objectCout: 0,
})
const defaultPage = 1;

let store = useStore()

onMounted(() => {
    axios.request({
        url: 'http://localhost/Shop/info/all',
        method: 'GET',
        params: {},
        data: {},
        // withCredentials: true, // 确保发送凭据
    })
        .then(response => {
            tableData.objectInfo = response.data.result
            console.log("info")
            console.log(tableData.objectInfo)
        })

    getObject(defaultPage)
})

//检测表格数据变化
watch(search, (newValue) => {
    tableData.objectShow = tableData.objectInfo.filter(item =>
        item.objectName.includes(newValue)
    );
});

//获取商品数据函数
const getObject = function (page) {
    axios.request({
        url: 'http://localhost/Shop/info/all',
        method: 'GET',
        params: {
            // pageNum: page,
            // pageSize: 9
        },
        data: {}
    })
        .then(response => {
            // 处理获取到的数据
            tableData.objectInfo = response.data.result
            // console.log("data", response.data.result)
        })
}

//商品状态编辑事件
const handleEditStatus = (index, row) => {
    if (index == objectStatesNormal) {
        row.objectStatus = objectStatesBanned
        updateObjectStatus(row.objectId, objectStatesBanned)
    } else if (index == objectStatesBanned) {
        row.objectStatus = objectStatesNormal
        updateObjectStatus(row.objectId, objectStatesNormal)
    }
}

//商品编辑事件
const handleEdit = (index, row) => {
    // console.log(index, row)
    store.commit('SET_OBJECTDIT', row)
}

//商品状态更新事件
const updateObjectStatus = (objectId, objectStatus) => {
    axios.request({
        url: 'http://localhost/Object/status',
        method: 'PUT',
        params: {
            objectId: objectId,
            objectStatus: objectStatus
        },
        data: {
        }
    })
        .then(response => {
            // 处理获取到的数据
            tableData.userInfo = response.data.result
            // console.log(response.data)
        })
}

//页码变化后事件
const pageChange = function (page) {
    getObject(page)
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
</style>