<template>
    <div class="userBac">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin: 15px 0;">
            <el-input placeholder=" 请输入内容" class="input-with-select" v-model="search">
                <el-button slot="append" icon="el-icon-search" ></el-button>
            </el-input>
						<!--  添加弹出层 -->
            <el-button round @click="dialogFormVisible = true">添加</el-button>
						<el-dialog title="用户注册" :visible.sync="dialogFormVisible" width="700px" >
							<el-form :model="form">
								<el-form-item label="* 用户名" :label-width="formLabelWidth">
									<el-input v-model="form.username" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="*密码" :label-width="formLabelWidth">
									<el-input v-model="form.password" auto-complete="off" type="password"></el-input>
								</el-form-item>
								<el-form-item label="邮箱" :label-width="formLabelWidth">
									<el-input v-model="form.email" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="电话" :label-width="formLabelWidth">
									<el-input v-model="form.mobile" auto-complete="off"></el-input>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="handleUser_">取 消</el-button>
								<el-button type="primary" @click="handleUserAdd">确 定</el-button>
							</div>
						</el-dialog>
        </div>
        <!-- 表格 -->
        <el-table
				v-loading="loading"
				border
				stripe
        :data="userList"
        style="width: 100%">
						<el-table-column
							type="index"
							width="50">
						</el-table-column>
						<el-table-column
                prop="username"
                label="姓名"
								width="150">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="180">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="电话"
                width="180">
            </el-table-column>
						<el-table-column
                label="创建时间"
                width="100">
								<template slot-scope="scope">
										{{ scope.row.create_time | dataForm }}
								</template>
            </el-table-column>
            <el-table-column
                prop="mg_state"
                label="用户状态"
								width="100">
								<template slot-scope="scope">
										<el-switch
											@change="(val) => {
													handelSwitch(val, scope.row.id)
												}"
											v-model="scope.row.mg_state"
											active-color="#13ce66"
											inactive-color="#ff4949"
											class="user-swith">
										</el-switch>
								</template>
            </el-table-column>
						<el-table-column
                prop=""
                label="操作">
								 <template slot-scope="scope">
									 <el-row class="user-btn">
										<el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
										<el-button type="danger" icon="el-icon-delete" circle size="mini" plain @click="handelUserDel(scope.row)"></el-button>
										<el-button type="success" icon="el-icon-check" circle size="mini" plain></el-button>
									</el-row>
								</template>
            </el-table-column>
        </el-table>
				<!-- 分页 -->
				<!-- <div class="block">
						<el-pagination
							:current-page="currentPage4"
							:page-sizes="[10, 20, 30, 40]"
							:page-size="10"
							layout="total, sizes, prev, pager, next, jumper"
							:total="50">
						</el-pagination>
				</div> -->
    </div>
</template>

<script>
export default {
	data() {
		return{
			userList:[],
			loading: true,
			//弹出层的显示隐藏
			dialogFormVisible: false,
			form: {
				username: '',
				password:'',
				email:'',
				mobile:''
			},
			formLabelWidth: '120px',
			search:'',
		}
	},
	created() {
		this.getAllUserList()
	},
	methods:{
		getAllUserList() {    //全部

			this.loading = true;

			const token = sessionStorage.getItem('token')

			this.$http.defaults.headers.common['Authorization'] = token

			this.$http.get('users?pagenum=1&pagesize=10')

				.then(res =>{

					const data = res.data

					const { meta:{ meta,status }} = data

					if( status === 200 ) {
						
						this.userList = data.data.users

						this.loading = false
						
					}

				})

		},
		handleUserAdd() {   //添加
	
			const formDate = this.form
	
			if( formDate.name  == '') {

				this.$message('请重新输入')

			}else if(formDate.password  == '') {
				
				this.$message('请输入密码')

			}

			this.$http.post('users',this.form)

					.then(res =>{
						
						const data = res.data

						const { meta:{ meta,status } } = data

						console.log(data)

					if(status === 201) {
						
						this.$notify({
							title: '成功',
							message: '这是一条成功的提示消息',
							type: 'success'
						});

						this.getAllUserList()

						this.username = this.password = this.mobile = this.email = ''

						this.dialogFormVisible = false

					}else{

						this.$message(res.data.meta.msg)

					}

					})

		},
		handleUser_() { //取消按键

			this.$message('真的不注册了吗？')

		},
		// 删除
		handelUserDel(id) {
			
			const Myid = id.id

			this.$confirm('确认删除吗?',{

				type: 'warning'

			}).then( async() =>{

				const data = await this.$http.delete('users/' + Myid )
				
				if(data.data.meta.status === 200) {

						this.$message('删除成功')

						this.getAllUserList()
					}

			})
			
		},
		async handelSwitch(val,id) {

			const res = await this.$http.put(`users/${id}/state/${val}`)

			const data = res.data

			const { meta: { meta,status} } = data

			if( status === 200) {

				this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
				});
				
				this.getAllUserList()

			}else{

				this.$notify({
          title: '失败',
          message: '这是一条失败的提示消息',
          type: 'warning'
				});

			}

		}
	},
}
</script>

<style>
.userBac {
    /* background: #FFF; */
    height: 50%;
    padding: 10px;
}
.el-main {
    padding-top: 15px;
}
.el-breadcrumb {
    font-size: 15px;
}
.input-with-select{
    width: 300px;
}
.user-btn {
	display: flex;
	justify-content: space-between;
}
.user-swith {
	padding-left:20px;
}
.block{
	padding-top: 5px;
}
</style>
