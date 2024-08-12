<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <indexTop></indexTop>
            </el-header>
            <el-main>
                <div class="input">
                    <div class="mt-4">
                        <el-input v-model="objectInput" class="input-with-select" size="large" @change="inputChange()">
                            <template #append>
                                <el-button :icon="Search" @click="searchObject"/>
                            </template>
                        </el-input>
                    </div>
                </div>
                <div style="width:100%;height:auto;padding:10px 0">
                    <div class="object_classes">
                        <span
                            style="display:inline-block;width: 12%;text-align:center;line-height: 60px;font-size:20px;vertical-align: top;">分类:
                        </span>
                        <div class="classes_list classes_show_bool" id="classesShow">
                            <div v-for="classes in classesData" :key="classes" class="classes-label">
                                <router-link :to="{ name: 'ObjectList', query: { classes: classes.label } }">
                                    <div>
                                        {{ classes.label }}
                                    </div>
                                </router-link>
                            </div>
                        </div>
                        <el-icon style="vertical-align: top;margin:22px auto;">
                            <ArrowDown v-if="classesShowBool" @click="changeClassesShow(true)" />
                            <ArrowUp v-else @click="changeClassesShow(false)" />
                        </el-icon>
                    </div>
                </div>
                <div class="object-list">

                    <ul>
                        <li v-for=" info in objectData" :key="info">

                            <router-link :to="{ name: 'detail', query: { id: info.objectId } }">
                                <img :src=info.objectBanner>
                                <div class="title">{{ info.objectName }}</div>
                            </router-link>
                        </li>
                    </ul>
                    <div class="page-option">
                        <el-pagination :page-size="20" :pager-count="10" layout="prev, pager, next" :total=objectCout
                            @current-change="pageChange" />
                    </div>
                </div>
            </el-main>
            <el-footer>
                <img src="http://localhost:8898/images/logo_lucency.png" height="100px" class="logo">
                数派π 甄选品牌 -- 自研品牌电商系统 -- GROUP BY SHUZHI@2024
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="js">

import axios from 'axios';
import { ref, reactive, onMounted, watch } from 'vue'

import { ArrowDown, ArrowUp, Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import link from "@/api/Link.js";

let router = useRouter()
const classesData = ref();
const classesShowBool = ref(true);
const objectInput = ref('')
const objectData = ref()
const objectCout = ref(0)
const defaultPage = 1

onMounted(() => {
    //获取所有分类
    link("/ObjClasses/info/all", 'GET',{}, {}, {}).then(response => {
      classesData.value = response.data.result[0].children
      getObject(defaultPage)
    })

    //获取商品总数
    link("/Object/cout", 'GET',{}, {}, {}, true).then(response => {
      objectCout.value = response.data.result
    })
})


watch(
    () => router.currentRoute.value,
    (newValue) => {
        // window.location.reload()
        console.log("success")
        getObject(defaultPage)
    }
);

//根据当前query获取当前的商品数据
const getObject = function (page) {
    //获取cookie中的值，并进行跳转
    const queryDict = router.currentRoute.value.query
    console.log(queryDict)
    if ("classes" in queryDict) {
        if (classesData.value.find(item => item.label == queryDict['classes'])) {
            //获取指定分类商品
            getObjectByClasses(queryDict['classes'], page)
        } else {
            alert("拒绝访问！商品分类不存在！")
            router.push("/")
        }
    } else if ("title" in queryDict) { 
        getObjectByTitle(queryDict['title'], defaultPage)
    }
    else {
        getObjectAll(page)
    }
}

//获取所有商品
const getObjectAll = function (page) {
  link("/Object/info/all", 'GET',{}, { pageNum: page, pageSize: 20 }, {}).then(response => {
    objectData.value = response.data.result
  })
}
//根据商品分类获取商品
const getObjectByClasses = function (classes, page) {
  //获取指定分类商品
  link("/Object/info/classes", 'GET',{}, { pageNum: page, pageSize: 20 }, {}, true).then(response => {
    objectData.value = response.data.result
  })
}
//根据商品标题信息获取商品
const getObjectByTitle = function (title, page) {
  link("/Object/info/title", 'GET',{}, { pageNum: page, pageSize: 20 }, {}, true).then(response => {
    objectData.value = response.data.result
  })
}

//分类下拉显示功能
const changeClassesShow = function (b) {
    var fixedDiv = document.getElementById("classesShow");
    console.log(fixedDiv)
    if (b) {
        classesShowBool.value = !b;
        fixedDiv.classList.remove("classes_show_bool");
    } else {
        classesShowBool.value = !b;
        fixedDiv.classList.add("classes_show_bool");
    }
}

//改变页码带来的数据更新
const pageChange = function (page) {
    getObject(page)
}

const searchObject = function () { 
    console.log("title")
    router.push('/objectList?title=' + objectInput.value)
}

const inputChange = function () { 
    // router.pu
}


</script>

<style lang="scss" scoped>
body {
    position: relative;
}

a {
    text-decoration: none;
}

.el-main {}

.content {
    width: 80%;
    margin: 0 auto;
    padding: 0;

}

.el-header {
    padding: 0;
    margin: 0;
    height: auto;
}

.el-footer {
    height: 150px;
    width: 100%;
    margin-top: 50px;
    padding: 0 50px;
    background-color: #a09f9f;
}

.el-main {
    margin: 0 0;
    padding: 0;
}

.el-input {
    height: 50px;
    box-shadow: #a6a6a6 2px 2px 5px 5px;
}

.input {
    display: block;
    max-width: 800px;
    margin: 5px auto;
}

.object_classes {
    max-width: 1200px;
    margin: 20px auto;
}

.classes_list {
    width: 82%;
    display: inline-block;
    height: 60px;
}

.classes-label {
    display: inline-block;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    padding: 0 20px 0 20px;

    background-color: rgba($color: #797979, $alpha: 0.2);
    border-radius: 5px;
    box-sizing: border-box;
    margin: 5px 8px;
}

.classes_show_bool {
    overflow: hidden;
}

//商品展示模块
.object-list {
    width: 1200px;
    margin: 0 auto;

    ul {
        list-style-type: none;
        margin: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    ul li {
        //display: inline-block;
        flex: 0 0 20%;
        padding: 10px 20px 10px 20px;
        //width: 300px;
        //height: 50%;
    }

    img {
        width: 100%;
        border: #666 1px solid;
        border-radius: 10px;
    }

    .title {
        font-size: 15px;
        line-height: 20px;
        text-align: center;
        color: rgb(119, 119, 119);
    }
}

.page-option {
    float: right;
    margin-right: 30px;
}
</style>
