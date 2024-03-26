<template>
    <a-layout>
        <a-layout-header class="header">
            <homeTop></homeTop>
        </a-layout-header>
            <a-layout-content style="padding: 0 50px">
                <a-layout style="padding: 10px 0; background: #fff">
                    <a-layout-sider width="200" style="background: #fff">
                        <homeLeft></homeLeft>
                    </a-layout-sider>
                    <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
                        <router-view></router-view>
                    </a-layout-content>
                </a-layout>
            </a-layout-content>
        <a-layout-footer style="text-align: center">
            数派π ©2024 By SHUZHI
        </a-layout-footer>
    </a-layout>
</template>
<script lang="js" setup>
import homeTop from '../../components/homeTop.vue'
import homeLeft from '../../components/homeLeft.vue'
</script>
<style scoped>
.header {
    height: 80px;
    line-height: 80px;
    background-color: white;
    color: none;
}
</style>
