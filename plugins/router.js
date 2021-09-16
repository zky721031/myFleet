export default ({ app, store, redirect, params, query }) => {  
    // app 是整個 vue 的實例
    
    // 全局前置路由守衛
    app.router.beforeEach((to, from, next) => {  
        // next(true) / next(false)， 沒有 next('/login') 語法
        
        // if(to.name === 'violateTable'){
        //     next()    
        // }else{
        //     redirect({name: 'index'})
        //     redirect('/')
        // }
        
    })  

    // 全局後置路由守衛，沒有 next
    app.router.afterEach((to, from)=>{})
} 