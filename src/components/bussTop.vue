<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <!-- <el-menu-item> -->
        <img style="width: 70px" src="http://localhost:8898/images/logo_lucency.png" alt="logo" />
        <h1>数派π</h1>
        <!-- </el-menu-item> -->
        <div class="flex-grow" />
        <el-menu-item index="1"><router-link :to="{ name: 'BussBoard' }">商家中心</router-link></el-menu-item>
        <el-menu-item index="2"><router-link :to="{ name: 'ObjectList' }">商品中心</router-link></el-menu-item>
        <el-menu-item index="3"><router-link :to="{ name: 'BussOrderManager' }">订单中心</router-link></el-menu-item>
        <el-menu-item index="4"><router-link :to="{ name: 'BussInfo' }">个人中心</router-link></el-menu-item>
        <el-menu-item index="5"><router-link :to="{ name: 'BussSend' }">客服中心</router-link></el-menu-item>
    </el-menu>
</template>

<script lang="js" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.flex-grow {
    flex-grow: 1;
}

.el-menu-demo {
    height: auto;
    padding: 10px 120px;

    h1 {
        font-size: 25px;
        margin: 0 0 0 20px;
        color: rgb(95, 171, 248);
        line-height: 70px;
    }
}
a {
    text-decoration: none;
}
</style>
