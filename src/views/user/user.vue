<template>
    <div class="userBac">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin: 15px 0;">
            <el-input placeholder="请输入内容" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button round>添加</el-button>
        </div>
        <!-- 表格 -->
        <el-table
				border
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
                width="200">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="电话"
                width="300">
            </el-table-column>
            <el-table-column
                prop="mg_state"
                label="用户状态"
								width="100">
								<template slot-scope="scope">
										<el-switch
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
										<el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
										<el-button type="success" icon="el-icon-check" circle size="mini" plain></el-button>
									</el-row>
								</template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
	data() {
		return{
			userList:[],
			value2: true,
		}
	},
	created() {
		this.getAllUserList()
	},
	methods:{
		getAllUserList() {

			const token = sessionStorage.getItem('token')

			this.$http.defaults.headers.common['Authorization'] = token

			this.$http.get('users?pagenum=1&pagesize=10')

				.then(res =>{

					const data = res.data

					const { meta:{ meta,status }} = data

					if( status === 200 ) {
						
						this.userList = data.data.users
						
					}

				})

		}
	}
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
</style>
