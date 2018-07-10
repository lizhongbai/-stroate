export default {
	data() {
		return {
			permissionList:[],
		}
	},
	created() {
		
		this.getAllPermission()

	},
	methods: {

		async getAllPermission() {

			const res = await this.$http.get('rights/list ')

				const data = res.data

				const { meta:{status,msg}} = data

				if(status === 200) {

					this.permissionList = data.data

				}

		}

	}
}