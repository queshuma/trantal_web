<template>
    <div class="content">
        <h1>订单处理</h1>
        <el-form :inline="true" label-width="180px" class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="订单编号">
                <el-input v-model=orderData.orderUUID disabled="true"/>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model=orderData.objectName style="width: 300px;" disabled="true"/>
            </el-form-item>
                        <el-form-item label="商品标题">
                    <el-input v-model=orderData.objectTitle style="width: 600px;" disabled="true"/>
                </el-form-item>
            <el-form-item label="商品分类">
                <el-input v-model=orderData.classesName style="width: 200px;" disabled="true"/>
            </el-form-item>
            <el-form-item label="消费者Id">
                <el-input v-model=orderData.userId disabled="true" />
            </el-form-item>
            <el-form-item label="商品原价">
                <el-input v-model=orderData.objectCost disabled="true" />
            </el-form-item>
            <el-form-item label="下单价格">
                <el-input v-model=orderData.objectPrice disabled="true" />
            </el-form-item>
            <el-form-item label="下单数量">
                <el-input v-model=orderData.orderCout disabled="true" />
            </el-form-item>
            <el-form-item label="下单时间">
                <el-input v-model=orderData.orderTime disabled="true" />
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model=orderData.orderPhone style="width: 500px;" disabled="true" />
            </el-form-item>
            <el-form-item label="收件人">
                <el-input v-model=orderData.orderName style="width: 500px;" disabled="true" />
            </el-form-item>
            <el-form-item label="收件地址">
                <el-input v-model=orderData.orderAddress style="width: 500px;" disabled="true" />
            </el-form-item>
            <el-form-item label="快递单号">
                <el-input v-model=orderData.orderTrack style="width: 500px;" />
                <el-button style="color: rgb(115, 115, 247);" @click="uploadTrack()">添加/修改快递单号</el-button>
            </el-form-item>
            <el-form-item label="订单状态">
                    <div class="base">状态:
                                            <el-button type="primary" size="small" v-if="orderData.orderStatus == 0">待寄出</el-button>
                                            <el-button type="info" size="small"
                                                v-else-if="orderData.orderStatus == 1">待收货</el-button>
                                            <el-button type="success" size="small" v-else-if="orderData.orderStatus == 2">已收货</el-button>
                                            <el-button type="danger" size="small" v-else-if="orderData.orderStatus == 3" disabled="true">发起退货</el-button>
                                            <el-button type="danger" size="small" v-if="orderData.orderStatus == 3" @click="orderStatusEvent(1)">同意退货</el-button>
                                            <el-button type="danger" size="small" v-if="orderData.orderStatus == 3" @click="orderStatusEvent(2)">拒绝退货</el-button>
                                            <el-button type="warning" size="small"
                                                v-else-if="orderData.orderStatus == 4">同意退货</el-button>
                                                <el-button type="danger" size="small"
                                                    v-else-if="orderData.orderStatus == 5">取消订单</el-button>
                                                    <el-button type="default" size="small" v-if="orderData.orderStatus == 4" @click="orderStatusEvent(3)">取消订单</el-button>
                                        </div>
                </el-form-item>

        </el-form>
    </div>
</template>

<script lang="js" setup>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
import link from "@/api/Link.js";

const router = useRouter();
const formSize = ref('default')
const orderData = ref({})
const orderUUID = ref()
const objectId = ref()

onMounted(() => {
    //获取cookie中的值，并进行跳转
    const queryDict = router.currentRoute.value.query
    if ("orderUUID" in queryDict && "objectId" in queryDict) {
        orderUUID.value = queryDict["orderUUID"]
        objectId.value = queryDict["objectId"]
      link("/Order/info/orderUUID", 'GET', {}, {
        orderUUID: orderUUID.value,
        objectId: objectId.value
      }, {}).then(response => {
        // 处理获取到的数据
        orderData.value = response.data.result
      })
    }
})

const uploadTrack = function () {
  link("/Order/track", 'PUT', {}, {
    orderUUID: orderUUID.value,
    objectId: objectId.value,
    orderTrack: orderData.value.orderTrack,
  }, {}, true).then(response => {
    // 处理获取到的数据
    window.location.reload()
  })
}

const orderStatusEvent = function (num) { 
    var updOrderStatus = 0;
    //
    if (num == 1) {
        updOrderStatus = 4
    } else if (num == 2) {
        updOrderStatus = 2
    } else if (num == 3) {
        updOrderStatus = 5
     }
  link("/Order/status", 'PUT', {}, {
    orderUUID: orderUUID.value,
    objectId: objectId.value,
    orderStatus: updOrderStatus,
  }, {}, true).then(response => {
    // 处理获取到的数据
    window.location.reload()
  })
}

</script>

<style lang="scss" scoped>
.content {
    width: 80%;
    margin: 20px auto;
}
</style>