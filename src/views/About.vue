<template>
  <div class="common-layout">
    <el-container>
      <el-header height="auto">
        <indexTop></indexTop>
      </el-header>
      <el-main>
        <h2 style="text-align: center;color:rgb(93, 155, 255);">数派π | 新媒体品牌电商</h2>
        <div class="text" style="padding-top:10px;">
          <div style="color:rgb(144, 143, 143);line-height: 40px;box-shadow:3px 3px 5px 3px rgb(118, 118, 118)">主要针对新媒体的盛行，品牌电商的势力和市场逐渐形成，数派π品牌电商网站是由互联网新媒体衍生出的新产品，提供一站式的购物体验。
    数派π 借助强大的自有品牌背书，精心挑选优质、大品牌产品上架，优质聚集性更强，购物体验更优秀，双重品牌背书，给你良好的购物保障。
    数派π品牌电商网站 为数派π公司旗下产品，定位坐落于浙江省绍兴市上虞区盖北镇浙江理工大学科技与艺术学院。</div>
          <div style="margin-top: 20px;line-height:30px">
            联系官方邮箱:15372542572@163.com<br/>
            商品举报邮箱:15372542572@163.com(备注:举报)<br/>
            投诉建议邮箱:15372542572@163.com(备注:投诉)<br/>
            商品合作邮箱:15372542572@163.com(备注:品牌名称)<br/>
          </div>
        </div>
        <div class="pict" style="padding: 30px;">
          <img src="http://localhost:8898/images/logo_lucency.png" width="100%">
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script lang="js" setup>
import indexTop from '../components/indexTop.vue'
</script>
<style lang="scss" scoped>
.el-header {
  width: 100%;
  margin: 0;
  padding: 0;
}
.el-main {
  width: 70%;
  margin: 20px auto;
}
.text,.pict {
  width: 50%;
  display: inline-block;
  vertical-align: top;
}
</style>