<template>
    <div>
        <myHeader leave1="订单管理" leave2="订单列表"></myHeader>
        <!-- 表格 -->
        <el-table
        :data="tableData1"
        stripe
        border
        style="width: 100%">
        <el-table-column
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            prop="order_number"
            label="订单编号"
            width="300">
        </el-table-column>
        <el-table-column
            prop="order_price"
            label="订单价格"
            width="150">
        </el-table-column>
        <el-table-column
            prop="pay_status"
            label="是否付款">
        </el-table-column>
        <el-table-column
            prop="is_send"
            label="是否发货">
        </el-table-column>
        <el-table-column
            prop="create_time"
            label="下单时间"
             width="200">
        </el-table-column>
         <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
                <el-row class="user-btn">
                    <el-button type="primary" icon="el-icon-edit" circle size="mini" plain ></el-button>
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
            :page-sizes="[10, 20, 30, 40]"
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
            tableData1:[],
            pagenum: 1,
            pagesize:10,
            total: -1, 
        }

    },
    created() {
        this.getAllorders()
    },
    methods: {

        async getAllorders() {      //查看列表

            const { data:resDate } = await this.$http.get(`orders?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)

            const { meta:{status,msg} } = resDate

            if( status === 200 ) {

                this.tableData1 = resDate.data.goods

                this.total = resDate.data.total

            }

            console.log(resDate)
        },
         handleSizeChange(val) {

             this.pagesize = val

             this.getAllorders()

        },
        handleCurrentChange(val) {
            
            this.pagenum = val 

            this.getAllorders()

        }

    }
}
</script>

<style>

</style>
