<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <indexTop></indexTop>
            </el-header>
            <el-container class="content">
                <el-aside width="200px">
                    <shopLeft></shopLeft>
                </el-aside>
                <el-container>
                    <el-main>

                        <h2>我的订单</h2>
                        <el-card class="box-card" v-for="o in orderData" :key="o">
                            <h4>订单编号:{{ o.orderUUID }}</h4>
                            <div class="text item">
                                <router-link :to="{ name: 'detail', query: { id: o.objectId } }">
                                <img :src=o.objectBanner height="180px">
                                </router-link>
                                <div class="info">
                                    <div class="name base">{{ o.objectName }}</div>
                                    <div class="classes base">分类: {{ o.classesName }}</div>
                                    <div class="price base"><span style="padding:0 5px 0 5px">{{
                                        o.objectPrice }} 元 </span>* {{ o.orderCout }} 个/件
                                    </div>
                                    <div class="source base">来源: {{ o.bussAccount }}</div>
                                    <div class="receive base">收件信息: {{ o.orderName }} {{ o.orderPhone }} {{
                                        o.orderAddress }}</div>
                                    <div class="base">备注:{{ o.orderInfo }}</div>
                                    <div class="base">快递单号:{{ o.orderTrack }}</div>
                                    <div class="base">状态:
                                        <el-button type="primary" size="small" v-if="o.orderStatus == 0">待寄出</el-button>
                                        <el-button type="success" size="small"
                                            v-else-if="o.orderStatus == 1">待收货</el-button>
                                            <!-- 确认收货按钮事件 -->
                                            <el-button type="warning" size="small"
                                                v-if="o.orderStatus == 1" round @click="receiveObject(o.orderUUID, o.objectId)">确认收货</el-button>
                                        <el-button type="default" size="small" v-else-if="o.orderStatus == 2">已收货</el-button>
                                        <el-button type="default" size="small" v-if="o.orderStatus == 2" @click="returnSale(o.orderUUID, o.objectId)">退货申请</el-button>
                                        <el-button type="warning" size="small" v-else-if="o.orderStatus == 3">发起退货</el-button>
                                        <el-button type="warning" size="small"
                                            v-else-if="o.orderStatus == 4">同意退货</el-button>
                                            <el-button type="warning" size="small"
                                                v-else-if="o.orderStatus == 5">取消订单</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer>
                <indexBottom></indexBottom>
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="js">

import axios from 'axios';
import { onMounted, ref, reactive, VueElement } from 'vue';
import indexTop from '../../components/indexTop.vue';
import shopLeft from '../../components/shopLeft.vue';
import indexBottom from '../../components/indexBottom.vue'
import Decimal from 'decimal.js'
import link from "@/api/Link.js";

const orderData = ref()
const submitData = reactive([])
const payment = ref(0)
const amount = ref(0)
const receive = ref()
const receive_option = ref([])
const checkAllow = ref(true)

//初始化数据
onMounted(() => {
    //初始化购物车商品数据
    link("/Order/info/user", 'GET', {}, {}, {}, true).then(response => {
      // 处理获取到的数据
      orderData.value = response.data.result
    })

  link("/Receive/findByUserId", 'GET', {}, {}, {}, true).then(response => {
    // 处理获取到的数据
    receive_option.value = response.data.result
  })
})

//修改商品数量事件
const handleChange = (object) => {
  link("/Shop/info/cout", 'PUT', {}, {
    shopId: object.shopId,
    objectCout: object.shopCout
  }, {}, true).then(response => {
    // 处理获取到的数据
    console.log(response)
  })

    payment.value = 0
    submitData.forEach(element => {
        const p = new Decimal(element.objectWithBussVO.objectPrice).times(new Decimal(element.shopCout))
        payment.value = new Decimal(payment.value).plus(p)
    })
}

//商品多选框事件
const cardSelect = (val) => {
    if (submitData.includes(val)) {
        const p = new Decimal(val.objectWithBussVO.objectPrice).times(new Decimal(val.shopCout))
        payment.value = new Decimal(payment.value).minus(p)
        // submitData.reduce(val)
        for (let i = 0; i < submitData.length; i++) {
            if (submitData[i] == val) {
                submitData.splice(i, 1)
            }
        }
    } else {
        const p = new Decimal(val.objectWithBussVO.objectPrice).times(new Decimal(val.shopCout))
        payment.value = new Decimal(payment.value).plus(p)
        submitData.push(val)
    }
    amount.value = submitData.length
    console.log(submitData)
}

//选择收件地址后，提供商品选择权限
const selectAlowEvent = () => {
    checkAllow.value = false
}

//付款动作后的事件
const payEvent = () => {

    // console.log(receive.value.key)
    submitData.forEach(element => {
        element.receiveAddress = receive.value.split('|')[0]
        element.receivePhone = receive.value.split('|')[1]
        element.receiveName = receive.value.split('|')[2]
    });
    console.log(submitData)
    link("/Order/order", 'POST', {}, {}, {'Content-Type': 'application/json'}, true).then(response => {
      // 处理获取到的数据
      console.log(response)
    })
}

//确认收货按钮事件
const receiveObject = function (orderUUID, objectId) { 
    const receiveStatus = 2
    link("/Order/status", 'PUT', {}, {
      orderUUID: orderUUID,
      objectId: objectId,
      orderStatus: receiveStatus
    }, {'Content-Type': 'application/json'}, true).then(response => {
      // 处理获取到的数据
      window.location.reload()
    })
}

//退货申请事件
const returnSale = function (orderUUID, objectId) { 
        const receiveStatus = 3
    link("/Order/status", 'PUT', {}, {
      orderUUID: orderUUID,
      objectId: objectId,
      orderStatus: receiveStatus
    }, {'Content-Type': 'application/json'}, true).then(response => {
      // 处理获取到的数据
      console.log(response)
      window.location.reload()
    })
}
</script>

<style lang="scss" scoped>
body {
    position: relative;
}

a {
    text-decoration: none;
}

.el-main {
    min-height: 800px;
}

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


.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
    display: inline;
}

.box-card {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;

    .info {
        display: inline-block;
        vertical-align: top;
        padding-left: 30px;
    }

    .base {
        font-size: 15px;
        line-height: 30px;
        color: black;
    }

    .name {
        font-size: 20px;
        font-weight: bolder;
        display: inline-block;
    }

    .classes {
        display: inline-block;
    }

    .source {
        color: #a09f9f;
    }

    .receive {
        font-size: 15px;
        line-height: 20px;
    }
}

.select {
    padding: 0 30px;
}

.settle {
    z-index: 99;
    width: 900px;
    height: 80px;
    padding: 0 0 0 30px;
    background-color: #fd4b33;
    color: antiquewhite;
    position: relative;
    margin: 20px 0 0 0;
    border: 0;
    border-radius: 10px;

    span {
        font-size: 10px;
        line-height: 80px;
    }

    .amount_div {
        display: inline-block;
        width: 110px;
    }

    .amount {
        font-size: 15px;
    }

    .payment_div {
        display: inline-block;
        width: 550px;
    }

    .payment {
        font-size: 20px;
        font-weight: 800;
    }

    .pay {
        background-color: #fff;
        color: #fd4b33;
        font-weight: 300;
        font-size: 20px;
        ;
        width: 120px;
        line-height: 40px;
        border-radius: 10px;
        cursor: pointer;
    }
}

.el-footer {
    padding: 0;
    margin: 0;
}

.settle_fixed {
    position: fixed;
    bottom: 0;
    margin: 0;
}
</style>
