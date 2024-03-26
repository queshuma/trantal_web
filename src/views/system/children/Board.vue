<template>
  <div class="content">
    <h2 style="text-align: center;color: blue;">数派π | 数智智慧大屏</h2>
    <el-row style="box-shadow: ;">
      <el-col :span="6">
        <el-statistic title="商品数量" :value=data.objectCout />
      </el-col>
      <el-col :span="6">
        <el-statistic title="上架商品数量" :value=data.norObjectCout />
      </el-col>
      <el-col :span="6">
        <el-statistic title="下架商品数量" :value=data.errObjectCout />
      </el-col>
      <el-col :span="3">
        <el-statistic title="加购人数" :value=data.personCout />
      </el-col>
      <el-col :span="3">
        <el-statistic title="加购数量" :value=data.shopCout />
      </el-col>
      <el-col :span="3">
        <el-statistic title="订单完成数量" :value=data.completeCout />
      </el-col>
      <el-col :span="3">
        <el-statistic title="消费完成金额" :value=data.completeGather />
      </el-col>
      <el-col :span="3">
        <el-statistic title="待发货订单数" :value=data.noTrackCout />
      </el-col>
      <el-col :span="3">
        <el-statistic title="待发货订单金额" :value=data.noTrackGather />
      </el-col>
      <el-col :span="3">
        <el-statistic title="待收货订单数" :value=data.noReceiveCout />
      </el-col>
      <el-col :span="3">
        <el-statistic title="待收货订单金额" :value=data.noReceiveGather />
      </el-col>
      <el-col :span="3">
        <el-statistic title="退货待处理数" :value=data.orderBackCout />
      </el-col>
      <el-col :span="3">
        <el-statistic title="退货待处理金额" :value=data.orderBackGather />
      </el-col>
    </el-row>
    <div class="object_echarts" id="object_echarts">

    </div>
    <div class="order_echarts" id="order_echarts">

    </div>
  </div>
</template>

<script lang="js" setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { useTransition } from '@vueuse/core'
import axios from 'axios'
import * as echarts from 'echarts';

const data = reactive({
  //商品数量
  objectCout: 0,
  //上架商品数量
  norObjectCout: 0,
  //下架商品数量
  errObjectCout: 0,
  //加入购物车的人数
  personCout: 0,
  //商品加入购物车数量
  shopCout: 0,
  //待发货订单数
  noTrackCout: 0,
  //待发货订单金额
  noTrackGather: 0,
  //待收货订单数
  noReceiveCout: 0,
  //待收货订单金额
  noReceiveGather: 0,
  //退货待处理数
  orderBackCout: 0,
  //退货待处理金额
  orderBackGather: 0,
  //退单处理订单数
  affirmBackCout: 0,
  //退单处理金额
  affirmBackGather: 0,
  //取消订单数
  cancelCout: 0,
  //取消金额
  cancelGather: 0,
  //确认收货订单数
  completeCout: 0,
  //确认收货金额
  completeGather: 0,
})

onMounted(() => {
  getData()
  objectEcharts()
})

const getData = function () {
  //查询商品数量
  getCout()
  //查询上架商品数量
  getNorCout()
  //查询下架商品数量
  getErrCout()
  //查询加入购物车数量
  shopCout()
  //查询加入购物车的人数
  personCout()
  //查询订单完成的金额
  complete()
  //查询待发货的订单信息
  noTrack()
  //查询未收货的订单信息
  noReceive()
  //查询退货处理的订单信息
  orderBack()
  //取消订单信息
  cancel()
}


//查询商品数量
const getCout = function () {
  axios.request({
    url: 'http://localhost/Object/cout',
    method: 'GET',
    params: {
    },
    data: {
    },
    withCredentials: true
  })
    .then(response => {
      // 处理获取到的数据
      data.objectCout = response.data.result
    })
}

//查询上架商品数量
const getNorCout = function () {
  axios.request({
    url: 'http://localhost/Object/nor/cout',
    method: 'GET',
    params: {
    },
    data: {
    },
    withCredentials: true
  })
    .then(response => {
      // 处理获取到的数据
      data.norObjectCout = response.data.result
    })
}

//查询下架商品数量
const getErrCout = function () {
  axios.request({
    url: 'http://localhost/Object/err/cout',
    method: 'GET',
    params: {
    },
    data: {
    },
    withCredentials: true
  })
    .then(response => {
      // 处理获取到的数据
      data.errObjectCout = response.data.result
    })
}

//查询加入购物车数量
const shopCout = function () {
  axios.request({
    url: 'http://localhost/Shop/cout',
    method: 'GET',
    params: {
    },
    data: {
    },
    withCredentials: true
  })
    .then(response => {
      data.shopCout = response.data.result
    })
}


