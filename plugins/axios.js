import { axios } from "../nuxt.config";

 export default ({$axios, redirect, route, store}) => {
    // 基本配置
    // $axios.defaults.timeout = 10000;

    // request 攔截
    $axios.onRequest((config) => {
        // console.log('require 攔截啟動')
        
        // 每次 ajax 都會自帶 token，需參考 api 文件
        config.headers.Authorization = `Bearer ${store.state.authToken}` 
        return config
    })

    // response 攔截
    $axios.onResponse((res) => {
        // console.log('response 攔截啟動')
        // response 錯誤返回時
        if(res.data.success === false && route.fullPath !== '/'){
            // redirect('/login?path='+route.fullpath )
            // redirect('/')
        }
        return res
    })

    // 錯誤處理
    $axios.onError((error)=>{
        //處理
        return error
    })

 }