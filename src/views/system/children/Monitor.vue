<template>
  <div class="content">
    <iframe :src=monitorUrl width="100%" height="800px"></iframe>
  </div>
</template>

<script lang="js" setup>
const monitorUrl = "http://localhost:9001/applications"
</script>

<style>

</style>