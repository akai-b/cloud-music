<script setup lang='ts'>
import Header from './components/Header.vue'
</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header/>
            </el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>Main</el-main>
            </el-container>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>
<style lang='scss' scoped>
.common-layout{
    width: 85vw;
    margin: auto;
    height: 100vh;
    .el-container{
        height: 100%;
    }
}
header,aside,footer,main{
    background-color: rgb(205, 245, 232);
    border:1px solid #fff;
}
</style>