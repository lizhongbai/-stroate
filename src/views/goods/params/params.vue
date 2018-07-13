<template>
    <div>
        <myHeader leave1="商品管理" leave2="分类参数"></myHeader>
        <el-alert
            title="注意：只允许为第三级分类设置相关参数！"
            type="warning"
            show-icon>
        </el-alert>
        <div class="paramsSelect">
            <span class="demonstration">请选择商品分类：</span>
            <el-cascader
                expand-trigger="hover"
                :options="options">
            </el-cascader>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="动态参数" name="first">动态参数</el-tab-pane>
            <el-tab-pane label="静态参数" name="second">静态参数</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return{
            options:[],
            activeName: 'first',
        }
    },
    methods:{
        handleClick(tab, event) {

        // console.log(tab, event)
      }
    }
}
</script>

<style>
.paramsSelect {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
