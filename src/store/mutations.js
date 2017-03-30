import {
	LOGIN_INFO,
	LOG_OUT,
} from './mutation-types.js'

export default {
	// 记录当前经度纬度
	// [RECORD_ADDRESS](state, {
	// 	latitude,
	// 	longitude
	// }) {
	// 	state.latitude = latitude;
	// 	state.longitude = longitude;
	// },
	//登陆
	[LOGIN_INFO](state,userInfo){
		state.userInfo = userInfo;
		sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
	},
	//退出登陆
	[LOG_OUT](state) {
		state.userInfo = null;
		state.login = false;
	},
}