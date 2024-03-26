<template>
    <div>
        <h2>商品类型</h2>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
        <span style="line-height: 30px;">建议列表显示数: 7</span><br />
        <span style="line-height: 30px;">建议商品显示数: 4</span>
        <el-table :data="table" style="width: 100%">
            <el-table-column fixed prop="id" label="编号" />
            <el-table-column prop="label" label="标签" />
            <el-table-column prop="weightId" label="权重" />
            <el-table-column prop="parent" label="父集" />
            <el-table-column prop="status" label="分类状态" width="90px">
                <template #default="scope">
                    <el-tag type="success" @click="changeStatus(scope.row)" v-if="scope.row.status
                        == 1">正常</el-tag>
                    <el-tag type="danger" @click="changeStatus(scope.row)" v-else>下架</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="listStatus" label="列表显示" width="90px">
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.listStatus
                        == 1" @click="changeListStatus(scope.row)">正常</el-tag>
                    <el-tag type="danger" v-else @click="changeListStatus(scope.row)">下架</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="objectStatus" label="首页显示" width="90px">
                <template #default="scope">
                    <el-tag type="success" @click="changeObjectStatus(scope.row)" v-if="scope.row.objectStatus
                        == 1">正常</el-tag>
                    <el-tag type="danger" @click="changeObjectStatus(scope.row)" v-else>下架</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="$treeNodeId" label="树集编号" />
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="removeEvent(scope.row)">下线</el-button>
                    <el-button link type="primary" size="small" @click="editClassesEvent(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-form :inline="true" :model="insertInfo" class="demo-form-inline">
            <el-form-item label="编号Id" style="display: inline-block;width:20%;">
                <el-input v-model="insertInfo.objClassesId" placeholder="编号Id" :disabled=objClassesShow />
            </el-form-item>
            <el-form-item label="新增分类" style="display: inline-block;width:50%;">
                <el-input v-model="insertInfo.objClassesName" placeholder="新增分类" />
            </el-form-item>
            <el-form-item label="权重等级" style="display: inline-block;width:20%;">
                <el-input v-model="insertInfo.objClassesWeightId" placeholder="权重等级" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="insertEvent()">提交</el-button>
                <el-button type="primary" @click="resetEvent()">复位</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="js" setup>
import { onMounted, ref, reactive } from 'vue'
import axios from 'axios'

const handleNodeClick = (data) => {
    console.log(data)
}

const data = ref()
const table = ref([])
const objClassesShow = ref(true)
const insertInfo = reactive({
    objClassesName: '',
    objClassesWeightId: 0,
    objClassesId: 0,
})

onMounted(() => {
    axios.request({
        url: 'http://localhost/ObjClasses/info/all',
        method: 'get',
        params: {},
        data: {}
    })
        .then(response => {
            // 处理获取到的数据
            data.value = response.data.result
            table.value = data.value[0].children
            console.log("data", data.value[0].children)
        })
})

const defaultProps = {
    children: 'children',
    label: 'label',
}

//下线
const removeEvent = function (row) {
    axios.request({
        url: 'http://localhost/ObjClasses/status',
        method: 'PUT',
        params: {
            objClassesId: row.id,
            currentStatus: row.status
        },
        data: {},
        // withCredentials: true, // 确保发送凭据
    })
        .then(response => {
            window.location.reload()
        })

}

//插入或者编辑分类
const insertEvent = function () {
    if (insertInfo.objClassesName.trim().length == 0) {
        alert("请输入分类内容")
    } else if (insertInfo.objClassesId == 0) {
        axios.request({
            url: 'http://localhost/ObjClasses/classes',
            method: 'POST',
            params: {
                classesName: insertInfo.objClassesName,
                weightId: insertInfo.objClassesWeightId
            },
            data: {},
            // withCredentials: true, // 确保发送凭据
        })
            .then(response => {
                window.location.reload()
            })
    } else if (insertInfo.objClassesId != 0) {
        axios.request({
            url: 'http://localhost/ObjClasses/info',
            method: 'PUT',
            params: {
                classesId: insertInfo.objClassesId,
                classesName: insertInfo.objClassesName,
                weightId: insertInfo.objClassesWeightId
            },
            data: {},
            // withCredentials: true, // 确保发送凭据
        })
            .then(response => {
                window.location.reload()
            })
    }

}

const editClassesEvent = function (row) {
    insertInfo.objClassesId = row.id
    insertInfo.objClassesName = row.label
    insertInfo.objClassesWeightId = row.weightId
    console.log(insertInfo)
}

//重载页面
const resetEvent = function () {
    window.location.reload()
}

//修改分类状态
const changeStatus = function (row) {
    if (row.status == 1) {
        row.status = 2
    } else {
        row.status = 1
    }
    axios.request({
        url: 'http://localhost/ObjClasses/status',
        method: 'PUT',
        params: {
            objClassesId: row.id,
            status: row.status,
        },
        data: {},
        // withCredentials: true, // 确保发送凭据
    })
        .then(response => {
            console.log(response.data.result)
            // window.location.reload()
        })
}

//修改分类列表状态
const changeListStatus = function (row) {
    console.log(row.label + row.listStatus)
    if (row.listStatus == 1) {
        row.listStatus = 2
    } else {
        row.listStatus = 1
    }
    console.log("end:" + row.listStatus)
    axios.request({
        url: 'http://localhost/ObjClasses/listStatus',
        method: 'PUT',
        params: {
            objClassesId: row.id,
            listStatus: row.listStatus,
        },
        data: {},
        // withCredentials: true, // 确保发送凭据
    })
        .then(response => {
            console.log(response.data.result)
            // window.location.reload()
        })
}

const changeObjectStatus = function (row) {
    if (row.objectStatus == 1) {
        row.objectStatus = 2
    } else {
        row.objectStatus = 1
    }
    axios.request({
        url: 'http://localhost/ObjClasses/objectStatus',
        method: 'PUT',
        params: {
            objClassesId: row.id,
            objectStatus: row.objectStatus,
        },
        data: {},
        // withCredentials: true, // 确保发送凭据
    })
        .then(response => {
            // window.location.reload()
        })
}

</script>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}

.el-tree-node__content {
    border: 1px solid rgb(212, 212, 212);
    font-size: 15px;
    height: 40px;
    background-color: aqua;
    line-height: 20px;
}
</style>
