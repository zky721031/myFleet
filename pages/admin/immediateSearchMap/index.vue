<template>
  <section class="d-flex">
    <!-- loading -->
    <div v-if="loading" class="download_loading"><DownloadLoading /></div>
    <!-- sidebar -->
    <div class="sidebar">
      <!-- top -->
      <div class="p-3 sidebar_header">
        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend text-uppercase">
            <button
              class="btn btn-outline-secondary dropdown-toggle btn-sm text-uppercase btn_dropdown fz14"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ searchKey }}
            </button>
            <div class="dropdown-menu fz14">
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="selectedValue = 'allVehicles'"
                >{{ $t("immediateSearchMap.allVehicles") }}</a
              >
              <a
                class="dropdown-item fz14"
                href="#"
                @click.prevent="selectedValue = 'licensePlate'"
                >{{ $t("immediateSearchMap.licensePlate") }}</a
              >
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="selectedValue = 'stations'"
                >{{ $t("immediateSearchMap.station") }}</a
              >
            </div>
          </div>
          <template v-if="selectedValue === 'allVehicles'">
            <input type="text" class="form-control" disabled />
          </template>
          <template v-if="selectedValue === 'licensePlate'">
            <input
              v-model.trim="inputValue"
              list="cookies"
              class="form-control rounded-right"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="* please enter..."
            />
            <datalist id="cookies">
              <option
                v-for="(licensePlate, idx) in allLicensePlates"
                :key="idx"
                >{{ licensePlate }}</option
              >
            </datalist>
          </template>
          <template v-if="selectedValue === 'stations'">
            <input
              v-model.trim="inputValue"
              list="cookies"
              class="form-control rounded-right"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="* please enter.."
            />
            <datalist id="cookies">
              <option v-for="(station, idx) in allStations" :key="idx">{{
                station
              }}</option>
            </datalist>
          </template>
        </div>
        <button
          @click="filterSearch()"
          type="button"
          class="btn btn-info btn-block btn-sm text-uppercase"
        >
          search
        </button>
        <hr class="bg-white" />
      </div>
      <!-- bottom -->
      <div class="pl-3 sidebar_body">
        <div
          class="pr-3 text-white d-flex justify-content-between align-items-center mb-2 text-uppercase"
        >
          <p
            class="mb-0 cursor_pointer"
            :class="{ text_orange: isOnlinVehicle === true }"
            @click="isOnlinVehicle = true"
          >
            {{ $t("immediateSearchMap.results") }}({{ filterMonitors.length }})
          </p>
          <p
            class="mb-0 cursor_pointer"
            :class="{ text_orange: isOnlinVehicle === false }"
            @click="isOnlinVehicle = false"
          >
            {{ $t("immediateSearchMap.offline") }}({{ offlineMonitors.length }})
          </p>
        </div>
        <ul class="ul_style_none p-0 pr-1 mb-0">
          <!-- online vehicle -->
          <template v-if="isOnlinVehicle">
            <li
              v-for="(vehicle, idx) in filterMonitors"
              :key="idx"
              @click="vehicleModal(vehicle.vehicle)"
              class="px-3 py-2 mb-2 rounded position-relative cursor_pointer list_btn"
              data-toggle="modal"
              data-target=".bd-example-modal-xl"
            >
              <p class="mb-0">
                <span class="mr-3">{{ vehicle.vehicle }}</span
                ><span
                  >{{ vehicle.station_name }} ({{
                    vehicle.event_count
                  }}
                  events)</span
                >
              </p>
              <p class="mb-0 text_gray">
                <small
                  >{{ $t("immediateSearchMap.latestOnlineTime") }} -
                  {{ vehicle.latest_online_time }}</small
                >
              </p>
              <i
                class="fas fa-chevron-right position-absolute text_green arrow_right"
              ></i>
            </li>
          </template>
          <!-- offline vehicle -->
          <template v-else>
            <li
              v-for="(vehicle, idx) in offlineMonitors"
              :key="idx"
              class="px-3 py-2 mb-2 rounded list_btn_offline"
            >
              <p class="mb-0">
                <span class="mr-3">{{ vehicle.vehicle }}</span
                >{{ vehicle.station_name }}
              </p>
              <p class="mb-0 text_gray">
                <small
                  >{{ $t("immediateSearchMap.latestOnlineTime") }} -
                  {{ vehicle.latest_online_time }}</small
                >
              </p>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <!-- openStreetMap -->
    <!-- <p>https://api.mapbox.com/styles/v1/zhengkunyao/ckrlx7svb78gd17mfmuux0bwk/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiemhlbmdrdW55YW8iLCJhIjoiY2tybHg0b202NXI3ajJ3cGRoYjM5aG52MCJ9.TwarPrbfi_ED3azirUzOvw</p> -->
    <!-- <p>https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png</p> -->
    <!-- <p>https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png</p> -->
    <div class="openStreetMap position-relative" id="map-wrap">
      <!-- Rounded switch -->
      <p class="position-absolute countdown_timer  text_gray">
        0{{ min }} : <span v-if="showZero">0</span>{{ sec }} 後更新資料
      </p>
      <label class="position-absolute switch">
        <input v-model="isUpdate" type="checkbox" />
        <span class="slider round"></span>
      </label>
      <!-- map -->
      <client-only>
        <l-map :zoom="zoom" :center="center">
          <l-tile-layer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          ></l-tile-layer>
          <l-marker
            v-for="(icon, idx) in filterMonitors"
            :key="idx"
            :lat-lng="[icon.latitude, icon.longitude]"
            ><l-icon
              iconUrl="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"
            ></l-icon>
            <l-popup
              ><div
                @click="vehicleModal(icon.vehicle)"
                class="cursor_pointer"
                data-toggle="modal"
                data-target=".bd-example-modal-xl"
              >
                <p>{{ icon.vehicle }}</p>
                <p>{{ icon.station_name }}</p>
              </div>
            </l-popup></l-marker
          >
          <!-- <l-marker :lat-lng="[25.03746, 121.564558]"></l-marker> -->
          <!-- <l-marker :lat-lng="[25.0416921, 121.57493919999997]"
            ><l-popup>台北市政府</l-popup></l-marker
          > -->
          <!-- <l-marker :lat-lng="[25.031465400000002, 121.56315049999999]">
            <l-icon
              iconUrl="https://www.google.com/url?sa=i&url=https%3A%2F%2Fzh.wikipedia.org%2Fzh-hant%2FFile%3AGoogle_Maps_icon_(2020).svg&psig=AOvVaw0sECZ4lUgy2llajOV_leg0&ust=1627638605508000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMCJ-riAiPICFQAAAAAdAAAAABAD"
            ></l-icon>
            <l-popup>test</l-popup></l-marker
          > -->
        </l-map>
      </client-only>
    </div>
    <!-- modal-->
    <div
      class="modal fade bd-example-modal-xl"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myExtraLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <b
                ><span class="px-3">{{ eventsDetail.vehicle }}</span>
                <span class="px-3">{{ eventsDetail.station_name }}</span></b
              >
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- 說明 -->
            <div class="container-fluid">
              <div class="row mb-3">
                <div class="col-3">
                  <div class="rounded px-3 py-2 text-white car_start">
                    <p class="mb-1">
                      <small
                        >{{ $t("immediateSearchMap.ignitionStatus")
                        }}<i class="fas fa-wind ml-2"></i
                      ></small>
                    </p>
                    <h4 class="mb-0">
                      <b>{{
                        eventsDetail.latest_acc_status === 0
                          ? $cookies.get("i18n_redirected") === "en"
                            ? "off"
                            : "熄火"
                          : $cookies.get("i18n_redirected") === "en"
                          ? "on"
                          : "發動中"
                      }}</b>
                    </h4>
                  </div>
                </div>
                <div class="col-3">
                  <div class="rounded px-3 py-2 text-white car_move">
                    <p class="mb-1">
                      <small
                        >{{ $t("immediateSearchMap.movingStatus")
                        }}<i class="fas fa-exchange-alt ml-2"></i
                      ></small>
                    </p>
                    <h4 class="mb-0">
                      <b>{{
                        eventsDetail.latest_moving_status === 0
                          ? $cookies.get("i18n_redirected") === "en"
                            ? "move"
                            : "停止"
                          : $cookies.get("i18n_redirected") === "en"
                          ? "stop"
                          : "移動中"
                      }}</b>
                    </h4>
                  </div>
                </div>
                <div class="col-3">
                  <div class="rounded px-3 py-2 text-white car_camera">
                    <p class="mb-1">
                      <small
                        >{{ $t("immediateSearchMap.cameraStatus")
                        }}<i class="fas fa-video ml-2"></i
                      ></small>
                    </p>
                    <h4 class="mb-0">
                      <b>{{
                        eventsDetail.latest_camera_status === 0
                          ? $cookies.get("i18n_redirected") === "en"
                            ? "normal"
                            : "正常"
                          : $cookies.get("i18n_redirected") === "en"
                          ? "abnormal"
                          : "異常"
                      }}</b>
                    </h4>
                  </div>
                </div>
                <div class="col-3">
                  <div class="rounded px-3 py-2 text-white car_online">
                    <p class="mb-1">
                      <small
                        >{{ $t("immediateSearchMap.latestOnlineTime")
                        }}<i class="fas fa-clock ml-2"></i
                      ></small>
                    </p>
                    <h4 class="mb-0">
                      <b>{{ eventsDetail.latest_online_time }}</b>
                    </h4>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-4">
                  <div class="border rounded px-3 py-2">
                    <p class="mb-1 text_gray">
                      <small>{{
                        $t("immediateSearchMap.totalIdlingTime")
                      }}</small>
                    </p>
                    <h4 class="mb-0">
                      <!-- <b>{{ eventsDetail.today_idling_time }}</b>
                      <small>hr</small> -->
                      <b
                        >{{ Math.trunc(eventsDetail.today_idling_time) }}
                        <small>hr</small>
                      </b>
                      <b
                        >{{
                          Math.trunc((eventsDetail.today_idling_time % 1) * 60)
                        }}
                        <small>min</small></b
                      >
                    </h4>
                  </div>
                </div>
                <div class="col-4">
                  <div class="border rounded px-3 py-2">
                    <p class="mb-1 text_gray">
                      <small>{{
                        $t("immediateSearchMap.totalIgnitionTime")
                      }}</small>
                    </p>
                    <h4 class="mb-0">
                      <!-- <b>{{ eventsDetail.today_launch_time }}<small>hr</small></b> -->
                      <b
                        >{{ Math.trunc(eventsDetail.today_launch_time) }}
                        <small>hr</small>
                      </b>
                      <b
                        >{{
                          Math.trunc((eventsDetail.today_launch_time % 1) * 60)
                        }}
                        <small>min</small></b
                      >
                    </h4>
                  </div>
                </div>
                <div class="col-4">
                  <div class="border rounded px-3 py-2">
                    <p class="mb-1 text_gray">
                      <small>{{ $t("immediateSearchMap.totalMileage") }}</small>
                    </p>
                    <h4 class="mb-0">
                      <b>{{ eventsDetail.today_mileage }}</b> <small>km</small>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <!-- 事件 -->
            <div class="container-fluid mb-3">
              <div class="row">
                <div class="col-3">
                  <div
                    v-if="eventsLength === 0"
                    class="px-3 py-2 mb-2 border rounded cursor_pointer event_btn"
                  >
                    {{ $t("immediateSearchMap.noEvents") }}
                  </div>
                  <div
                    v-else
                    v-for="(event, idx) in eventsDetail.events"
                    :key="idx"
                    @click="
                      selectedVideo(idx);
                      isEventBtnActive = idx;
                    "
                    class="px-3 py-2 mb-2 border rounded cursor_pointer event_btn"
                    :class="{ event_btn_actived: isEventBtnActive == idx }"
                  >
                    <i class="fas fa-file-video mr-2 icons"></i
                    >{{ event.event_start_time }} - {{ eventType(event.event) }}
                  </div>
                </div>
                <div class="col-9">
                  <!-- map -->
                  <div v-if="eventsVideo.length === 0"></div>
                  <div v-else class="modalOSM mb-3">
                    <client-only>
                      <l-map :zoom="12" :center="center">
                        <l-tile-layer
                          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        ></l-tile-layer>
                        <template>
                          <l-marker
                            v-for="(icon, idx) in eventsVideo"
                            :key="idx"
                            :lat-lng="[icon.latitude, icon.longitude]"
                            ><l-icon
                              iconUrl="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"
                            ></l-icon>
                            <l-popup
                              ><p>{{ icon.vehicle }}</p>
                              <p>{{ icon.station_name }}</p></l-popup
                            ></l-marker
                          >
                        </template>
                      </l-map>
                    </client-only>
                  </div>
                  <!-- video -->
                  <div v-if="eventsVideo.length === 0"></div>
                  <div v-else v-for="(event, idx) in eventsVideo" :key="idx">
                    <video
                      :src="event.video_url"
                      class="mb-1"
                      width="100%"
                      height="auto"
                      controls
                    ></video>
                    <div class="mb-4">
                      <span class="mr-5"
                        ><i class="fas fa-dot-circle mr-2 icons"></i
                        >{{ $t("immediateSearchMap.eventID") }}：{{
                          event.event_id
                        }}</span
                      >
                      <span
                        ><i class="fas fa-dot-circle mr-2 icons"></i
                        >{{ $t("immediateSearchMap.event") }}：{{
                          eventType(event.event)
                        }}</span
                      ><br />
                      <span
                        ><i class="fas fa-dot-circle mr-2 icons"></i
                        >{{ $t("immediateSearchMap.time") }}：{{
                          event.event_start_time
                        }}
                        - {{ event.event_end_time }}</span
                      >
                    </div>
                    <form>
                      <div class="form-group">
                        <label for="userFeedback" class="text-uppercase"
                          >{{ $t("immediateSearchMap.feedback") }}
                          <small
                            v-if="showErrorMsg"
                            class="ml-3"
                            style="color:rgb(234,62,67)"
                            >Please enter...</small
                          ></label
                        >
                        <textarea
                          v-model.trim="eventReport"
                          class="form-control"
                          id="userFeedback"
                          rows="3"
                        ></textarea>
                      </div>
                    </form>
                    <button
                      @click.prevent="sendMsg(event.event_id)"
                      type="button"
                      class="btn btn-info text-uppercase"
                    >
                      send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Api from "~/static/api.js";
