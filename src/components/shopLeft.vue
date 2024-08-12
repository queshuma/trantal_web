<template>
    <div class="left">
        <el-menu default-active="2" height="20px" background-color="transparent" class="el-menu-vertical-demo"
            @open="handleOpen" @close="handleClose" popper-class="list" width="auto" router>
            <div v-for="(v) in router.options.routes[5].children" :key="v.path">
                <el-menu-item :index="v.path" v-if="!v.children" class="menu-title">
                    <el-icon><icon-menu /></el-icon>
                    <span>{{ v.title }}</span>
                </el-menu-item>

                <el-sub-menu index="1" v-else>
                    <template #title>
                        <div class="menu-title">
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>{{ v.title }}</span>
                        </div>
                    </template>

                    <el-menu-item v-for="(val) in v.children" :key="val.path" :index="val.path">
                        <span>
                            {{ val.title }}
                        </span>
                    </el-menu-item>
                </el-sub-menu>
            </div>
            <el-menu-item>
                <span @click="logout">
                    重新登录
                </span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="js" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    Histogram
} from '@element-plus/icons-vue'
import link from "@/api/Link.js";

let router = useRouter();
onMounted(() => {
    console.log("获取路由规则", router.options)
})
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
const logout = function () {
  link("/User/logout", 'GET', {}, {}, {}, true).then(response => {
    // 处理获取到的数据
    const data = response.data.result
    router.push('/login')
  })
}
</script>
<style lang="scss" scoped>
.left {
    background-color: transparent;
    padding-top: 20px;
}

.el-sub-menu .is-opened {
    .el-sub-menu__title {
        height: 30px;
    }
}

.menu-log {
    line-height: 30px;
    width: 100%;
    text-align: center;

    .el-icon {}
}
</style>