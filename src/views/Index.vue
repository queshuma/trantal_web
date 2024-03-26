<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <indexTop></indexTop>
            </el-header>
            <el-main>
                <div class="classes_list">
                    <ul>
                        <div v-for="ocl in objectClassList" :key="ocl">
                            <router-link :to="{ name: 'ObjectList', query: { classes: ocl.label } }">
                                <li>{{ ocl.classesName }}</li>
                            </router-link>
                        </div>
                    </ul>
                </div>
                <el-carousel class="run_banner" :interval="5000" arrow="always">
                    <el-carousel-item v-for="item in bannerList" :key="item"  style="height: 340px;">
                        <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
                        <img :src=item height="340px">
                    </el-carousel-item>
                </el-carousel>

                <div class="advertis">
                    | 数派 -- π -- 甄选 |
                </div>
                <div class="object_list" v-for="val in objectModelList" :key="key">

                    <div class="classes_title">
                        {{ val.classesName.split('|')[0] }}
                    </div>
                    <div class="classes_object">
                        <ul>
                            <li v-for=" info  in  objectList[val.classesName] " :key="info">
                                <router-link :to="{ name: 'detail', query: { id: info.objectId } }">
                                    <img :src=info.objectBanner>
                                    <div class="title">{{ info.objectName }}</div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <!-- </router-link> -->
                </div>

                <!-- <div class="brand_list">
                    <h1>合作品牌商</h1>
                    <el-row>
                        <el-col v-for="(o, index) in 5" :key="o" :span="4" :offset="index > 0 ? 1 : 0">
                            <el-card :body-style="{ padding: '0px' }">
                                <img src="http://localhost:8898/images/logo_lucency.png" class="image" />
                                <div>
                                    <div class="title">Yummy hamburger</div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div> -->

            </el-main>
            <el-footer>
                <indexBottom></indexBottom>
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="js">

import axios from 'axios';
import { onMounted, ref, reactive } from 'vue';
import indexTop from '../components/indexTop.vue'
import indexBottom from '../components/indexBottom.vue'

const objectClassList = ref({})
const objectList = ref({})
const currentDate = ref(new Date())
const objectModelList = ref({})
const bannerList = [
    "http://localhost:8898/poster/poster_dajiang.jpg",
    "http://localhost:8898/poster/poster_apple.jpg",
    "http://localhost:8898/poster/poster_xiaomi.jpg",
    "http://localhost:8898/poster/poster_pico.jpg"
]

onMounted(() => { 
    //获取列表分类
    axios.request({
        url: 'http://localhost/ObjClasses/info/listStatus',
        method: 'GET',
        params: {},
        data: {}
    })
        .then(response => {
            // 处理获取到的数据
            console.log(response.data.result)
            objectClassList.value = response.data.result
            // getObjectList(objectClassList)
        })

        //获取商品分类
        axios.request({
        url: 'http://localhost/ObjClasses/info/objectStatus',
        method: 'GET',
        params: {},
        data: {}
    })
        .then(response => {
            // 处理获取到的数据
            objectModelList.value = response.data.result
            // getObjectList(response.data.result)
            getObjectList()
        })
})

const getObjectList = function () {
    for (let i = 0; i < objectModelList.value.length; i++) {
        const oclLabel = objectModelList.value[i].classesName
        console.log(oclLabel)
        axios.request({
            url: 'http://localhost/Object/info/classes',
            method: 'get',
            params: { classesName: oclLabel, pageNum:0, pageSize:8 },
            data: {}
        })
            .then(response => {
                // 处理获取到的数据
                const data = response.data.result
                console.log(response.data.result);
                (objectList.value)[oclLabel] = data;
                console.log(objectList.value)
            })
        // if (i >= 8) { 
        //     break;
        // }
    }
}

</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
}

.el-main {
    //width: 80%;
    width: 1100px;
    margin: 0 auto;
    padding: 0;

}

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

.classes_list {
    width: 200px;
    display: inline-block;
    vertical-align: top;
    height: 340px;

    ul {
        list-style: none;
        background-color: #666;
        height: 100%;
        padding: 10% 0 0% 0;
        margin: 0;
        display: flex;
        flex-direction: column;

        li {
            flex: 1;
            margin: 0;
            padding: 0;
            line-height: 40px;
            font-size: 15px;
            padding-left: 10%;
            color: #e8e8e8;
        }

        li:hover {
            background-color: rgb(241, 60, 60);
        }
    }
}

.advertis {
    height: 100px;
    width: 100%;
    background-color: #39c2fd;
    margin: 30px 0;
    color: #666;
    line-height: 100px;
    font-size: 30px;
    text-align: center;
    font-weight: 100;
}

.object_list {
    width: 100%;
    margin: 30px 0;

    .classes_title {
        background: white;
        width: 220px;
        height: 480px;
        display: inline-block;
        vertical-align: top;
        font-size: 30px;
        line-height: 400px;
        text-align: center;
        border: #666 1px solid;
    }

    .classes_object {
        //background: #000;
        height: 400px;
        width: 880px;
        display: inline-block;
        color: white;

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
            display: inline-block;
            //flex: 0 0 25%;
            display: inline-block;
            vertical-align: top;
            width: 210px;
            padding: 10px 20px 0 20px;
            //width: 300px;
            //height: 50%;
        }

        img {
            width: 90%;
            border: #666 1px solid;
            border-radius: 10px;
            margin-bottom: 10px;
        }

        .title {
            font-size: 15px;
            line-height: 20px;
            text-align: center;
            color: rgb(119, 119, 119);
        }
    }
}

.brand_list {
    margin-top: 60px;

    .bottom {
        margin-top: 13px;
        line-height: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .image {
        width: 100%;
        display: block;
    }

    .title {
        text-align: center;
    }
}

.run_banner {
    width: 900px;
    height: 340px;
    display: inline-block;
    background-color: red;
}
</style>
