<template>
    <div class="categorie">
        <myHeader leave1="商品管理" leave2="商品分类"></myHeader>
        <!-- 添加分类 -->
        <el-button type="primary" plain @click="AddCategories">添加分类</el-button>
        <!-- 表格 -->
        <el-table
        class="categorieTab"
            stripe
            v-loading="loading"
            :data="categoreList"
            border            
            style="width: 100%">
            <el-tree-grid
                prop="cat_name"
                :indentSize="4"
                treeKey="cat_id"
                parentKey="cat_pid"
                levelKey="cat_level"
                childKey="children"
                label="分类名称">             
            </el-tree-grid>
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
                            <el-button type="primary" icon="el-icon-edit" circle size="mini" plain @click="handelEdit(scope.row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle size="mini" plain @click="handeldelete(scope.row)"></el-button>
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
            :page-sizes="[ 10, 20, 30]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        <!-- 添加的弹出框 -->
        <el-dialog title="添加商品分类" :visible.sync="categoriesAddAddFormVisible" width="1000px">
            <el-form :model="formAddData"  ref="addForm">
                <el-form-item label="分类名称" :label-width="formLabelWidth" prop="cat_name">
                    <el-input  auto-complete="off" v-model="formAddData.cat_name"></el-input>
                </el-form-item>
                 <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <div class="block">
                        <el-cascader
                            expand-trigger="hover"
                            :options="options"
                            :props="{value: 'cat_id',label: 'cat_name', children: 'children'}"
                            v-model="selectedPIds">
                        </el-cascader>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="categoriesAddAddFormVisible=false">取 消</el-button>
                <el-button type="primary" @click="handelAddCategories">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑的弹出框 -->

        <el-dialog title="编辑商品分类" :visible.sync="categoriesEditFormVisible" width="1000px">
            <el-form v-model="editForm">
                <el-form-item label="分类名称" :label-width="formLabelWidth" >
                    <el-input  auto-complete="off" v-model="editForm.cat_name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="categoriesEditFormVisible=false">取 消</el-button>
                <el-button type="primary" @click="handelEditEnter">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

var ElTreeGrid = require('element-tree-grid');

export default {
    data() {
        return{
            categoreList:[],
            loading: false,
            // 分页
            pagenum: 1,
            pagesize: 10,
            total:0,
            //添加的弹出层
            categoriesAddAddFormVisible:false,
            formLabelWidth: '120px',
            options:[],
            formAddData: {
                cat_name: '',
            },
            selectedPIds: [],
            //编辑的弹框
            categoriesEditFormVisible: false,
            editForm:{
                 cat_name: '',
                 cat_id:''
            },


        }
    },
    components:{
        ElTreeGrid
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
        },
        async AddCategories() {   //添加的弹出窗

            this.categoriesAddAddFormVisible = true
            
            const { data:resData } = await this.$http.get('categories?type=2')

            this.options = resData.data
        },
        async handelAddCategories() {   //添加分类

            const formData = {

                ...this.formAddData,
                
                cat_pid: this.selectedPIds[ this.selectedPIds.length - 1 ],

                cat_level: this.selectedPIds.length

            }
            console.log(formData)
            const { data:resDate } = await this.$http.post('categories/',formData)

            console.log(resDate)
            if(resDate.meta.status === 201 ) {

                this.$message.success('成功')

                this.categoriesAddAddFormVisible = false

                this.$refs['addForm'].resetFields()

                this.selectedPIds = []

                this.getAllCategore()

            }else{

                this.$message.error('添加失败')

            }

        },
        handeldelete(user) {    //删除分类

            const cat_id = user.cat_id

            this.$confirm('是否永久删除数据','提示',{

                confirmButtonText: '确定',

                cancelButtonText: '取消',

                type:'warning'

            }).then (async()=>{

                
                    const { data: resData } = await this.$http.delete(`categories/${cat_id}`)

                    const { meta:{ status, msg } } = resData

                    if( status === 200 ) {

                        this.$message.success(msg)

                        this.getAllCategore()

                    }else{

                        this.$message.error(msg)

                    }

            }).catch(e=>{
                console.log(e)
            })           

        },
        async handelEdit(user) {    //修改列表

            this.categoriesEditFormVisible= true

            this.editForm = user

        },
        async handelEditEnter() {   //修改完成

            const { cat_id,cat_name } = this.editForm

            const { data:resData } = await this.$http.put(`categories/${ cat_id }`,{cat_name})

            const { meta:{ status, msg } } = resData

            if( status === 200 ) {

                this.$message.success(msg)

                this.categoriesEditFormVisible = false

                this.getAllCategore()

            }else{

                this.$message.error(msg)

            }

        }


    }
}
</script>

<style>
.categorieTab {
    overflow: auto;
    padding:20px;
    margin-top: 10px;

}
</style>
