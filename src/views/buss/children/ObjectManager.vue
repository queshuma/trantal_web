<template>
    <div class="content">
        <h1>商品管理页面</h1>
        <el-input v-model="search" size="default" placeholder="请输入商品名称：" class="object_search" :disabled="true"/>
        <el-table :data=tableData.objectInfo border style="width: 100%">
            <el-table-column label="商品Id" prop="objectId" />
            <el-table-column label="商品名称" prop="objectName" />
            <el-table-column label="商品分类" prop="classesName" />
            <el-table-column label="商品价格" prop="objectPrice" />
            <el-table-column label="商品库存" prop="objectCout" />
            <el-table-column prop="userStatus" label="商品状态" width="90px">
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.objectStatus == 1">正常</el-tag>
                    <el-tag type="danger" v-else>下架</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="上架时间" prop="objectTime" width="160px" />
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button size="small" type="warning" @click="handleEditStatus(objectStatesNormal, scope.row)"
                        v-if="scope.row.objectStatus == 1">下架</el-button>
                    <el-button size="small" type="warning" @click="handleEditStatus(objectStatesBanned, scope.row)"
                        v-else>上架</el-button>
                    <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page-option">
            <el-pagination :page-size="9" :pager-count="10" layout="prev, pager, next" :total=tableData.objectCout
                @current-change="pageChange" />
        </div>

        <objectEdit />
    </div>
</template>

<script lang="js" setup>
import { computed, ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import objectEdit from '../../../components/objectEdit.vue'
import { selectGroupKey, tagEmits } from 'element-plus'

const search = ref('')
//分页的配置信息
const currentPage4 = ref(1)
const pageSize4 = ref(9)
// const small = ref(false)
// const background = ref(false)
// const disabled = ref(false)
// const objectEditVisible = ref(true)
const objectStatesNormal = 1
const objectStatesBanned = 2
const defaultPage = 1
const defaultPageSize = 8
const tableData = reactive({
    objectCout: 0,
    objectInfo: [],
})

let store = useStore()
onMounted(() => {
    getObjectCout()
    getObject(defaultPage)
})

watch(search, (newValue) => {
    tableData.objectShow = tableData.objectInfo.filter(item =>
        item.objectName.includes(newValue)
    );
});

//获取商品总数
const getObjectCout = function () { 
    axios.request({
        url: 'http://localhost/Object/cout/buss',
        method: 'GET',
        params: {},
        data: {},
        withCredentials: true
    })
        .then(response => {
            // 处理获取到的数据
            tableData.objectCout = response.data.result
            console.log("商品总数" + tableData.objectCout)
        })
}

//获取商品信息
const getObject = function (pageNum) { 
    axios.request({
        url: 'http://localhost/Object/info/userId',
        method: 'get',
        params: {
            pageNum: pageNum,
            pageSize: defaultPageSize
        },
        data: {},
        withCredentials: true
    })
        .then(response => {
            // 处理获取到的数据
            tableData.objectInfo = response.data.result
            // tableData.objectShow = tableData.objectInfo
            console.log("data", response.data.result)
        })
}

//商品状态修改
const handleEditStatus = (index, row) => {
    if (index == objectStatesNormal) {
        row.objectStatus = objectStatesBanned
        updateObjectStatus(row.objectId, objectStatesBanned)
    } else if (index == objectStatesBanned) {
        row.objectStatus = objectStatesNormal
        updateObjectStatus(row.objectId, objectStatesNormal)
    }
}

//商品信息修改
const handleEdit = (index, row) => {
    store.commit('SET_OBJECTDIT', row)
}

const pageChange = function (page) {
    getObject(page)
 }

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