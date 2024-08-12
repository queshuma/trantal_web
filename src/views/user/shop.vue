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
    
              <h2>我的购物车</h2>
              <div class="receive">
                请选择收件地址:
                <el-select v-model="receive" class="m-2" placeholder="请选择收件地址" style="width: 300px" @change=selectAlowEvent() >
                  <el-option v-for="item in receive_option" :key="item" 
                    :label="item.receiveAddress + '|' + item.receivePhone + '|' + item.receiveName" 
                    :value="item.receiveAddress + '|' + item.receivePhone + '|' + item.receiveName" />
                </el-select>
                <router-link :to="{ name:'address' }">
                  <span style="font-size:13px;color:rgb(0, 110, 255);cursor: pointer;">添加收件地址</span>
                </router-link>
              </div>
            
            <el-card class="box-card" v-for="o in shopData" :key="o">
              <el-checkbox size="large" @change="cardSelect(o)" class="select" :disabled=checkAllow />
              <div class="text item">
                <img :src=o.objectWithBussVO.objectBanner height="180px">
                <div class="info">
                  <router-link :to="{ name: 'detail', query: { id: o.objectWithBussVO.objectId } }">
                    <div class="name base">{{ o.objectWithBussVO.objectName }}</div>
                    <div class="classes base">分类: {{ o.objectWithBussVO.classesName }}</div>
                    <div class="title base">{{ o.objectWithBussVO.objectTitle }}</div>
                    <div class="price base"><span style="text-decoration:line-through;padding:0 5px 0 5px">{{
                      o.objectWithBussVO.objectPrice }}元</span>{{ o.objectWithBussVO.objectPrice }}元</div>
                    <div class="source base">来源: {{ o.objectWithBussVO.bussAccount }}</div>
                  </router-link>
                  <el-input-number v-model=o.shopCout :min="1" :max="10" @change="handleChange(o)" />
                </div>
              </div>
            </el-card>
            <div>
                  备注:
                    <el-input
        v-model="remark"
        :rows="3"
        type="textarea"
        placeholder="请输入备注:"
        style="margin-bottom:20px;"
      />
                </div>
            <div class="settle" id="settle">
              <span class="amount_div">已选择商品数: <span class="amount">{{ amount }}</span>个</span>
              | <span class="payment_div">总金额为: <span class="payment">{{ payment }}</span> 元</span>
              <button class="pay" @click="payEvent()">付款</button>
            </div>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>
        <indexBottom></indexBottom>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="js" setup>

import axios from 'axios';
import { onMounted, ref, reactive, VueElement } from 'vue';
import { useRouter } from 'vue-router'
import indexTop from '../../components/indexTop.vue';
import shopLeft from '../../components/shopLeft.vue';
import indexBottom from '../../components/indexBottom.vue'
import Decimal from 'decimal.js'
import link from "@/api/Link.js";

const shopData = ref()
const submitData = reactive([])
const payment = ref(0)
const amount = ref(0)
const receive = ref()
const remark = ref()
const receive_option = ref()
const checkAllow = ref(true)
let router = useRouter();

//初始化数据
onMounted(() => {
  console.log("test")
  //初始化购物车商品数据
  link("/Shop/info/userId", 'GET', {}, {}, {}, true).then(response => {
    // 处理获取到的数据
    shopData.value = response.data.result
  })

  link("/Receive/findByUserId", 'GET', {}, {}, {}, true).then(response => {
    // 处理获取到的数据
    receive_option.value = response.data.result
  })
})

//修改商品数量事件
const handleChange = (object) => {
  link("/Shop/update/cout", 'POST', {}, {
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
  submitData.forEach(element => {
    element.receiveAddress = receive.value.split('|')[0]
    element.receivePhone = receive.value.split('|')[1]
    element.receiveName = receive.value.split('|')[2]
    element.remark = remark.value
  });
  console.log(submitData)
  link("/Order/order", 'POST', {}, {'Content-Type': 'application/json'}, {}, true).then(response => {
    // 处理获取到的数据
    alert('付款成功!即将跳转到 我的订单 !')
    router.push('/User/Order')
  })
}

//滚轮监听事件，处理付款模块的位置问题
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
  var distanceFromBottom = document.body.scrollHeight - window.innerHeight - window.pageYOffset;
  var fixedDiv = document.getElementById("settle");
  // 检查 fixedDiv 是否为 null  
  if (fixedDiv === null) {
    // 如果为 null，则不执行任何操作或可以选择记录一个错误消息  
    // console.error("Element with ID 'settle' not found.");
    return; // 提前返回，避免后续代码执行  
  } 
  
  // console.log(distanceFromBottom)
  if (distanceFromBottom >= 220) {
    fixedDiv.classList.add("settle_fixed");
  } else {
    fixedDiv.classList.remove("settle_fixed");
  }
}

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
    width: 60%;
  }

  .base {
    font-size: 15px;
    line-height: 30px;
    color: black;
  }

  .name {
    font-size: 20px;
    font-weight: bolder;
  }

  .title,
  .source {
    color: #a09f9f;
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
.receive {
  margin: 20px 0;
}

</style>
