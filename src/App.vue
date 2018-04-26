<template>
    <div id="app" class="app">
        <ul class="nav">
            <li><router-link to="/input">Input</router-link></li>
            <li><router-link to="/radio">Radio</router-link></li>
            <li><router-link to="/switch">switch</router-link></li>
        </ul>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

export default {
    name: 'app',
    data() {
        return {};
    }
};
</script>

<style src='./assets/css/iconfont.css'></style>
<style lang='less' src='./assets/css/common.less'></style>
<style lang='less' src='./assets/css/index.less'></style>

<style lang="less">
.app {
    display: flex;
    padding: 20px;
    height: 100vh;
    .nav {
        width: 200px;
        margin-right: 20px;
        border-right: 1px solid #e0e0e0;
        li {
            line-height: 30px;
            display: block;
            a {
                display: block;
            }
        }
    }
    .content {
        flex: 1;
    }
}

</style>
