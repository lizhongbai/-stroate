<template>
  <el-container class="container">
    <el-header class="header">
			<el-row>
				<el-col :span="4">
						<img src="../assets/images/logo.png" alt="" class="homeImgs">
				</el-col>
				<el-col :span="19" class="home_middle">
					<h2>电商后台管理系统</h2>
				</el-col>
				<el-col :span="1" class="home_right">
						<a href="javascript:;" @click="handleExit">退出</a>
				</el-col>
			</el-row>
		</el-header>
    <el-container class="container">
      <el-aside class="aside" width="200px">
				<el-row class="tac">
					<el-col :span="24">
						<el-menu
							default-active="1"
							router
							class="homeAside">
							<el-submenu index="1">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>用户管理</span>
								</template>
									<el-menu-item index="/user">用户列表</el-menu-item>
							</el-submenu>
							<el-submenu index="2">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>权限管理</span>
								</template>
									<el-menu-item index="1-1">角色列表</el-menu-item>
									<el-menu-item index="1-2">权限列表</el-menu-item>
							</el-submenu>
							<el-submenu index="3">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>商品管理</span>
								</template>
									<el-menu-item index="1-1">商品列表</el-menu-item>
									<el-menu-item index="1-2">分类参数</el-menu-item>
									<el-menu-item index="1-3">商品分类</el-menu-item>
							</el-submenu>
							<el-submenu index="4">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>订单管理</span>
								</template>
									<el-menu-item index="1-1">订单列表</el-menu-item>
							</el-submenu>
							<el-submenu index="5">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>数据统计</span>
								</template>
									<el-menu-item index="1-1">数据列表</el-menu-item>
							</el-submenu>
						</el-menu>
					</el-col>
				</el-row>
			</el-aside>
      <el-main class="main">
				<router-view></router-view>
			</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
	data () {
		return {
			
		}
	},
	beforeCreate() {

			const token =sessionStorage.getItem('token')

			if(!token) {
				
				this.$router.push('/login')

				this.$message('请先登陆宝贝')
			}
		},
	methods:{
		handleExit () {

			this.$confirm('确认退出吗？',{

				type: 'warning'

			}).then(()=>{

					window.sessionStorage.removeItem('token')

					this.$router.push('/login')

					this.$message({

						type: 'success',

						message: '退出成功!'

					})

				}).catch(()=>{

					this.$notify.error({

							message: '这是一条没退出成功的信息'

						})
				})			
		}
	}
}
</script>

<style>
.container {
  height: 100%;
}

.header {
	background-color:#d3dce6;
	padding:0;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
.home_middle {
	line-height: 60px;
	text-align: center;
	color:cornflowerblue;
	font-size: 18px;
}
.home_right a{
	text-decoration: none;
	line-height: 60px;
	color:blue;
	font-weight: 700;
}
.home_right a:hover{
	transition: 1s;
	border-bottom: 2px solid #531234;
}
.el-row,.el-col-24,.el-menu{
	height: 100%;
	
}
</style>
