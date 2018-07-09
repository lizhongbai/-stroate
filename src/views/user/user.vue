<template>
    <div class="userBac">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin: 15px 0;">
            <el-input placeholder=" 请输入内容" class="input-with-select" v-model="search">
                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
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
				width="100">
			</el-table-column>
			<el-table-column
                prop="username"
                label="姓名"
				width="200">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="200">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="电话"
                width="200">
            </el-table-column>
			<el-table-column
                label="创建时间"
                width="200">
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
                label="操作"
				width="200">
				<template slot-scope="scope">
					<el-row class="user-btn">
					<el-button type="primary" icon="el-icon-edit" circle size="mini" plain @click="handelUserAmend(scope.row)"></el-button>
					<el-button type="danger" icon="el-icon-delete" circle size="mini" plain @click="handelUserDel(scope.row)"></el-button>
					<el-button type="success" icon="el-icon-check" circle size="mini" plain @click="handelRele(scope.row)"></el-button>
				</el-row>
				</template>
            </el-table-column>
        </el-table>
				<!-- 分页 -->
		<div class="block">
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[5,10]"
			:page-size="pagesize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total">
			</el-pagination>
		</div>
		<!--  修改用户信息 的弹出层 -->
		<el-dialog title="修改" :visible.sync="dialogFormAmend" width="700px" >
			<el-form :model="formAmend">
				<el-form-item label="* 用户名" :label-width="formLabelWidth">
					<el-input auto-complete="off" v-model="formAmend.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="邮箱" :label-width="formLabelWidth">
					<el-input  auto-complete="off" v-model="formAmend.email"></el-input>
				</el-form-item>
				<el-form-item label="电话" :label-width="formLabelWidth">
					<el-input auto-complete="off" v-model="formAmend.mobile"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormAmend = false">取 消</el-button>
				<el-button type="primary" @click="userAmend">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 分配角色 -->
		<el-dialog title="分配角色" :visible.sync="dialogFormRele">
			<el-form :model="formRele">
				<el-form-item label="用户姓名" :label-width="formLabelWidth">
					<!-- <el-input auto-complete="off"></el-input> -->
					<span>{{ formRele.username }}</span>
				</el-form-item>
				<el-form-item label="角色分配" :label-width="formLabelWidth">
					<el-select v-model="formRele.region" placeholder="请分配劫色">
						<el-option label="请分配角色" value="请分配角色" disabled></el-option>
						<el-option v-for="item in option" :label="item.roleName" :value="item.id"  :key="item.id" ></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormRele=false">取 消</el-button>
				<el-button type="primary" >确 定</el-button>
			</div>
		</el-dialog>
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
			//修改页面的弹出层显示隐藏
			dialogFormAmend: false,
			//角色分配弹出框隐藏显示
			dialogFormRele: false,
			//查看显示用户信息
			form: {
				username: '',
				password:'',
				email:'',
				mobile:''
			},
			//修改
			formAmend: {
				username:'',
				email:'',
				mobile:'',
			},
			//角色分配
			formRele: {
				username: '',
				roleName: '',
				rid: ''
			},
			//角色分配
			option:[],
			formLabelWidth: '120px',
			//绑定搜索
			search:'',
			//分页
			currentPage: 1,
			pagesize: 5,
			total: 0,
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

			//把当前页数，和显示总数传进去
			const currentPage = this.currentPage

			const pagesize = this.pagesize

			this.$http.get(`users?pagenum=${currentPage}&pagesize=${pagesize}`)

				.then(res =>{

					const data = res.data


					const { meta:{ meta,status }} = data

					if( status === 200 ) {
						
						this.userList = data.data.users

						this.loading = false
						
					}
					
					//总条数
					this.total = data.data.total

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
		handelUserDel(id) {		//删除用户信息
			
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
		async handelSwitch(val,id) { //修改状态

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

		},
		handleSizeChange(val) {		//显示多少条
			
			this.pagesize = val 

			this.getAllUserList()
						
			console.log(`每页 ${val} 条`)
		},
     	handleCurrentChange(val) {		//显示多少页

			this.currentPage = val

			this.getAllUserList()

			console.log(`当前页: ${val}`)
		},
		handelUserAmend(user) {  //修改用户信息，先查看
			
			this.dialogFormAmend = true

			const id = user.id

			this.$http.get('users/'+ id )

				.then(res =>{

					const data = res.data

					const { meta:{ meta,status }} = data

					if(status === 200) {
						
						this.formAmend = data.data

					}

				})

		},
		userAmend() {    // 修改信息确认

			const id = this.formAmend.id

			console.log(this.formAmend)

			this.$http.put('users/' + id , this.formAmend )

				.then(res =>{
					console.log(res.data.data)

					const data = res.data
					console.log(data)
					const { meta:{ meta,status }} = data

					if( status === 200 ) {
						
						this.$notify({

							title: '成功',

							message: '这是一条修改成功的提示消息',

							type: 'success'

						})

						this.dialogFormAmend = false

						this.getAllUserList()

					}else{

						this.$notify({

							title: '修改失败',

							message: '这是一条修改失败的提示消息',

							type: 'warning'

						})

					}

				})
			
		},
		handleSearch() {	//根据id查询用户信息
			
			console.log(this.userList)

		},
		async handelRele(user) {

			this.dialogFormRele = true

			// const id = user.id

			// const users = await this.$http.get('users/'+ id)

			this.$http.get('roles')

				.then( res =>{

					// console.log(res)
					this.option = res.data.data

				})

				this.formRele = user
				console.log(this.formRele)

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
