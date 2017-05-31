import axios from 'axios';
const baseURL = 'http://sos.jsecode.com/rescue-esb/';
const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {}
});

const http ={

    req(cmd,para){
        let params = {
            cmd:cmd,
            params:para||{}
        };

        return instance.post('/service/api',params );
    }
};


export default http;


