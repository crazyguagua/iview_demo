import loginlogout from 'api/loginlogout';
import Cookies from 'js-cookie';

const user = {
  state: {
    user: {},
    auth_type: '',
    token: Cookies.get('X-rescue-Token'),
    roles: [],
    acctRole:[],
    acctOrg:{},
    profile:[]
  },

  mutations: {
    SET_AUTH_TYPE: (state, type) => {
      state.auth_type = type;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_ROLES: (state, roles) => {
      state.acctRole = roles;
    },
    SET_ORG:(state,org)=>{
        state.acctOrg = org;
    },
    SET_PROFILE:(state,profile)=>{
        state.profile = profile;
    },
    SET_USER:(state,user)=>{
        state.user = user;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    }
  },

  actions: {
    // 邮箱登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginlogout.login(userInfo).then(response => {
          const data = response.data;
          if(data.retCode == 1){
                debugger;
                Cookies.set('X-rescue-Token', response.data.token);
                commit('SET_TOKEN', data.token);
                commit('SET_USER',data.user)
                commit('SET_ROLES',data.user.acctRole);
                commit('SET_ORG',data.user.acctOrg);
                commit('SET_PROFILE',data.user.profile);
                resolve();
          }else{
              reject(data.retMsg);
          }
          
        }).catch(error => {
          reject(err);
        });
      });
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          commit('SET_ROLES', data.role);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_UID', data.uid);
          commit('SET_INTRODUCTION', data.introduction);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    


    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Cookies.remove('X-Ivanka-Token');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('X-Ivanka-Token');
        resolve();
      });
    }
  }
};

export default user;
