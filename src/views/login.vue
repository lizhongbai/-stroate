<template>
<div class="login-wrap">
    <el-form :model="formDate" class="login-from">
    <el-form-item label="用户名">
        <el-input type="text" v-model="formDate.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
        <el-input type="password" v-model="formDate.password"></el-input>
    </el-form-item>
        <el-button type="primary" class="login-btn" @click="handelLogin">成功按钮</el-button>
    </el-form>
</div>
</template>

<script>
export default {
	data() {
		return {
			formDate:{
				username: '',
				password: ''
			}
		}
	},
	methods:{
	handelLogin () {
		
		this.$http.post('login', this.formDate)

			.then( res=>{

					const data = res.data

					if(data.meta.status === 200) {

							this.$message.success('登陆成功')

							sessionStorage.setItem('token',data.data.token)
							
							this.$router.push('/home')
					}else{
							this.$message.error('登陆失败')
					}
			})
	}
	}
}
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-from {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-wrap .login-from .login-btn {
  width: 100%;
}
</style>

