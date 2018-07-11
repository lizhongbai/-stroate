<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="myheader">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.leave1 }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.leave2 }}</el-breadcrumb-item>

    </el-breadcrumb>
</template>

<script>
export default {
    name:'myHeader',
    props:['leave1','leave2']
}
</script>

<style>
.myheader {
    padding-bottom:15px;
}
</style>
