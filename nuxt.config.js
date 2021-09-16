const pkg = require("./package");

module.exports = {
  mode: "universal",
  // server: {
  //   port: 3000,
  //   host: "0.0.0.0"
  // },
  router: {
    middleware: "auth"
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: pkg.description
      }
    ],
    link: [{
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "stylesheet",
        href: "https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      },
      {
        rel: "stylesheet"
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/3.0.5/daterangepicker.css"
      }
    ],
    script: [{
        src: "https://code.jquery.com/jquery-3.3.1.slim.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
      },
      {
        src: "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
      },
      {
        // src: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"
        src: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/3.0.5/moment.min.js"
      },
      {
        // src: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"
        src: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/3.0.5/daterangepicker.js"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#177096"
  },
  // 自定義 loading page
  // loading: '~/components/Loading.vue',
  // transition:{
  //   name:'layout',
  //   mode:'out-in'
  // },
  /*
   ** Global CSS
   */
  css: ["~/assets/scss/global.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // 全局路由守卫
    // '~/plugins/router'
    // axios 攔截設定
    {
      src: "~/plugins/axios",
      ssr: true
    },
    {
      src: "~/plugins/vue2datepicker.js"
    },
    {
      src: "~/plugins/spinner.js",
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt",
    "nuxt-sweetalert2",
    [
      "nuxt-i18n",
      {
        locales: ["en", "zh"],
        defaultLocale: "zh",
        vueI18n: {
          fallbackLocale: "en",
          messages: {
            en: {
              greeting: "Hello world!",
              header: {
                realtimeMonitor: "realtime monitor",
                eventSearch: "event search",
                rawVideo: "raw video",
                message: "message"
              },
              immediateSearchMap: {
                allVehicles: "all vehicles",
                licensePlate: "license plate",
                station: "station",
                results: "online",
                offline: "offline",
                events: "events",
                ignitionStatus: "ignition status",
                on: "ON",
                off: "OFF",
                movingStatus: "moving status",
                move: "moving",
                stop: "stop",
                cameraStatus: "camera angle status",
                normal: "normal",
                tiltedDown: "tilted（down）",
                tiltedUp: "tilted（up）",
                blocked: "blocked",
                latestOnlineTime: "latest online time（today）",
                totalIdlingTime: "total idling time（today）",
                totalIgnitionTime: "total ignition time（today）",
                totalMileage: "total mileage（today）",
                noEvents: "no events",
                feedback: "user feedback",
                eventID: "event ID",
                time: "time",
                event: "event"
              },
              pastSearchMap: {
                eventFiltering: "event filtering",
                allVehicles: "all vehicles",
                licensePlate: "license plate",
                station: "station",
                eventID: "event ID",
                searchTime: "start time / end time",
                eventTypes: "event types",
                selectAll: "all",
                results: "results",
                events: "events",
                redLightRunning: "red light running",
                illegalLeftTurn: "illegal left turn",
                wrongWay: "wrong way",
                wrongWayParking: "wrong-way parking",
                parkingAtIntersection: "parking at intersection",
                busStops: "parking at designated bus stops",
                parkingAtZebraCrossing: "parking at zebra crossing",
                parkingAtIntersection: "parking at intersection",
                idling: "idling",
                rollongStops: "rollong stops",
                illegalRightTurn: "illegal right turn",
                speeding: "speeding",
                redCurbParking: "red-curb parking",
                parkingWalkway: "parking at pedestrian walkway",
                time: "time",
                event:"event",
                feedback: "user feedback",
                send: "send",
                pop: "The number of search results exceeds the default system limit (300 results). Only the first 300 results are displayed. You may refine the search criteria to display the rest of the search results.",
                popErr: "Please try again！"
              },
              videoSearch: {
                title: "raw video",
                statement: "The access of video data on this website is limited to authorized personnel only. Any copy, reproduction, or any form of disclosure or dissemination of the videos is strictly prohibited unless a written consent is provided. Any violation will be subject to fine or criminal responsibility of related laws including Personal Data Protection Law, Copyright Law, etc.",
                latestOnlineTime: "latest online time（today）",
                updates: "updates",
                require: "require",
                watch: "play",
                loading: "loading",
                noVideos: "no videos",
                noService: "no service"
              }
            },
            zh: {
              greeting: "您好！",
              header: {
                realtimeMonitor: "即時監控",
                eventSearch: "事件查詢",
                rawVideo: "原始影像調閱",
                message: "訊息",
              },
              immediateSearchMap: {
                allVehicles: "所有車輛",
                licensePlate: "車號",
                station: "站所",
                results: "上線",
                offline: "未上線",
                events: "筆",
                ignitionStatus: "發動狀態",
                on: "發動",
                off: "熄火",
                movingStatus: "移動狀態",
                move: "移動",
                stop: "停止",
                cameraStatus: "鏡頭狀態",
                normal: "正常",
                tiltedDown: "偏低",
                tiltedUp: "偏高",
                blocked: "遮蔽",
                latestOnlineTime: "車機最後上線時間（今日）",
                totalIdlingTime: "總怠速時間（今日累計）",
                totalIgnitionTime: "總發動時間（今日累計）",
                totalMileage: "總行駛里程（今日累計）",
                noEvents: "目前沒有事件",
                feedback: "誤判回報",
                eventID: "事件編號",
                time: "時間",
                event: "事件"
              },
              pastSearchMap: {
                eventFiltering: "事件籂選",
                allVehicles: "所有車輛",
                licensePlate: "車號",
                station: "站所",
                eventID: "事件編號",
                searchTime: "查詢時間",
                eventTypes: "違規項目",
                selectAll: "全選",
                results: "查詢結果",
                events: "筆",
                redLightRunning: "闖紅燈",
                illegalLeftTurn: "違規左轉",
                wrongWay: "違反禁止進入",
                wrongWayParking: "逆向停車",
                parkingAtIntersection: "路口違停",
                busStops: "公車格違停",
                parkingAtZebraCrossing: "斑馬線違停",
                parkingAtIntersection: "黃網線違停",
                idling: "怠速",
                rollongStops: "未停車再開",
                illegalRightTurn: "違規右轉",
                speeding: "超速",
                redCurbParking: "紅線違停",
                parkingWalkway: "人行道違停",
                time: "時間",
                event:"事件",
                feedback: "誤判回報",
                send: "送出",
                pop: "您查詢的資料超過300筆，系統只為您展示前300筆資料，請縮小查詢範圍！",
                popErr: "系統查詢不到您的資料，請再重新查詢！"
              },
              videoSearch: {
                title: "原始影像調閱",
                statement: "本網站之影像紀錄調閱僅限於所長及相關被授權人員。此外，除非得到車管處或法務室之書面或電子郵件同意函外，所有調閱僅供觀看，嚴禁任何複製、翻拍、重製及任何形式的洩漏與分享，違反者將觸犯個人資料保護法、著作權法與刑法並需承擔相關之民事與刑事責任。",
                latestOnlineTime: "車機最後上線時間（今日）",
                updates: "更新",
                require: "調閱影像",
                watch: "播放影片",
                loading: "影片回傳中…",
                noVideos: "車機無此影片",
                noService: "超出服務提供範圍"
              }
            }
          }
        }
      }
    ],
    [
      "nuxt-leaflet",
      {
        /* options */
      }
    ]
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // 0304 新增
    proxy: true
    // baseUrl 前綴
    // prefix: '/api'
  },
  proxy: {
    // 代理轉發地址
    // "/user/": {
    //   target: "http://54.64.47.129:5000", 
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/api': '',
    //   }
    // },
    // "/vehicles": {
    //   target: "http://54.64.47.129:5000",
    //   changeOrigin: true
    // },
    // "/tickets": {
    //   target: "http://54.64.47.129:5000",
    //   changeOrigin: true
    // },
    // "/stations": {
    //   target: "http://54.64.47.129:5000",
    //   changeOrigin: true
    // },
    // "/tickets/new-vehicle": {
    //   target: "http://54.64.47.129:5000",
    //   changeOrigin: true
    // }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extractCSS: true,
    extend(config, ctx) {}
  }
};
