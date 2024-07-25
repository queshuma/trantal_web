<template>
    <div>
        <div class="base">
            <div class="base_image">
                <el-carousel :interval="5000" arrow="always" height="500px">
                    <el-carousel-item v-for="item in data.objectImage" :key="item" class="base_image_item">
                        <img :src=item alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="base_info">
                <h1 class="info_base">{{ data.objectTitle }}</h1>
                <div class="small_gray info_base">商品来源: {{ data.bussAccount }}</div>
                <div class="small_gray info_base">商品编号: {{ data.objectUUID }}</div>
                <div class="small_gray info_base">
                    商品信息: {{ data.objectInfo }}
                </div>
                <div class="retail_sell">
                    <div class="info_base retail ">零售价格: {{ data.objectCost }}</div>
                    <div class="info_base sell">当前价格: {{ data.objectPrice }}</div>
                </div>
                <div class="cout small_gray info_base">剩余商品: {{ data.objectCout }}</div>
                <div class="send_address">
                    <div class="info_base">配送地址:</div>
                    <div class="info_base address">浙江省绍兴市上虞区</div>
                </div>
                <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" class="info_base" />
                <div class="info_base todo">
                    <div class="todo_button add_shop" @click="insertShop">加入购物车</div>
                    <div class="todo_button buy_shop" @click="toShop">购买商品</div>
                </div>
            </div>
            <div class="base_detail">
                <div class="title">
                    商品详情
                </div>
                <hr>
                <div class="image">
                    <ul>
                        <li v-for="val in data.objectImg" :key="val">
                            <img :src="val" width="100%">
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="js" setup>
import { onMounted, reactive, ref } from "vue"
import axios from "axios"
import token from '../api/Token.js'
import { useRouter } from "vue-router";

const data = ref({})
const num = ref(1)
const router = useRouter()

const handleChange = (value) => {
    console.log(value)
}
const getObjData = function(id) {
    axios.request({
        url: 'http://localhost/Object/info/id',
        method: 'get',
        params: { objectId: id },
        data: {}
    })
        .then(response => {
            // 处理获取到的数据
            console.log(response.data.result)
            data.value = response.data.result
            // data = data.value
            data.value.objectImage = data.value.objectImage.split(',')
            data.value.objectImg = data.value.objectImg.split(',')
            console.log(data.value)
        })
}
onMounted(() => {
    let queryData = window.location.search;
    const params = new URLSearchParams(queryData);
    // 遍历所有查询参数，并存储到字典中
    const queryDict = {};
    for (let [key, value] of params) {
        queryDict[key] = value;
    }
    if ('id' in queryDict) {
        console.log("执行")
        getObjData(queryDict['id'])
    } else { 
        alert('无此商品')
    }
})
const insertShop = function () { 
    let tk = token();
    console.log(tk.userLevel)
    if (tk == null) {
        alert("您未登录,请先登录!")
        router.push('/login');
        return;
    } else if (tk.userLevel >= 2) { 
        alert("您无权限,请先切换账号!")
        router.push('/login');
        return;
    }
    axios.request({
        url: 'http://localhost/Shop/shop',
        method: 'post',
        params: {
            objectId: data.value.objectId,
            shopCout: 1
        },
        data: {},
        withCredentials: true, // 确保发送凭据
    })
        .then(response => {
            console.log(response.data)
            alert("添加购物车成功!")
        })

}
const toShop = function () { 
    router.push('/User/Shop')
}

</script>

<style lang="scss" scoped>
ul {
    padding: 0;
}

ul li {
    list-style: none;
    margin: 0;
    padding: 0;
}

/*
灰色、小号字体
商品来源、剩余商品、发货地址
*/
.small_gray {
    color: rgb(136, 136, 136);
    font-size: 10px;
    line-height: 20px;
}

/*
轮播图大小及边缘设置
*/
.el-carousel {
    width: 400px;
    height: 450px;
    border: #d3dce6 3px solid;
    border-radius: 10px;
    background-color: #fff;
}

/*
页面左侧轮播图
*/
.base_image {
    display: inline-block;

    //margin-top: 35px;
    img {
        width: 400px;
        height: auto;
    }
}

/*
右侧信息样式，包含通用及一级模块
*/
.base_info {
    display: inline-block;
    vertical-align: top;
    width: 700px;

    .info_base {
        margin: 5px 0px 20px 40px;
    }

    .info {
        padding-left: 20px;
        width: 70%;
    }

    h1 {
        white-space: nowrap;
        overflow: hidden;
        margin-top: 30px;
    }
}

/*
地址模块样式
*/
.send_address {
    div {
        display: inline-block;
        vertical-align: top;
    }

    .address {
        font-size: 10px;
        font-weight: 100;
    }
}

/*
建议零售价、当前价格的设置
*/
.retail_sell {
    font-size: 18px;
    ;
    line-height: 25px;

    .retail {
        display: inline-block;
        color: rgba(239, 59, 23, 0.901);
        margin-top: 0;
        margin-bottom: 0;
    }

    .sell {
        display: inline-block;
        margin: 0;
        margin-left: 10px;
        color: #fff;
        padding: 10px;
        border: #ffffff 1px solid;
        border-radius: 30px;
        background-color: rgba(239, 59, 23, 0.901);
    }
}

/*
添加购物车、购买商品样式
*/
.todo {
    .todo_button {
        line-height: 40px;
        font-size: 20px;
        height: 40px;
        width: 30%;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        border: #787878 1px solid;
    }

    .add_shop {
        background-color: #fff;
        color: rgb(255, 68, 0);
        border-radius: 10px 0 0 10px;
        cursor: pointer;
    }

    .buy_shop {
        background-color: rgb(255, 68, 0);
        color: #fff;
        border-radius: 0 10px 10px 0;
        cursor: pointer;
    }
}

.base_detail {
    .title {
        font-size: 20px;
        line-height: 40px;
        margin-top: 20px;
        text-align: center;
    }

    .image {
        margin-top: 30px;
    }
}
</style>