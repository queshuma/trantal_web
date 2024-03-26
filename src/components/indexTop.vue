<template>
    <div class="top" style="background-color: rgb(255, 255, 255);margin-bottom: 30px">
        <div class="header-list">
            <router-link :to="{ name: 'Index' }">
                <div class="text">回到首页</div>
            </router-link>
            <router-link :to="{ name: 'login' }">
                <div class="text">登录</div>
            </router-link>
            <router-link :to="{ name: 'UserShop' }">
                <div class="shop text">我的购物车</div>
            </router-link>
            <router-link :to="{ name: 'UserOrder' }">
                <div class="order text">我的订单</div>
            </router-link>
            <router-link :to="{ name: 'UserInfo' }">
                <div class="text">个人信息</div>
            </router-link>
        </div>
        <div class="header-logo">
            <div class="logo">
                <router-link :to="{ name: 'Index' }">
                    <img src="http://localhost:8898/images/logo_lucency.png" height="100px">
                </router-link>
            </div>
            <div class="header-title">
                <router-link :to="{ name: 'Index' }"><span class="title-list-base">网站首页</span></router-link>
                <router-link :to="{ name: 'ObjectList' }"><span class="title-list-base">全部商品</span></router-link>
                <router-link :to="{ name: 'UserInfo' }"><span class="title-list-base">个人中心</span></router-link>
                <router-link :to="{ name: 'About' }"><span class="title-list-base">关于我们</span></router-link>
            </div>
        </div>
    </div>
</template>

<script lang="js" setup>

</script>

<style lang="scss" scoped>
.header-list {
    width: 100%;
    height: 40px;
    background-color: #666;
    padding-right: 150px;
    ;
    text-align: right;

    .text {
        display: inline-block;
        color: #ff8800;
        margin: 0 10px;
        line-height: 40px;
    }
}

.header-logo {
    width: 100%;
    padding: 0 10% 0 10%;
    margin: 10px 0;

    .logo {
        width: 50%;
        display: inline-block;
    }

    .header-title {
        display: inline-block;
        vertical-align: top;
        width: 50%;

        span {
            font-size: 20px;
            line-height: 40px;
            color: #ff8800;
            padding: 0 10px 0 10px
        }

        .title-list-base {
            display: inline-block;
            vertical-align: top;
            margin: 30px 10px;
            border-bottom: 2px solid rgb(164, 164, 164);
        }
    }
}

a {
    text-decoration: none;
    background-color: none;
    color: #666;
}
</style>