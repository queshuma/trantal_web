<template>
  <div class="content">
    <iframe :src=serverUrl width="100%" height="800px"> </iframe>
  </div>
</template>

<script lang="js" setup>
const serverUrl = "http://localhost:8848/nacos/#/configurationManagement?dataId=&group=&appName=&namespace=&pageSize=&pageNo="
</script>

<style>

</style>