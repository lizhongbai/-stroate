<template>
    <div>
       <el-breadcrumb separator-class="el-icon-arrow-right" >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button round class="roseBtn">添加</el-button>
        <!-- 表格 -->
        <el-table
				border
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
            prop="id">
            </el-table-column>
            <el-table-column
            label="角色描述"
            prop="name">
            </el-table-column>
            <el-table-column
            label="描述"
            prop="desc">
                <template slot-scope="scope">
                    <el-row class="user-btn">
                        <el-button type="primary" icon="el-icon-edit" circle size="mini" plain ></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle size="mini" plain ></el-button>
                        <el-button type="success" icon="el-icon-check" circle size="mini" plain ></el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
	data() {
		return {
			roseList:[],
		}
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
</style>
