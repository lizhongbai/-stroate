<template>
    <div>
        <myHeader leave1="商品管理" leave2="商品列表"></myHeader>
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" class="input-with-select" v-model="search">
                <el-button slot="append" icon="el-icon-search" @click="handelSearch"></el-button>
            </el-input>
                <el-button type="success" plain @click="handelAddEnter=$router.push('/goods/addGoods')">添加商品</el-button>
        </div>
        <!-- 恶心的表格 -->
        <el-table
            v-loading="loading"
            class="goodsTab"
            border
            stripe
            :data="tableData"
            style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                prop="goods_name"
                label="商品名称"
                width="830">
            </el-table-column>
            <el-table-column
                prop="goods_price"
                label="商品价格(元)"
                width="120">
            </el-table-column>
            <el-table-column
                prop="goods_number"
                label="商品重量"
                width="100">
            </el-table-column>
            <el-table-column
                label="创建时间">
                <template slot-scope="scope">
                    {{ scope.row.upd_time | dataForm }}
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作">
                <template slot-scope="scope">
                    <el-row class="user-btn">
                        <el-button type="primary" icon="el-icon-edit" circle size="mini" plain @click="handelEdit(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle size="mini" plain @click="handelDelete(scope.row)"></el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[10, 20, 30]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        <!-- 编辑 -->
        <el-dialog title="收货地址" :visible.sync="goodEditFormVisible">
            <el-form :model="form">
                <el-form-item label="商品名称" >
                <el-input v-model="form.goods_name" auto-complete="off"></el-input>
                </el-form-item>               
            </el-form>
            <el-form :model="form">
                <el-form-item label="价格" >
                <el-input v-model="form.goods_price" auto-complete="off"></el-input>
                </el-form-item>               
            </el-form>
            <el-form :model="form">
                <el-form-item label="数量" >
                <el-input v-model="form.goods_number" auto-complete="off"></el-input>
                </el-form-item>               
            </el-form>
            <el-form :model="form">
                <el-form-item label="重量" >
                <el-input v-model="form.goods_weight" auto-complete="off"></el-input>
                </el-form-item>               
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="goodEditFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handelEditEnter">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return{
            tableData:[],
            loading: false,
            //分页
            pagenum: 1,
            pagesize: 10,
            total:0,
            //搜索
            search:'',
            //编辑的弹出框
            goodEditFormVisible: false,
            form:{
                goods_name:'',
                goods_price:''

            }
        }
    },
    created() {
        this.getAllgoodsList()
    },
    methods:{

        async getAllgoodsList() {   //查看列表

            this.loading = true

            const { data:resData } = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.search}`)

            const { meta:{ status, msg }} =resData

            if(status === 200) {

                this.tableData = resData.data.goods

                this.total = resData.data.total

                this.loading = false

            }else{

                this.$message.err(msg)

            }

        },
        handleSizeChange(val) {

            this.pagesize = val

            this.getAllgoodsList()

        },
        handleCurrentChange(val) {

            this.pagenum = val

            this.getAllgoodsList()

        },
        handelSearch() {    //搜索

            this.getAllgoodsList()

        },
        handelDelete(user) {  //删除

            const goods_id = user.goods_id

             this.$confirm('是否永久删除数据',{

                type:'warning'

            }).then(async() =>{
               
                const { data:resData } = await this.$http.delete(`goods/${goods_id}`)

                const { meta:{ status,msg } } = resData

                    if( status === 200 ) {

                    this.$message.success(msg)

                    this.getAllgoodsList()

                }else{

                    this.$message.error(msg)

                }

            }).catch(e=>{

                console.log(e)

            })

        },
        handelEdit(user) {  //编辑

            this.goodEditFormVisible = true

            console.log(user)

            this.form = user

        },
        async handelEditEnter() {   //确认编辑

            // const { data:resData } = await this.$http.put(`goods/${this.form.goods_id}`, this.form)

            // console.log(resData)
            this.$message.error('啥破接口文档')
        },


    }
}
</script>

<style>
.input-with-select{
    width:300px;
    margin-bottom: 5px;
}
.goodsTab{

    border-radius: 10px;
    box-shadow: 2px 2px 2px #CCC;

}
.user-btn {
    margin-left: 10px;
}
</style>
