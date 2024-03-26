<template>
        <el-container>
            <el-header>
                <bussTop></bussTop>
            </el-header>
            <el-container>
                <el-aside width="auto">
                    <bussLeft></bussLeft>
                </el-aside>
                <el-main>
                     <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
</template>
<script lang="js" setup>
import bussTop from '../../components/bussTop.vue'
import bussLeft from '../../components/bussLeft.vue'

</script>
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}

.el-header {
    height: auto;
}
</style>