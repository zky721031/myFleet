<template>
  <section class="d-flex">
    <!-- loading -->
    <div v-if="loading" class="download_loading"><DownloadLoading /></div>
    <!-- sidebar -->
    <div class="sidebar">
      <!-- search filter -->
      <div v-if="isSearch" class="p-3 sidebar_header">
        <!-- 車 -->
        <div class="mb-4">
          <h6 class="text-white text-uppercase">
            {{ $t("pastSearchMap.eventFiltering") }}
          </h6>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
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
                  @click.prevent="selectedValue = 'allVehicles'"
                  class="dropdown-item text-uppercase"
                  href="#"
                  >{{ $t("pastSearchMap.allVehicles") }}</a
                >
                <a
                  @click.prevent="selectedValue = 'licensePlate'"
                  class="dropdown-item text-uppercase"
                  href="#"
                  >{{ $t("pastSearchMap.licensePlate") }}</a
                >
                <a
                  @click.prevent="selectedValue = 'stations'"
                  class="dropdown-item text-uppercase"
                  href="#"
                  >{{ $t("pastSearchMap.station") }}</a
                >
                <a
                  @click.prevent="selectedValue = 'eventId'"
                  class="dropdown-item text-uppercase"
                  href="#"
                  >{{ $t("pastSearchMap.eventID") }}</a
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
                placeholder="* please select..."
              />
              <datalist id="cookies">
                <option
                  v-for="(licensePlate, idx) in allLicensePlates"
                  :key="idx"
                  >{{ licensePlate.license_plate }}</option
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
                placeholder="* please select..."
              />
              <datalist id="cookies">
                <option v-for="(station, idx) in allStations" :key="idx">{{
                  station.station_name
                }}</option>
              </datalist>
            </template>
            <template v-if="selectedValue === 'eventId'">
              <input
                v-model.trim="inputValue"
                type="text"
                class="form-control"
                placeholder="* please enter..."
              />
            </template>
          </div>
        </div>
        <!-- if selected eventId & hide time event -->
        <template v-if="selectedValue !== 'eventId'">
          <hr class="bg-white" />
          <!-- 時間-->
          <div class="mb-4">
            <h6 class="text-white text-uppercase">
              {{ $t("pastSearchMap.searchTime") }}
            </h6>
            <date-picker
              v-model="range"
              lang="en"
              :disabled-date="disableDate"
              confirm
              range
              type="datetime"
              format="YYYY/MM/DD HH:mm"
              placeholder="please select..."
              class="w-100"
            ></date-picker>
          </div>
          <hr class="bg-white" />
          <!-- 違規項目 -->
          <div class="mb-4 text-uppercase">
            <h6 class="mb-2 text-white">
              {{ $t("pastSearchMap.eventTypes") }}
            </h6>
            <div class="row text-white fz14">
              <div class="col-12">
                <div class="form-check form-check-inline mb-2">
                  <input
                    @change="allSelected"
                    v-model="allSelectedValue"
                    id="all-selected"
                    class="form-check-input checkbox_background"
                    type="checkbox"
                  />
                  <label
                    class="form-check-label text-uppercase"
                    for="all-selected"
                    >{{ $t("pastSearchMap.selectAll") }}</label
                  >
                </div>
              </div>
            </div>
            <div class="row text-white fz14">
              <div v-for="(event, idx) in eventsType" :key="idx" class="col-12">
                <div class="form-check form-check-inline mb-2">
                  <input
                    v-model="event.isChecked"
                    :id="event.id"
                    class="form-check-input checkbox_background"
                    type="checkbox"
                  />
                  <label class="form-check-label" :for="event.id">{{
                    event.label
                  }}</label>
                </div>
              </div>
            </div>
          </div>
        </template>
        <!---->
        <button
          type="button"
          class="btn btn-info btn-block btn-sm"
          @click="pastSearch()"
        >
          SEARCH
        </button>
      </div>
      <!-- search result -->
      <div v-else class="pl-3 pt-3 sidebar_body">
        <div
          class="pr-3 mb-3 text-white d-flex justify-content-between align-items-center text-uppercase"
        >
          <h6 class="mb-0">
            {{ $t("pastSearchMap.results") }} ({{ allSearchEvents.length
            }}{{ $t("pastSearchMap.events") }})
          </h6>
          <i
            class="fas fa-times cursor_pointer clear_data"
            @click="clearAllSearchEvents()"
          ></i>
        </div>
        <ul class="ul_style_none p-0 pr-1 mb-0">
          <li
            v-for="(event, idx) in allSearchEvents"
            :key="idx"
            @click="showModal(idx)"
            class="px-3 py-2 mb-2 rounded position-relative cursor_pointer list_btn"
            data-toggle="modal"
            data-target=".bd-example-modal-lg"
          >
            <p class="mb-0 text-uppercase">
              <span class="text_orange">{{ event.eventString }}</span>
            </p>
            <p class="mb-0">
              <span class="mr-2">{{ event.vehicle }}</span>
              <span class="mr-2">{{ event.station }}</span>
            </p>
            <p class="mb-0 text_gray">
              <small
                >{{ event.event_start_time }} ~
                {{ event.event_end_time }}</small
              >
            </p>
            <i
              class="fas fa-chevron-right position-absolute text_green arrow_right"
            ></i>
          </li>
        </ul>
      </div>
    </div>
    <!-- openStreetMap -->
    <div class="openStreetMap" id="map-wrap">
      <client-only>
        <l-map :zoom="zoom" :center="center">
          <l-tile-layer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          ></l-tile-layer>
          <l-marker
            v-for="(event, idx) in allSearchEvents"
            :key="idx"
            :lat-lng="[event.latitude, event.longitude]"
          >
            <l-icon
              v-if="event.event.slice(0, 3) === 'SID'"
              iconUrl="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
            ></l-icon>
            <l-icon
              v-else
              iconUrl="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
            ></l-icon>
            <l-popup
              ><div
                @click="showModal(idx)"
                class="cursor_pointer"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
              >
                <p>{{ event.vehicle }}</p>
                <p>{{ event.station }}</p>
              </div></l-popup
            ></l-marker
          >
        </l-map>
      </client-only>
    </div>
    <!-- modal-->
    <div
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <b
                ><span class="px-3">{{ eventDetail.vehicle }}</span
                ><span class="px-3">{{ eventDetail.station }}</span></b
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
            <!-- video -->
            <div>
              <video
                class="mb-1"
                :src="eventDetail.video_url"
                width="100%"
                height="auto"
                controls
              ></video>
              <div class="mb-4 text-uppercase">
                <span class="mr-5"
                  ><i class="fas fa-dot-circle mr-2 icons"></i
                  >{{ $t("pastSearchMap.eventID") }}：{{
                    eventDetail.event_id
                  }}</span
                >
                <span
                  ><i class="fas fa-dot-circle mr-2 icons"></i
                  >{{ $t("pastSearchMap.event") }}：{{
                    filterEventType(eventDetail.event)
                  }}</span
                ><br />
                <span
                  ><i class="fas fa-dot-circle mr-2 icons"></i
                  >{{ $t("pastSearchMap.time") }}：{{
                    eventDetail.event_start_time
                  }}
                  ~ {{ eventDetail.event_end_time }}</span
                >
              </div>
              <form>
                <div class="form-group">
                  <label
                    for="exampleFormControlTextarea1"
                    class="text-uppercase"
                    >{{ $t("pastSearchMap.feedback")
                    }}<small
                      v-if="showErrorMsg"
                      class="ml-3"
                      style="color:rgb(234,62,67)"
                      >Please enter...</small
                    ></label
                  >
                  <textarea
                    v-model.trim="eventReport"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </form>
              <button
                @click.prevent="sendMsg(eventDetail.event_id)"
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
  </section>
