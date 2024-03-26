<template>
    <div class="content">
        <div class="common-layout">
            <el-container>
                <el-header>
                    <indexTop></indexTop>
                </el-header>
                <el-main>
                    <detailMain></detailMain>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </div>
    </div>
</template>

<script lang="js" setup>
import indexTop from '../components/indexTop.vue'
import detailMain from '../components/detailMain.vue'
</script>

<style lang="scss" scoped>

.el-header {
    padding: 0;
    margin: 0;
    height: auto;
}

.el-footer {
    height: 200px;
    width: 100%;
    margin-top: 50px;
    padding: 0 50px;
    background-color: #a09f9f;
}

.el-main {
    width: 1200px;
    margin: 40px auto;
    padding: 30px 50px 30px 50px;
        background-color: #fff;
    border: 0 solid black;
    border-radius: 30px;

}</style>