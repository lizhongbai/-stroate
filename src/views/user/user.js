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
				id:'',
				username: '',
				roleName: '',
				rid: ''
			},
			currentId:'',
			//角色分配
			option:[],
			formLabelWidth: '120px',
			//绑定搜索
			search:'',
			//分页
			currentPage: 1,
			pagesize: 5,
			total: 0,
			//验证规则s
			rules:{
				username: [
					{ required: true, message: '请好好输入姓名', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入格式正确的密码', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				email: [
					{ required: true, message: '请输入格式正确的email', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				mobile: [
					{ required: true, message: '请输入格式正确的电话', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
			}
		}
	},
	created() {
		this.getAllUserList()
	},
	methods:{
		getAllUserList() {    //全部

			this.loading = true;

			//初次设置的token
			// const token = sessionStorage.getItem('token')

			// this.$http.defaults.headers.common['Authorization'] = token

			//把当前页数，和显示总数传进去
			const currentPage = this.currentPage

			const pagesize = this.pagesize

			this.$http.get(`users?pagenum=${currentPage}&pagesize=${pagesize}&query=${this.search}`)

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
		handleUserAdd(formName) {   //添加

			this.$refs[formName].validate((valid) => {

				if (!valid) {

					return false

				}

			})

			this.$http.post('users',this.form)

					.then(res =>{
						
						const data = res.data

						const { meta:{ meta,status } } = data

					if(status === 201) {
						
						this.$notify({
							title: '成功',
							message: '这是一条成功的提示消息',
							type: 'success'
						});

						this.getAllUserList()

						for ( let key in this.form){

							this.form[key] = ''

						}

						this.dialogFormVisible = false

					}else{

						this.$message(res.data.meta.msg)

					}

					})

		},
		resetForm(formName) {	//重置

			this.$refs[formName].resetFields();

		},
		handleUser_() { //取消按键

			this.$message('真的不注册了吗？')

			this.dialogFormVisible = false

		},
		async handelUserDel(id) {		//删除用户信息
			
			const Myid = id.id

			this.$confirm('确认删除吗?',{

			type: 'warning'

			}).then( async() =>{

				const data = await this.$http.delete('users/' + Myid )
				
				if(data.data.meta.status === 200) {

						this.$message('删除成功')

						this.currentPage = 1

						this.getAllUserList()
					}

			}).catch( ()=>{

				this.$message('已经取消')

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
			
			this.getAllUserList()

		},
		async handelRele(user) { //查看分配用户角色

			this.dialogFormRele = true

			this.$http.get('roles')

				.then( res =>{

					this.option = res.data.data

				})

			const res1 = await this.$http('users/'+ user.id)

				this.currentId = res1.data.data.rid

				this.formRele = user

		},
		async handelRele1() {	//修改角色信息

			const id = this.formRele.id

			const res = await this.$http.put(`users/${id}/role`,{

				rid:this.currentId

			})

			const data = res.data
			
			const { meta:{status,msg}} = data

			if( status === 200 ) {

				this.$message.success( msg )

				this.dialogFormRele = false

			}
		}
	},
}