</template>

<script>
import Api from "~/static/api.js";
import Swal from "sweetalert2";
import DownloadLoading from "~/components/DownloadLoading.vue";

export default {
  name: "monitorMap",
  layout: "user",
  components: {
    DownloadLoading
  },
  data() {
    return {
      Api,
      loading: false,
      // sidebar data change
      isSearch: true,
      // 事件籂選
      selectedValue: "allVehicles",
      inputValue: "",
      vehicle: "",
      station: "",
      eventIdInt: "",
      eventReport: "",
      // 時間籂選
      range: "",
      start_dt: "",
      end_dt: "",
      // 違規項目勾選
      allSelectedValue: false,
      eventsType: [],
      // get all licensePlates & stations
      allLicensePlates: [],
      allStations: [],
      // all events by search done
      allSearchEvents: [],
      eventDetail: {},
      showErrorMsg: false,
      // render map
      zoom: 8,
      center: { lat: 23.5832, lng: 120.5825 },
      zoomDefault: 8,
      centerDefault: { lat: 23.5832, lng: 120.5825 },
      // model data
      filterDate: ""
    };
  },
  mounted() {
    // get all vehicles
    this.getAllVehicles();
    // get all stations
    this.getAllStations();
    // get event type for checkbox
    this.eventTypes();
  },
  methods: {
    // disableDate for future
    disableDate(date) {
      return date >= new Date();
    },
    // show allSearchEvents
    changeIsSearch(i) {
      this.isSearch = i;
    },
    // get all vehicle
    async getAllVehicles() {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: "/vehicles"
      });
      if (data.success) {
        this.allLicensePlates = data.results;
      }
    },
    // get all station
    async getAllStations() {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: "/stations"
      });
      if (data.success) {
        this.allStations = data.results;
      }
    },
    // get event type for checkbox
    async eventTypes() {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: "/event-types"
      });
      if (data.success) {
        data.results.forEach(item => {
          let temp = this.filterEventType(item);
          this.eventsType.push({
            id: item,
            label: temp,
            isChecked: false
          });
        });
      }
    },
    // past search events & map
    async pastSearch() {
      // validated inputValue can't empty
      if (this.selectedValue === "eventId") {
        if (this.inputValue === "") {
          let enMsg = "Please enter Event ID!";
          let cnMsg = "請輸入事件編號！";
          let msg =
            this.$cookies.get("i18n_redirected") === "en" ? enMsg : cnMsg;
          this.sweetAlert(msg);
          // this.sweetAlert("請輸入事件編號！");
          return;
        }
        this.eventIdInt = this.inputValue;
      } else {
        if (this.selectedValue === "licensePlate") {
          if (this.inputValue === "") {
            let enMsg = "Please enter license plate!";
            let cnMsg = "請輸入車牌！";
            let msg =
              this.$cookies.get("i18n_redirected") === "en" ? enMsg : cnMsg;
            this.sweetAlert(msg);
            // this.sweetAlert("請輸入車牌！");
            return;
          }
          this.vehicle = this.inputValue.toUpperCase();
        }
        if (this.selectedValue === "stations") {
          if (this.inputValue === "") {
            let enMsg = "Please enter station!";
            let cnMsg = "請輸入站所！";
            let msg =
              this.$cookies.get("i18n_redirected") === "en" ? enMsg : cnMsg;
            this.sweetAlert(msg);
            // this.sweetAlert("請輸入站所！");
            return;
          }
          // filter station_id
          let stationTemp = this.allStations.filter(item => {
            return item.station_name === this.inputValue;
          });
          this.station = stationTemp[0].station_id;
        }
        // range can't empty & assign start_dt & end_dt
        if (this.range === "") {
          let enMsg = "Please select start time and end time.";
          let cnMsg = "請選擇查詢時間";
          let msg =
            this.$cookies.get("i18n_redirected") === "en" ? enMsg : cnMsg;
          this.sweetAlert(msg);
          // this.sweetAlert("請選擇查詢時間");
          return;
        }
        this.filterRange();
      }

      // filter events to url
      const isCheckedIsTrue = this.eventsType.filter(item => {
        return item.isChecked === true;
      });
      let tempUrl = "";
      isCheckedIsTrue.forEach(item => {
        tempUrl += `event_type=${item.id}&`;
      });
      this.loading = true;
      // post api
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/events/history?vehicle=${this.vehicle}&station_id=${this.station}&${tempUrl}start_dt=${this.start_dt}&end_dt=${this.end_dt}&event_id=${this.eventIdInt}`
      });
      this.loading = false;
      if (data.success) {
        if (data.results.length == 0) {
          let enMsg = "Please try again！";
          let cnMsg = "系統查詢不到您的資料，請再重新查詢！";
          let msg =
            this.$cookies.get("i18n_redirected") === "en" ? enMsg : cnMsg;
          this.sweetAlert(msg);
          return;
        }
        // if data.results > 300
        if (data.results.length <= 300) {
          // console.log("小於300的結果", this.allSearchEvents);
          this.allSearchEvents = data.results;
          this.allSearchEvents.forEach(item => {
            let temp = this.filterEventType(item.event);
            item.eventString = temp;
          });
          // console.log(this.allSearchEvents);
        } else {
          // console.log("大於300的結果", this.allSearchEvents);
          let enMsg =
            "The number of search results exceeds the default system limit (300 results). Only the first 300 results are displayed. You may refine the search criteria to display the rest of the search results.";
          let cnMsg =
            "您查詢的資料超過300筆，系統只為您展示前300筆資料，請縮小查詢範圍！";
          let msg =
            this.$cookies.get("i18n_redirected") === "en" ? enMsg : cnMsg;
          let count =
            this.$cookies.get("i18n_redirected") === "en" ? "events" : "筆";
          this.sweetAlert(`${msg}（${data.results.length} ${count}）`);
          this.allSearchEvents = data.results.slice(0, 300);
          this.allSearchEvents.forEach(item => {
            let temp = this.filterEventType(item.event);
            item.eventString = temp;
          });
          // console.log(this.allSearchEvents);
        }
      } else {
        let enMsg = "Please try again！";
        let cnMsg = "系統查詢不到您的資料，請再重新查詢！";
        let msg = this.$cookies.get("i18n_redirected") === "en" ? enMsg : cnMsg;
        this.sweetAlert(msg);
        return;
      }
      // show allSearchEvents
      this.changeIsSearch(false);
    },
    dataFormat() {
      this.selectedValue = "allVehicles";
      this.inputValue = "";
      this.vehicle = "";
      this.station = "";
      this.eventIdInt = "";
      this.range = "";
      this.start_dt = "";
      this.end_dt = "";
      this.allSearchEvents = [];
      this.allSelectedValue = false;
      this.eventsType.forEach(item => {
        item.isChecked = false;
      });
    },
    clearAllSearchEvents() {
      // data format
      this.dataFormat();
      // update map to center
      this.center = this.centerDefault;
      setTimeout(() => (this.zoom = 8), 1000);
      // back
      this.changeIsSearch(true);
    },
    changeMapStatus(idx) {
      // change map center
      this.center = {
        lat: this.allSearchEvents[idx].latitude,
        lng: this.allSearchEvents[idx].longitude
      };
      // deley 1s to change zoom
      setTimeout(() => (this.zoom = 13), 1000);
    },
    // filter range
    filterRange() {
      //Wed Apr 07 2021 00:00:00 GMT+0800 (台北標準時間) => 20210311
      //start
      if (this.range) {
        let startdate = this.range[0].toString().substring(8, 10);
        let startmonthString = this.range[0].toString().substring(4, 7);
        let startyear = this.range[0].toString().substring(11, 15);
        let starthour = this.range[0].toString().substring(16, 18);
        let startminute = this.range[0].toString().substring(19, 21);
        let startmonth;
        if (startmonthString == "Jan") {
          startmonth = "01";
        }
        if (startmonthString == "Feb") {
          startmonth = "02";
        }
        if (startmonthString == "Mar") {
          startmonth = "03";
        }
        if (startmonthString == "Apr") {
          startmonth = "04";
        }
        if (startmonthString == "May") {
          startmonth = "05";
        }
        if (startmonthString == "Jun") {
          startmonth = "06";
        }
        if (startmonthString == "Jul") {
          startmonth = "07";
        }
        if (startmonthString == "Aug") {
          startmonth = "08";
        }
        if (startmonthString == "Sep") {
          startmonth = "09";
        }
        if (startmonthString == "Oct") {
          startmonth = "10";
        }
        if (startmonthString == "Nov") {
          startmonth = "11";
        }
        if (startmonthString == "Dec") {
          startmonth = "12";
        }
        //end
        let enddate = this.range[1].toString().substring(8, 10);
        let endmonthString = this.range[1].toString().substring(4, 7);
        let endyear = this.range[1].toString().substring(11, 15);
        let endhour = this.range[1].toString().substring(16, 18);
        let endminute = this.range[1].toString().substring(19, 21);
        let endmonth;
        if (endmonthString == "Jan") {
          endmonth = "01";
        }
        if (endmonthString == "Feb") {
          endmonth = "02";
        }
        if (endmonthString == "Mar") {
          endmonth = "03";
        }
        if (endmonthString == "Apr") {
          endmonth = "04";
        }
        if (endmonthString == "May") {
          endmonth = "05";
        }
        if (endmonthString == "Jun") {
          endmonth = "06";
        }
        if (endmonthString == "Jul") {
          endmonth = "07";
        }
        if (endmonthString == "Aug") {
          endmonth = "08";
        }
        if (endmonthString == "Sep") {
          endmonth = "09";
        }
        if (endmonthString == "Oct") {
          endmonth = "10";
        }
        if (endmonthString == "Nov") {
          endmonth = "11";
        }
        if (endmonthString == "Dec") {
          endmonth = "12";
        }
        //20210801_000000
        this.start_dt = `${startyear}${startmonth}${startdate}_${starthour}${startminute}00`;
        this.end_dt = `${endyear}${endmonth}${enddate}_${endhour}${endminute}00`;
      }
    },
    // filter event type
    filterEventType(item) {
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
    // show modal
    showModal(idx) {
      // popup
      this.eventDetail = this.allSearchEvents[idx];
      // update map
      this.changeMapStatus(idx);
    },
    // send event report message
    async sendMsg(id) {
      if (this.eventReport === "") {
        this.showErrorMsg = true;
        return;
      }
      const { data } = await this.$axios({
        method: "POST",
        baseURL: this.Api,
        url: "/events/report",
        data: {
          event_id: id,
          comment: this.eventReport
        }
      });
      this.eventReport = "";
      this.showErrorMsg = false;
    },
    // all selected by checkbox
    allSelected() {
      if (this.allSelectedValue === true) {
        this.eventsType.forEach(item => {
          item.isChecked = true;
        });
      }
      if (this.allSelectedValue === false) {
        this.eventsType.forEach(item => {
          item.isChecked = false;
        });
      }
    },
    // sweetAlert
    sweetAlert(info) {
      Swal.fire({
        title: "oops...",
        text: info,
        type: "question",
        showCloseButton: true,
        focusConfirm: true,
        confirmButtonText: "ENTER",
        confirmButtonColor: "#177096"
      });
    },
    filterDateTime() {
      this.filterDate = moment(this.range).format("YYYY/MM/DD");
    }
  },
  computed: {
    // 重新計算 input datalist
    searchKey() {
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
      if (this.selectedValue === "eventId") {
        this.inputValue = "";
        // return "事件編號";
        return this.$cookies.get("i18n_redirected") === "en"
          ? "event id"
          : "事件編號";
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

.sidebar {
  width: 360px;
  background-color: #177096;
}

.sidebar_body {
  ul {
    height: calc(100vh - 112px);
    overflow-y: auto;
  }
  .clear_data {
    color: #fff;
    &:hover {
      color: #f2994a;
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

// checkbox style
.checkbox_background {
  background-color: #e3b505;
}

input[type="checkbox"] {
  display: inline-block;
  background-color: #aaa;
  padding: 3px 6px;
  border: 1px solid gray;
  color: #444;
  user-select: none; /* 防止文字被滑鼠選取反白 */
}

input[type="checkbox"]:checked {
  color: yellow !important;
  background-color: #444;
}

.event_btn {
  background-color: #fff;
  &:hover {
    background-color: #edf7f6;
  }
}

.openStreetMap {
  width: calc(100vw - 360px);
  height: calc(100vh - 61px);
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

.leaflet-popup-content p {
  margin: 5px 0;
}
</style>
