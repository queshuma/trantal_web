<template>
    <el-dialog v-model="$store.state.HomeModule.objectEditVisible" title="修改商品信息">
        <el-form>
            <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="data.objectName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品编号" :label-width="formLabelWidth">
                <el-input v-model="data.objectUUID" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品标题" :label-width="formLabelWidth">
                <el-input v-model="data.objectTitle" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
            </el-form-item>
            <el-form-item label="商品原价" :label-width="formLabelWidth">
                <el-input v-model="data.objectCost" autocomplete="off" :disabled=true />
            </el-form-item>
            <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input v-model="data.objectPrice" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品信息" :label-width="formLabelWidth">
                <el-input v-model="data.objectInfo" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
            </el-form-item>
            <el-form-item label="商品图片" :label-width="formLabelWidth">
                <el-upload action="http://localhost/Object/uploadImage" list-type="picture-card" :auto-upload=true
                    :on-success="handleAvatarSuccess" :multiple=true :data=saveInfo :file-list=imageList
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :limit="6" :on-exceed="handleExceed">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <template #file="{ fileList }">
                        <div v-for="(file, index) in fileList" :key="index">
                            <img el-upload-list__item-thumbnail :src="file" alt="" />
                        </div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品分类" :label-width="formLabelWidth">
                <el-input v-model="data.objectClasses" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品所属" :label-width="formLabelWidth">
                <el-input v-model="data.userId" autocomplete="off" :disabled=true />
            </el-form-item>
            <el-form-item label="商品轮播图" :label-width="formLabelWidth">
                <el-upload action="http://localhost/Object/uploadBanner" list-type="picture-card" :auto-upload=true
                    :on-success="handleBannerSuccess" :data=saveInfo :file-list=bannerList
                    :on-preview="handlePictureCardPreview" :on-remove="bannerRemove" :limit="1" :on-exceed="handleExceed">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <template #file="{ bannerList }">
                        <div v-for="(file, index) in bannerList" :key="index">
                            <img el-upload-list__item-thumbnail :src="file" alt="" />
                        </div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品详情图" :label-width="formLabelWidth">
                <el-upload action="http://localhost/Object/uploadImg" list-type="picture-card" :auto-upload=true
                    :on-success="handleImgSuccess" :multiple=true :data=saveInfo :file-list=imgList
                    :on-preview="handlePictureCardPreview" :on-remove="imgRemove" :limit="6" :on-exceed="handleExceed">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <template #file="{ imgList }">
                        <div v-for="(file, index) in imgList" :key="index">
                            <img el-upload-list__item-thumbnail :src="file" alt="" />
                        </div>
                    </template>
                </el-upload>
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancelForm">取消</el-button>
                <el-button type="primary" @click="formUpdate">
                    修改
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="js" setup>
import { reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

let store = useStore()

const formLabelWidth = '140px'
const data = ref()
//前端用来存储的Image图片数据
const fileData = ref([])
const imageFiles = ref([])
//前端用来存储的Banner图片数据
const bannerData = ref([])
//前端用来存储的img图片数据
const imgData = ref([])
//(Image)图片展示绑定的数据
const fileList = ref()
//(Banner)图片展示绑定的数据
const bannerList = ref()
//（img）图片展示绑定数据
const imgList = ref()
//上传图片是提供的商品数据
const saveInfo = ref()
//暂存
const imageList = ref([])

watch(() => store.state.HomeModule.currentObjectInfo, (newValue) => {
    data.value = newValue
    console.log("Image: " + typeof newValue.objectImage)
    console.log("Banner: " + typeof newValue.objectBanner)
    console.log("Img: " + typeof newValue.objectImg)
    if (newValue.objectImage != '') {
        data.value.objectImage = newValue.objectImage.toString().split(',')
        imageList.value = newValue.objectImage.toString().split(',').map(url => ({ url }))
    } else {
        data.value.objectImage = []
        console.log("objectImage:为空")
    }
    if (newValue.objectBanner.trim().length != 0) {
        data.value.objectBanner = newValue.objectBanner.toString().split(',')
        bannerList.value = newValue.objectBanner.toString().split(',').map(url => ({ url }))
    } else {
        data.value.objectBanner = []
    }
    if (newValue.objectImg.trim() != '') {
        data.value.objectImg = newValue.objectImg.toString().split(',')
        imgList.value = newValue.objectImg.toString().split(',').map(url => ({ url }))
    } else {
        data.value.objectImg = []
    }

    saveInfo.value = {
        uuid: data.value.objectUUID
    }
});

let formUpdate = () => {
    store.commit("DIALOG")

    data.value.objectImage = data.value.objectImage.toString()
    data.value.objectBanner = data.value.objectBanner.toString()
    data.value.objectImg = data.value.objectImg.toString()
    axios.request({
        url: 'http://localhost/Object/object',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // 确保发送凭据
        params: {
            objectId: data.value.objectId,
            objectName: data.value.objectName,
            objectTitle: data.value.objectTitle,
            objectCost: data.value.objectCost,
            objectImage: data.value.objectImage,
            objectPrice: data.value.objectPrice,
            objectInfo: data.value.objectInfo,
            objectCout: data.value.objectCout,
            objectStatus: data.value.objectStatus,
            objectTime: data.value.objectTime,
            objectClasses: data.value.objectClasses,
            objectBanner: data.value.objectBanner,
            userId: data.value.userId,
            objectImg: data.value.objectImg,
        },
    })
        .then(response => {
            console.log(response.data)
            store.state.HomeModule.objectEditVisible = false
            alert("商品修改成功！")
        })

    // console.log(data.value)
}

let cancelForm = () => {
    store.commit("DIALOG")
}

//Image自动上传的数据反馈
const handleAvatarSuccess= (
    response,
    uploadFile
) => {
    const info = JSON.stringify(response)
    data.value.objectImage.push(JSON.parse(info).result)
    // imageList.value.push(JSON.parse(info).result)
    console.log(data.value.objectImage)
}

//Banner自动上传数据反馈
const handleBannerSuccess = (
    response,
    uploadFile
) => {
    const info = JSON.stringify(response)
    data.value.objectBanner.push(JSON.parse(info).result)
    console.log(data.value.objectBanner)
}

//Img自动上传数据反馈
const handleImgSuccess = (
    response,
    uploadFile
) => {
    const info = JSON.stringify(response)
    data.value.objectImg.push(JSON.parse(info).result)
}

//删除图片信息
const handleRemove = (uploadFile, uploadFiles) => {
    data.value.objectImage = data.value.objectImage.slice(0, data.value.objectImage.indexOf(uploadFile.url)).concat(data.value.objectImage.slice(data.value.objectImage.indexOf(uploadFile.url) + 1, data.value.objectImage.length))
}
const bannerRemove = (uploadFile, uploadFiles) => {
    data.value.objectBanner = data.value.objectBanner.slice(0, data.value.objectBanner.indexOf(uploadFile.url)).concat(data.value.objectBanner.slice(data.value.objectBanner.indexOf(uploadFile.url) + 1, data.value.objectBanner.length))
}
const imgRemove = (uploadFile, uploadFiles) => {
    data.value.objectImg = data.value.objectImg.slice(0, data.value.objectImg.indexOf(uploadFile.url)).concat(data.value.objectImg.slice(data.value.objectImg.indexOf(uploadFile.url) + 1, data.value.objectImg.length))
}

//打开详情图
const handlePictureCardPreview= (uploadFile) => {
    window.open(uploadFile.url, '_blank');
}

//上传图片超出限制警告
const handleExceed = () => {
    alert("超出图片限制")
}
</script>
<style scoped>
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {

    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>