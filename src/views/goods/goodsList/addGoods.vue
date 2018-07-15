<template>
    <div>
        <myHeader leave1="商品管理" leave2="商品列表"></myHeader>
        <el-alert
            title="添加商品信息"
            type="info"
            center
            show-icon>
        </el-alert>
        <!-- 步奏 -->
        <el-steps :active="activeName - 0" finish-status="success" class="steps" align-center :space="200">
            <el-step title="基本属性"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
        </el-steps>
        <!-- tab -->
         <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="left">
            <el-tab-pane label="商品名称" name="0">
                <!-- 第一页 -->
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position ="top">
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="ruleForm.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="name">
                        <el-input v-model="ruleForm.goods_price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" prop="name">
                        <el-input v-model="ruleForm.goods_weight"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="name">
                        <el-input v-model="ruleForm.goods_number"></el-input>
                    </el-form-item>
                    <!-- 级联选择 -->
                    <el-form-item label="商品分类" prop="name">
                    <CategoryCascader
                        type="3"
                        @fn="handleGaiBianLe"></CategoryCascader>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="1"></el-tab-pane>
            <el-tab-pane label="商品属性" name="2"></el-tab-pane>
            <el-tab-pane label="商品图片" name="3"></el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
                        <!-- 下一步 -->
                <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

import CategoryCascader from '@/components/myselector.vue'

export default {
    data() {
        return{
            activeName:'0',
            // 一
             ruleForm: {
                goods_name:'',
                goods_price:'',
                goods_weight:'',
                goods_number:'',
                goods_cat:'',
            },
            // 表单验证
              rules: {
                name: [
                    // { required: true, message: '输入不正确', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            },
            // 级联

        }
    },
    components:{
        CategoryCascader,
    },
    methods: {
       handleClick(tab, event) {    //同步标签
           
        this.activeName = Number.parseInt(this.activeName) + ''

      },
        async next() {  //  添加商品
            console.log(this.ruleForm)

            const  { data: resData } = await this.$http.post('goods',this.ruleForm)

            console.log(resData)

        },
        handleGaiBianLe(data) { //级联的的数据并用join分割成字符串

            this.ruleForm.goods_cat = data.join(',')

        }
}
}
</script>

<style>
.steps{
    margin-top: 20px;
    margin-bottom: 30px;

}
.demo-ruleForm {
    margin-left: 10px;
}
</style>
