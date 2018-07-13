<template>
    <div>
        <myHeader leave1="商品管理" leave2="商品列表"></myHeader>
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
                <el-button type="success" plain>添加商品</el-button>
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
                        <el-button type="primary" icon="el-icon-edit" circle size="mini" plain ></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle size="mini" plain ></el-button>
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
        }
    },
    created() {
        this.getAllgoodsList()
    },
    methods:{

        async getAllgoodsList() {   //查看列表

            this.loading = true

            const { data:resData } = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)

            console.log(resData)
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

        }

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
