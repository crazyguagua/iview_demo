import {
	GET_USERINFO
} from './mutation-types.js'

export default {
	    getUserInfo({ commit, state}, data) {
			axios.post('login', this.formData).then(function(m) {
                    let data = m.data;
                    if (data.retCode == 0) {
                        _this.errorMsg = data.retMsg;
                        _this.type = 'warning'
                    } else {
						commit(GET_USERINFO, res)
                        _this.$router.push('/dashboard');
                    }
            }).catch(function(error) {
                    console.error(error);
                    _this.errorMsg = "网络异常，登陆失败！"
            })
			
		},

}