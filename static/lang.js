const messages = {
  zh : {
    greeting: "您好！",
    header: {
      realtimeMonitor: "即時監控",
      eventSearch: "事件查詢",
      rawVideo: "原始影像調閱",
      message: "訊息",
    }, 
    immediateSearchMap:{
        allVehicles:"所有車輛",
        licensePlate:"車號",
        station:"站所",
        results:"搜尋結果",
        offline:"未上線",
        ignitionStatus:"發動狀態",
        on:"發動",
        off:"熄火",
        movingStatus:"移動狀態",
        move:"移動",
        stop:"停止",
        cameraStatus:"鏡頭狀態",
        normal:"正常",
        tiltedDown:"偏低",
        tiltedUp:"偏高",
        blocked:"遮蔽",
        latestOnlineTime:"車機最後上線時間（今日）",
        totalIdlingTime:"總怠速時間（今日累計）",
        totalIgnitionTime:"總發動時間（今日累計）",
        totalMileage:"總行駛里程（今日累計）",
        noEvents:"目前沒有事件",
        feedback:"誤判回報",
        eventID:"事件編號"
    },
    pastSearchMap:{
        eventFiltering:"事件籂選",
        allVehicles:"所有車輛",
        licensePlate:"車號",
        station:"站所",
        eventID:"事件編號",
        searchTime:"查詢時間",
        eventTypes:"違規項目",
        redLightRunning:"闖紅燈",
        illegalLeftTurn:"違規左轉",
        wrongWay:"違反禁止進入",
        wrongWayParking:"逆向停車",
        parkingAtIntersection:"路口違停",
        busStops:"公車格違停",
        idling:"怠速",
        rollongStops:"未停車再開",
        illegalRightTurn:"違規右轉",
        speeding:"超速",
        redCurbParking:"紅線違停",
        parkingWalkway:"人行道違停",
        pop:"您查詢的資料超過300筆（26879筆），系統只為您展示前300筆資料，請縮小查詢範圍！"
    },
    videoSearch:{
        statement:"本網站之影像紀錄調閱僅限於所長及相關被授權人員。此外，除非得到車管處或法務室之書面或電子郵件同意函外，所有調閱僅供觀看，嚴禁任何複製、翻拍、重製及任何形式的洩漏與分享，違反者將觸犯個人資料保護法、著作權法與刑法並需承擔相關之民事與刑事責任。",
        title:"001-JT 目前上線 - 今日最後上線時間（15:17:20）"
    }
  },
  en : {
    greeting: "Hello world!",
    header: {
      realtimeMonitor: "realtime monitor",
      eventSearch: "event search",
      rawVideo: "raw video",
      message: "message"
    },
    immediateSearchMap:{
        allVehicles:"all vehicles",
        licensePlate:"license plate",
        station:"station",
        results:"results",
        offline:"offline results",
        ignitionStatus:"ignition status",
        on:"ON",
        off:"OFF",
        movingStatus:"moving status",
        move:"moving",
        stop:"stop",
        cameraStatus:"camera angle status",
        normal:"normal",
        tiltedDown:"tilted（down）",
        tiltedUp:"tilted（up）",
        blocked:"blocked",
        latestOnlineTime:"latest online time（today）",
        totalIdlingTime:"total idling time（today）",
        totalIgnitionTime:"total ignition time（today）",
        totalMileage:"total mileage（today）",
        noEvents:"no events",
        feedback:"user feedback",
        eventID:"event ID"
    },
    pastSearchMap:{
        eventFiltering:"event filtering",
        allVehicles:"all vehicles",
        licensePlate:"license plate",
        station:"station",
        eventID:"event ID",
        searchTime:"start time / end time",
        eventTypes:"event types",
        redLightRunning:"red light running",
        illegalLeftTurn:"illegal left turn",
        wrongWay:"wrong way",
        wrongWayParking:"wrong-way parking",
        parkingAtIntersection:"parking at intersection",
        busStops:"parking at designated bus stops",
        idling:"idling",
        rollongStops:"rollong stops",
        illegalRightTurn:"illegal right turn",
        speeding:"speeding",
        redCurbParking:"red-curb parking",
        parkingWalkway:"parking at pedestrian walkway",
        pop:"The number of search results (26879 results) exceeds the default system limit (300 results). Only the first 300 results are displayed. You may refine the search criteria to display the rest of the search results."
    },
    videoSearch:{
        statement:"The access of video data on this website is limited to authorized personnel only. Any copy, reproduction, or any form of disclosure or dissemination of the videos is strictly prohibited unless a written consent is provided. Any violation will be subject to fine or criminal responsibility of related laws including Personal Data Protection Law, Copyright Law, etc.",
        title:"目前上線 - 今日最後上線時間"
    }
  }
}
