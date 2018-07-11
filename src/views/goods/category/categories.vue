<template>
    <div>
        <myHeader leave1="商品管理" leave2="商品分类"></myHeader>
        <!-- 添加分类 -->
        <el-button type="primary" plain>添加分类</el-button>
        <!-- 表格 -->
        <el-table
            v-loading="loading"
            :data="categoreList"
            border
            
            style="width: 100%">
            <el-table-column
                prop="cat_name"
                label="分类名称"
                width="180">
            </el-table-column>
            <el-table-column
                label="级别"
                width="180">
                <template slot-scope="scope">
                    <span v-if=" scope.row.cat_level===0">一级</span>
                    <span v-else-if="scope.row.cat_level===1">二级</span>
                    <span v-else-if="scope.row.cat_level===2">三级</span>
                </template>
            </el-table-column>
            <el-table-column
                label="是否有效">
                <template slot-scope="scope">
                    {{ scope.row.cat_deleted?'否':'是' }}
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作">
                    <template slot-scope="scope">
                        <el-row class="user-btn">
                            <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
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
            :page-sizes="[5, 10, 20, 30]"
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
            categoreList:[],
            loading: false,
            // 分页
            pagenum: 5,
            pagesize: 5,
            total:0,


        }
    },
    created() {

        this.getAllCategore()

    },
    methods:{

        async getAllCategore() {    //分页 和查看所有

             this.loading = true

            const pagesize = this.pagesize

            const pagenum = this.pagenum

            const { data: resData } = await this.$http.get(`categories?type=3&pagenum=${pagenum}&pagesize=${pagesize}`)

            const { data: {result ,total}} = resData

            this.categoreList = result 

            this.total = total

            console.log(resData)

             this.loading = false

        },
        handleSizeChange(val) {
            
            this.pagesize = val

            this.getAllCategore()
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {

            this.pagenum =val

            this.getAllCategore()
            console.log(`当前页: ${val}`);
        }


    }
}
</script>

<style>

</style>
