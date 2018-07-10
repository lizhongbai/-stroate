0<template>
    <div>
       <el-breadcrumb separator-class="el-icon-arrow-right" >
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button round class="roseBtn" @click="roseAddFormVisible=true">添加</el-button>
        <!-- 表格 -->
        <el-table
            class="roseListTab"
            border
            :data="roseList"
            style="width: 100%">
        <el-table-column type="expand">
        <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
                <span></span>
            </el-form-item>
            <el-form-item label="所属店铺">
                <span></span>
            </el-form-item>
            <el-form-item label="商品 ID">
                <span></span>
            </el-form-item>
            <el-form-item label="店铺 ID">
                <span></span>
            </el-form-item>
            <el-form-item label="商品分类">
                <span></span>
            </el-form-item>
            <el-form-item label="店铺地址">
                <span></span>
            </el-form-item>
            <el-form-item label="商品描述">
                <span></span>
            </el-form-item>
            </el-form>
        </template>
        </el-table-column>
            <el-table-column
            type="index"
            width="50">
            </el-table-column>
            <el-table-column
            label="角色名称"
            prop="roleName">
            </el-table-column>
            <el-table-column
            label="角色描述"
            prop="roleDesc">
            </el-table-column>
            <el-table-column
            label="描述"
            prop="desc">
                <template slot-scope="scope">
                    <el-row class="user-btn">
                        <el-button type="primary" icon="el-icon-edit" circle size="mini" plain @click="handeelroseAmend(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle size="mini" plain @click="roseListDel(scope.row)"></el-button>
                        <el-button type="success" icon="el-icon-check" circle size="mini" plain @click="handelAccredit(scope.row)"></el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加角色 -->
        <el-dialog title="添加角色" :visible.sync="roseAddFormVisible" width="1000px">
            <el-form >
                <el-form-item label="角色名称" >
                    <el-input  auto-complete="off" v-model="roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" >
                    <el-input auto-complete="off" v-model="roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roseAddFormVisible=false">取 消</el-button>
                <el-button type="primary" @click="handelroseAdd">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改角色 -->
        <el-dialog title="修改角色" :visible.sync="roseAmendFormVisible" width="1000px">
            <el-form :v-model="AmendformData">
                <el-form-item label="角色名称" >
                    <el-input  auto-complete="off" v-model="AmendformData.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" >
                    <el-input auto-complete="off" v-model="AmendformData.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roseAmendFormVisible=false">取 消</el-button>
                <el-button type="primary" @click="handeelroseAmendd">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 角色授权弹出层 -->
        <el-dialog title="权限分配" :visible.sync="roseAccreditFormVisible" width="1000px">
            <el-form >
                <el-form-item label="角色名称" >
                    <el-input  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" >
                    <el-input auto-complete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roseAccreditFormVisible=false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
	data() {
		return {
            roseList:[],
            //添加的弹出层
            roseAddFormVisible: false,
            roleName:'',
            roleDesc:'',
            //修改的弹出层
            roseAmendFormVisible: false,
            AmendformData:{
                roleId:'',
                roleName:'',
                roleDesc:''
            },
            // 角色授权弹出
            roseAccreditFormVisible: false,
		}
    },
    created() {

        this.getAllRoseList()

    },
    methods:{

        async getAllRoseList() {       //查看所有

            const res = await this.$http.get('roles')

            this.roseList = res.data.data
            console.log(res)
        },
        async roseListDel(user) {   //删除

            const id = user.id
            
            this.$confirm('确认删除吗？',{

                type: 'warning'

            }).then( async() =>{
            
                const res = await this.$http.delete(`roles/${id}`)

                const data = res.data

                const { meta:{ status,msg } } =data

                if( status ===200 ) {

                    this.$message.success('删除成功')
                    
                    this.getAllRoseList()

                }

            }).catch((err)=>{

                this.$message('失败')

            })

        },
        async handelroseAdd() {     //添加

            const res = await this.$http.post('roles/',{roleName:this.roleName,roleDesc:this.roleDesc})

            const data = res.data

            const { meta:{status,msg}} = data

            if( status === 201 ) {

                this.$message.success(msg)

                this.roseAddFormVisible = false

                this.getAllRoseList()

            }else{

                this.$message.error(msg)

            }
            
        },
        async handeelroseAmend(user) {  //修改

            this.roseAmendFormVisible = true

            const res = await this.$http.get(`roles/${user.id}`)

            this.AmendformData = res.data.data

        },
        async handeelroseAmendd() {   //确认修改
        
            const id  = this.AmendformData.roleId
            
            const res = await this.$http.put(`roles/${id}`,this.AmendformData) 

            const data = res.data

            const { meta:{ status }} = data

            if( status === 200 ) {

                this.$message.success('修改成功')

                this.roseAmendFormVisible = false

                this.getAllRoseList()

            }else{

                this.$message('修改失败')

            }

        },
        handelAccredit(user) {

            this.roseAccreditFormVisible = true

        },

    }
}
</script>

<style>
.roseBtn {
    margin-top:8px;
		margin-bottom:8px;
}
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .user-btn{
      display: flex;
      justify-content: space-between;
  }
  .roseListTab {
      border-radius: 25px;
      box-shadow: 4px 3px 2px 2px #CCC;
  }
</style>
