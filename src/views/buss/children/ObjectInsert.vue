<template>
    <div class="content">
        <el-form ref="ruleFormRef" :inline="true" label-width="120px" class="demo-form-inline" :size="formSize" status-icon>
            <el-form-item label="商品名称"  placeholder="举例: 紫米充电宝PD1000" >
                <el-input v-model="data.objectName" />
            </el-form-item>
            <el-form-item label="商品标题">
                <el-input v-model="data.objectTitle"  placeholder="" />
            </el-form-item>
            <el-form-item label="商品分类">
                <el-select v-model="data.objectClasses" placeholder="Activity zone">
                    <el-option v-for="cd in classesData" :key="cd.id" :label="cd.label" :value="cd.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="建议零售价">
                <el-input v-model="data.objectCost" placeholder="举例: 10.00" />
            </el-form-item>
            <el-form-item label="商品现价">
                <el-input v-model="data.objectPrice" placeholder="举例: 10.00" />
            </el-form-item>
            <el-form-item label="商品库存">
                <el-input v-model="data.objectCout" placeholder="举例: 10" />
            </el-form-item>
            <el-form-item label="商品状态">
                <el-select v-model="data.objectStatus" placeholder="请选择商品状态">
                    <el-option label="上架" value="1" />
                    <el-option label="下架" value="2" />
                </el-select>
            </el-form-item>
            <el-form-item label="商品信息">
                <el-input v-model="data.objectInfo" type="textarea" class="text" placeholder="举例: 品牌：Asus/华硕系列：X550VC内存容量：16g,32GB
硬盘容量：1TB,2TB,512GBCPU：英特尔 酷睿 i9-13900H售后服务：全国联保
屏幕比例：16:10显存容量：共享系统内存光驱类型：无光驱" />
            </el-form-item>
            <el-form-item label="商品缩略图" style="width: 60%;">
                <el-upload v-model:file-list="imageList"  action="http://localhost/Object/uploadImage"
                    list-type="picture-card" :on-success="handleImageSuccess" :data=saveInfo
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :limit="6" :multiple="true">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible" style="width: 60%;">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品海报" style="width: 60%;">
                <el-upload v-model:file-list="bannerList" action="http://localhost/Object/uploadBanner" :data=saveInfo
                    list-type="picture-card" :on-success="handleBannerSuccess" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" :limit="1">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品详情" style="width: 100%;">
                <el-upload v-model:file-list="imgList" action="http://localhost/Object/uploadImg" :data=saveInfo list-type="picture-card"
                    :on-success="handleImgSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                    :limit="10" :multiple="true">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">
                    添加货品
                </el-button>
                <el-button @click="reset">清空选项</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="js" setup>
import { reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios'
import token from '../../../api/Token.js'

const formSize = ref('default')
const ruleFormRef = ref()
const data = reactive({
    objectName: '',
    objectTitle: '',
    objectCost: '',
    objectPrice: '',
    objectInfo: '',
    objectCout: '',
    objectImage: '',
    objectStatus: '',
    objectClasses: '',
    objectBanner: '',
    objectImg: ''
})
const classesData = ref([])
const imageFiles = ref([])
const bannerFiles = ref([])
const imgFiles = ref([])
const saveInfo = ref({})
const uuid = Date.now()

// const saveInfo = Date.now()
saveInfo.value = {
    uuid: uuid,
}

axios.request({
    url: 'http://localhost/ObjClasses/info/all',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // 确保发送凭据
    params: {},
    data: {}
})
    .then(response => {
        classesData.value = response.data.result[0].children
        console.log(classesData.value)
    })

const submit = () => {
    data.objectImage = imageFiles.value.toString()
    data.objectBanner = bannerFiles.value.toString()
    data.objectImg = imgFiles.value.toString()
    data.userId = token().sub
    data.objectUUID = saveInfo.value.uuid
    console.log(data)
    axios.request({
        url: 'http://localhost/Object/object',
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // 确保发送凭据
        params: {
            objectUUID: data.objectUUID,
            objectName: data.objectName,
            objectTitle: data.objectTitle,
            objectCost: data.objectCost,
            objectImage: data.objectImage,
            objectBanner: data.objectBanner,
            objectImg: data.objectImg,
            objectPrice: data.objectPrice,
            objectCout: data.objectCout,
            objectClasses: data.objectClasses,
            objectInfo: data.objectInfo,
            userId: data.userId,
        },
    })
        .then(response => {
            console.log(response.data)
        })
}

const resetForm = () => {

}

const fileList = ref([

])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleImageSuccess = (
    response,
    uploadFile
) => {
    const info = JSON.stringify(response)
    imageFiles.value.push(JSON.parse(info).result)
}
const handleBannerSuccess = (
    response,
    uploadFile
) => {
    const info = JSON.stringify(response)
    bannerFiles.value.push(JSON.parse(info).result)
}
const handleImgSuccess = (
    response,
    uploadFile
) => {
    const info = JSON.stringify(response)
    imgFiles.value.push(JSON.parse(info).result)
}

const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview= (uploadFile) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}
</script>
<style lang="scss" scoped>
.content {
    width: 80%;
    margin: 40px auto;
}

.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}

.text {
    width: 600px;
}
</style>
