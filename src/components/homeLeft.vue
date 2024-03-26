<template>
    <div class="left">
        <el-menu background-color="#dcdcdc" class="el-menu-vertical-demo" default-active="2"
            @open="handleOpen" @close="handleClose"  router>
            <div v-for="(v) in router.options.routes[2].children" :key="v.path">
                <el-sub-menu :index="v.path" v-if="v.children">
                    <template #title>
                        <span>{{ v.title }}</span>
                    </template>
                    <el-menu-item-group v-for="(val) in v.children" :key="val.path">
                        <el-menu-item :index="val.path">{{ val.title }}</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>

                <!-- 不带下拉列表 -->
                <el-menu-item :index="v.path" v-else>
                    <span> {{ v.title }}</span>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>

<script lang="js" setup>


import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}

let router = useRouter()
onMounted(() => {
    console.log("获取路由规则", router.options)
})
</script>


<style>
    .left {
        height: 800px;
        background-color: #dcdcdc;
    }
    .el-menu-item {
        background: transparent;
    }
    .el-menu {
        background-color: transparent;
    }
</style>