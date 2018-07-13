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
						default-active="users"
						router
						class="homeAside">
						<el-submenu 
						v-for="(item,index) in homeList"
						:key="item.id"
						:index="index + '' ">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span >{{ item.authName }}</span>
							</template>
								<el-menu-item 
								v-for="items in item.children"
								:key="items.id"
								:index="'/'+ items.path">
								{{ items.authName }}
								</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-col>
			</el-row>
		</el-aside>
      	<el-main class="main">
			<!-- <el-carousel :interval="4000" type="card" height="200">
				<el-carousel-item v-for="item in 6" :key="item">
				<h3>{{ item }}</h3>
				</el-carousel-item>
			</el-carousel> -->
			<router-view></router-view>
		</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
	data () {
		return {
			
			homeList:[],
			
		}
	},
	beforeCreate() {

			const token =sessionStorage.getItem('token')

			if(!token) {
				
				this.$router.push('/login')

				this.$message('请先登陆宝贝')
			}
		},
	created() {

		this.getAllList()

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
		},
		async getAllList() {

			const res = await this.$http.get('menus')

			// console.log(res)
			this.homeList = res.data.data

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

.el-carousel {
	margin-top: 20px;
	height:200px;
}

 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: red;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: green;
  }
</style>
