<template>
    <div class="content">
        <iframe :src=swaggerUrl width="100%" height="800px"></iframe>
    </div>
</template>

<script lang="js" setup>
const swaggerUrl = "http://localhost/webjars/swagger-ui/index.html?urls.primaryName=user"
</script>

<style>

</style>