export default {
	loginMenu: state => {
      let ret =  state.userInfo.menus ||JSON.parse(sessionStorage.getItem('userInfo'))
      return ret.menus;
    }
}