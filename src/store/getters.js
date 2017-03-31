export default {
	loginMenu: state => {
      let ret =  state.userInfo.menus?state.userInfo:JSON.parse(sessionStorage.getItem('userInfo'))
      return ret.menus;
    }
}