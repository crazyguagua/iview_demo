import http from 'src/http';
import md5 from 'js-md5';

const service = {
    login(params){
        if(params.password){
            params.password = md5(md5(params.password));
        }
        return http.req('login',params);  
    }
}

export default service;