//查询加入购物车的人数
const personCout = function () {
  axios.request({
    url: 'http://localhost/Shop/person/cout',
    method: 'GET',
    params: {
    },
    data: {
    },
    withCredentials: true
  })
    .then(response => {
      data.personCout = response.data.result
    })
}

//查询订单完成的金额
const complete = function () {
  axios.request({
    url: 'http://localhost/Order/complete',
    method: 'GET',
    params: {
    },
    data: {
    },
    withCredentials: true
  })
    .then(response => {
      // 处理获取到的数据
      data.completeCout = response.data.result.orderCout
      data.completeGather = response.data.result.orderGather
    })
}

//查询待发货的订单信息
const noTrack = function () {
  axios.request({
    url: 'http://localhost/Order/noTrack',
    method: 'GET',
    params: {
    },
    data: {
    },
    withCredentials: true
  })
    .then(response => {
      // 处理获取到的数据
      data.noTrackCout = response.data.result.orderCout
      data.noTrackGather = response.data.result.orderGather
    })
}

//查询未收货的订单信息
const noReceive = function () {
  axios.request({
    url: 'http://localhost/Order/noReceive',
    method: 'GET',
    params: {
    },
    data: {
    },
    withCredentials: true
  })
    .then(response => {
      // 处理获取到的数据
      data.noReceiveCout = response.data.result.orderCout
      data.noReceiveGather = response.data.result.orderGather
    })
}

//查询退货处理的订单信息
const orderBack = function () {
  axios.request({
    url: 'http://localhost/Order/orderBack',
    method: 'GET',
    params: {
    },
    data: {
    },
    withCredentials: true
  })
    .then(response => {
      // 处理获取到的数据
      console.log(response.data.result)
      data.orderBackCout = response.data.result.orderCout
      data.orderBackGather = response.data.result.orderGather
    })
}

//取消订单信息
const cancel = function () {
  axios.request({
    url: 'http://localhost/Order/cancel',
    method: 'GET',
    params: {
    },
    data: {
    },
    withCredentials: true
  })
    .then(response => {
      // 处理获取到的数据
      data.cancelCout = response.data.result.orderCout
      data.cancelGather = response.data.result.orderGather
    })
}

//商品数据图事件
const objectEcharts = function () {
  var chartDom = document.getElementById('object_echarts');
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '商品数量',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: data.norObjectCout, name: '上架商品数' },
          { value: data.errObjectCout, name: '下架商品数' },
        ]
      }
    ]
  };

  option && myChart.setOption(option);
}

//订单数据图事件
const orderEcharts = function () {
  var chartDom = document.getElementById('order_echarts');
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      data: [
        '已收货',
        '待发货',
        '待收货',
        '退货',
        '取消'
      ]
    },
    series: [
      {
        name: '订单数',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '23%'],
        label: {
          position: 'inner',
          fontSize: 14
        },
        labelLine: {
          show: false
        },
        data: [
          { value: data.completeCout, name: '已收货', selected: true },
          { value: data.noTrackCout, name: '待发货', selected: true },
          { value: data.noReceiveCout, name: '待收货', selected: true },
          { value: data.noReceiveCout, name: '退货', selected: true },
          { value: data.cancelCout, name: '取消', selected: true }
        ]
      },
      {
        name: '消费金额',
        type: 'pie',
        radius: ['30%', '50%'],
        labelLine: {
          length: 30
        },
        label: {
          formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
          backgroundColor: '#F6F8FC',
          borderColor: '#8C8D8E',
          borderWidth: 1,
          borderRadius: 10,
          rich: {
            a: {
              color: '#6E7079',
              lineHeight: 20,
              align: 'center'
            },
            hr: {
              borderColor: '#8C8D8E',
              width: '100%',
              borderWidth: 2,
              height: 0
            },
            b: {
              color: '#4C5058',
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 33
            },
            per: {
              color: '#fff',
              backgroundColor: '#4C5058',
              padding: [3, 4],
              borderRadius: 4
            }
          }
        },
        data: [
          { value: data.completeGather, name: '已收货' },
          { value: data.noTrackGather, name: '待发货' },
          { value: data.noReceiveGather, name: '待收货' },
          { value: data.noReceiveGather, name: '退货' },
          { value: data.cancelGather, name: '取消' }
        ]
      }
    ]
  };

  option && myChart.setOption(option);
}

//暂时替代
setTimeout(() => {
  objectEcharts(); // 在延迟后执行的函数
  orderEcharts()
}, 1000); 
</script>

<style scoped>
.el-col {
  text-align: center;
}

.content {
  width: 80%;
  margin: 20px auto;
}

.object_echarts {
  display: inline-block;
  width: 30%;
  height: 600px;
  vertical-align: top;
  margin-top: 30px;
}

.order_echarts {
  display: inline-block;
  width: 70%;
  height: 600px;
  vertical-align: top;
  margin-top: 10px;
}

.el-col {
  height: 50px;
}
</style>