import Swal from "sweetalert2";
import DownloadLoading from "~/components/DownloadLoading.vue";

export default {
  name: "adminMonitorMap",
  layout: "admin",
  components: {
    DownloadLoading
  },
  data() {
    return {
      Api,
      loading: false,
      isOnlinVehicle: true,
      isEventBtnActive: 0,
      // default map
      zoom: 8,
      center: { lat: 23.5832, lng: 120.5825 },
      // get all license plates & stations
      allLicensePlates: [],
      allStations: [],
      // 事件籂選
      selectedValue: "allVehicles",
      inputValue: "",
      // get all monitors
      allMonitors: [],
      onlineMonitors: [],
      offlineMonitors: [],
      filterMonitors: [],
      // all events
      eventsDetail: {},
      eventsLength: -1,
      eventsVideo: [],
      eventReport: "",
      showErrorMsg: false,
      // CountdownTimer
      isUpdate: false,
      timer: "",
      min: 4,
      sec: 59,
      showZero: false
    };
  },
  beforeRouteLeave(to, from, next) {
    // removeTimer
    this.removeTimer();
    // default isUpdate
    this.isUpdate = true;
    // go on;
    next();
  },
  mounted() {
    // get all vehicle
    this.getAllVehicle();
    // get all monitors
    this.getAllMonitors();
  },
  methods: {
    // get all vehicle
    async getAllVehicle() {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: "/vehicles"
      });
      if (data.success) {
        // get allLicensePlates
        data.results.forEach(item =>
          this.allLicensePlates.push(item.license_plate)
        );
        // get allStations
        data.results.forEach(item => this.allStations.push(item.station_name));
        // remove repeat
        this.allStations = [...new Set(this.allStations)];
      }
    },
    // get all monitors
    async getAllMonitors() {
      this.loading = true;
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: "/realtime-monitor/today-latest"
      });
      // console.log(data.results);
      if (data.success) {
        // 獲取所有的車輛
        this.allMonitors = data.results;
        // get online vehicles
        this.getOnlineVehicles();
        // get offline vehicles
        this.getOfflineVehicles();
      }
      // start timer
      this.isUpdate = true;
      // close loading
      this.loading = false;
    },
    // get online vehicles
    getOnlineVehicles() {
      this.onlineMonitors = this.allMonitors.filter(
        item => item.is_online === true
      );
      this.filterMonitors = this.onlineMonitors;
    },
    // get offline vehicles
    getOfflineVehicles() {
      this.offlineMonitors = this.allMonitors.filter(
        item => item.is_online === false
      );
    },
    // filter search
    filterSearch() {
      // search all vehicles - default
      if (this.selectedValue === "allVehicles") {
        this.getAllMonitors();
      }
      // search vehicles by online vehicles
      if (this.selectedValue === "licensePlate") {
        // inputValue & selectedValue can't empty
        if (this.inputValue === "") {
          this.sweetAlert("請輸入車牌！");
          return;
        }
        this.filterMonitors = this.onlineMonitors.filter(
          item => item.vehicle === this.inputValue.toUpperCase()
        );
        this.offlineMonitors = this.offlineMonitors.filter(
          item => item.vehicle === this.inputValue.toUpperCase()
        );
      }
      // search stations by online vehicles
      if (this.selectedValue === "stations") {
        // inputValue & selectedValue can't empty
        if (this.inputValue === "") {
          this.sweetAlert("請輸入站所！");
          return;
        }
        this.filterMonitors = this.onlineMonitors.filter(
          item => item.station_name === this.inputValue
        );
        this.offlineMonitors = this.offlineMonitors.filter(
          item => item.station_name === this.inputValue
        );
      }
      // clear input value
      this.inputValue = "";
      // close timer
      this.isUpdate = false;
    },
    // get detail by vehicle
    async vehicleModal(vehicle) {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/realtime-monitor/vehicles?vehicle=${vehicle}`
      });
      if (data.success) {
        this.eventsDetail = data.results;
        this.eventsLength = data.results.events.length;
      }
      // close timer
      this.isUpdate = false;
      // 預設第一筆資料的影片
      this.selectedVideo();
      // change map scale & center
      this.changeMap();
    },
    // change event video & info
    selectedVideo(idx = 0) {
      // console.log(this.eventsDetail.events);
      if (this.eventsDetail.events.length === 0) {
        this.eventsVideo = [];
      } else {
        this.eventsVideo = [this.eventsDetail.events[idx]];
      }
      // change map scale & center
      this.changeMap();
    },
    // change map scale & map center
    changeMap() {
      // change map center
      if (this.eventsDetail.events.length === 0) {
        return;
      } else {
        this.center = {
          lat: this.eventsDetail.events[0].latitude,
          lng: this.eventsDetail.events[0].longitude
        };
      }
      // deley 1s to change zoom
      setTimeout(() => (this.zoom = 12), 1000);
    },
    // 判斷事件名稱
    eventType(item) {
      // if (i === "SIP-001") return "逆向停車";
      // if (i === "SIP-002") return "斑馬線違停";
      // if (i === "SIP-003") return "黃網線違停";
      // if (i === "SIP-004") return "紅線違停";
      // if (i === "SIP-005") return "公車格違停";
      // if (i === "SIP-006") return "人行道違停";
      // if (i === "SID-001") return "闖紅燈";
      // if (i === "SID-002") return "未停車再開";
      // if (i === "SID-003") return "違規左轉";
      // if (i === "SID-004") return "違規右轉";
      // if (i === "SID-005") return "違反禁止進入";
      // if (i === "SID-006") return "超速";
      // if (i === "OTHER-001") return "怠速";
      if (item === "SID-001")
        return this.$cookies.get("i18n_redirected") === "en"
          ? "red Light Running"
          : "闖紅燈";
      if (item === "SID-002")
        return this.$cookies.get("i18n_redirected") === "en"
          ? "rollong Stops"
          : "未停車再開";
      if (item === "SID-003")
        return this.$cookies.get("i18n_redirected") === "en"
          ? "illegal Left Turn"
          : "違規左轉";
      if (item === "SID-004")
        return this.$cookies.get("i18n_redirected") === "en"
          ? "illegal Right Turn"
          : "違規右轉";
      if (item === "SID-005")
        return this.$cookies.get("i18n_redirected") === "en"
          ? "wrong Way"
          : "違反禁止進入";
      if (item === "SID-006")
        return this.$cookies.get("i18n_redirected") === "en"
          ? "speeding"
          : "超速";
      if (item === "SIP-001")
        return this.$cookies.get("i18n_redirected") === "en"
          ? "wrong Way Parking"
          : "逆向停車";
      if (item === "SIP-002")
        return this.$cookies.get("i18n_redirected") === "en"
          ? "parking at zebra crossing"
          : "斑馬線違停";
      if (item === "SIP-003")
        return this.$cookies.get("i18n_redirected") === "en"
          ? "parking at intersection"
          : "黃網線違停";
      if (item === "SIP-004")
        return this.$cookies.get("i18n_redirected") === "en"
          ? "red curb parking"
          : "紅線違停";
      if (item === "SIP-005")
        return this.$cookies.get("i18n_redirected") === "en"
          ? "bus Stops"
          : "公車格違停";
      if (item === "SIP-006")
        return this.$cookies.get("i18n_redirected") === "en"
          ? "parking Walkway"
          : "人行道違停";
      if (item === "OTHER-001")
        return this.$cookies.get("i18n_redirected") === "en"
          ? "idling"
          : "怠速";
    },
    // send event report message
    async sendMsg(i) {
      if (this.eventReport === "") {
        this.showErrorMsg = true;
        return;
      }
      const { data } = await this.$axios({
        method: "POST",
        baseURL: this.Api,
        url: "/events/report",
        data: {
          event_id: i,
          comment: this.eventReport
        }
      });
      this.eventReport = "";
      this.showErrorMsg = false;
    },
    // start timer
    startTimer() {
      this.timer = window.setInterval(() => {
        this.sec = this.sec - 1;
        if (this.sec < 10) {
          this.showZero = true;
        }
        if (this.sec < 0) {
          this.sec = 59;
          this.showZero = false;
          this.min = this.min - 1;
        }
        if (this.min < 0) {
          this.min = 4;
        }
        // 00:00 update
        if (this.sec < 0 && this.min < 0) {
          // start update
          this.getAllMonitors();
        }
      }, 1000);
    },
    // close timer
    removeTimer() {
      window.clearInterval(this.timer);
      this.min = 4;
      this.sec = 59;
    },
    // sweetAlert
    sweetAlert(info) {
      Swal.fire({
        title: "oops...",
        text: info,
        type: "question",
        showCloseButton: true,
        focusConfirm: true,
        confirmButtonText: "確定",
        confirmButtonColor: "#177096"
      });
    }
  },
  computed: {
    // 重新計算 input datalist
    searchKey() {
      // if (this.selectedValue === "licensePlate") {
      //   this.inputValue = "";
      //   return "車號";
      // } else if (this.selectedValue === "stations") {
      //   this.inputValue = "";
      //   return "站所";
      // } else {
      //   return "所有車輛";
      // }

      if (this.selectedValue === "allVehicles") {
        // return "所有車輛";
        return this.$cookies.get("i18n_redirected") === "en"
          ? "all Vehicles"
          : "所有車輛";
      }
      if (this.selectedValue === "licensePlate") {
        this.inputValue = "";
        // return "車號";
        return this.$cookies.get("i18n_redirected") === "en"
          ? "license Plate"
          : "車號";
      }
      if (this.selectedValue === "stations") {
        this.inputValue = "";
        // return "站所";
        return this.$cookies.get("i18n_redirected") === "en"
          ? "station"
          : "站所";
      }
    }
  },
  watch: {
    isUpdate(i) {
      if (i) {
        // start timer
        this.startTimer();
      } else {
        // close timer
        this.removeTimer();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

* {
  transition: all 0.4s;
}

.download_loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(34, 24, 21, 0.75);
  z-index: 99999999;
}

// Modal
.car_start {
  background-color: #8ae1fc;
}
.car_move {
  background-color: #7adfbb;
}
.car_camera {
  background-color: #f0cf65;
}
.car_online {
  background-color: #e2c2ff;
}
.modalOSM {
  width: 100%;
  height: 450px;
}

.sidebar {
  width: 360px;
  background-color: #177096;
}

.sidebar_body {
  ul {
    height: calc(100vh - 236px);
    overflow-y: auto;
  }
  .clear_data {
    color: #fff;
    &:hover {
      color: orange;
    }
  }
}

.btn_dropdown {
  background-color: #fff;
  &:hover {
    background-color: gray;
  }
}

.list_btn {
  background-color: #fff;
  border: 3px solid #fff;
  &:hover {
    border: 3px solid #e3b505;
  }
  .arrow_right {
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    transition: all 0.4s;
  }
  &:hover > .arrow_right {
    color: #e3b505;
  }
}

.list_btn_offline {
  background-color: #e5e5e5;
  border: 3px solid #e5e5e5;
}

.event_btn {
  background-color: #fff;
  &:hover {
    background-color: #edf7f6;
  }
}

.event_btn_actived {
  background-color: #edf7f6;
}

.openStreetMap {
  width: calc(100vw - 360px);
  height: calc(100vh - 61px);
}

// swich btn
.switch {
  top: 15px;
  right: 15px;
  display: inline-block;
  width: 60px;
  height: 34px;
  // z-index: 999999;
  z-index: 1045;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #177096;
}

input:focus + .slider {
  box-shadow: 0 0 1px #177096;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

// countdownTimer
.countdown_timer {
  z-index: 1045;
  top: 20px;
  right: 90px;
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.leaflet-popup-content p {
  margin: 5px 0;
}
</style>
