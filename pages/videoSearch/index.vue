<template>
  <section>
    <!-- loading -->
    <div v-if="loading" class="download_loading"><DownloadLoading /></div>
    <!-- content -->
    <div class="container py-4">
      <h4 class="text-uppercase">{{ $t("videoSearch.title") }}</h4>
      <p>
        {{ $t("videoSearch.statement") }}
      </p>
      <hr />
      <!-- timezone -->
      <!--
      <div class="row">
        <div class="col">
          <div class="form-group">
            <select v-model="timeZoneValue" class="form-control fz14">
              <option selected disabled>time zone</option>
              <option value="-12">-12</option>
              <option value="-11">-11</option>
              <option value="-10">-10</option>
              <option value="-9">-9</option>
              <option value="-8">-8</option>
              <option value="-7">-7</option>
              <option value="-6">-6</option>
              <option value="-5">-5</option>
              <option value="-4">-4</option>
              <option value="-3">-3</option>
              <option value="-2">-2</option>
              <option value="-1">-1</option>
              <option value="0">+0</option>
              <option value="1">+1</option>
              <option value="2">+2</option>
              <option value="3">+3</option>
              <option value="4">+4</option>
              <option value="5">+5</option>
              <option value="6">+6</option>
              <option value="7">+7</option>
              <option value="8">+8</option>
              <option value="9">+9</option>
              <option value="10">+10</option>
              <option value="11">+11</option>
              <option value="12">+12</option>
            </select>
          </div>
        </div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col-2"></div>
      </div>
      -->
      <!---->
      <div class="row mb-5">
        <div class="col">
          <div class="form-group">
            <input
              v-model.trim="vehicleValue"
              list="cookies"
              placeholder="* license plate"
              class="form-control rounded-right fz14"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing"
            />
            <datalist id="cookies">
              <option
                v-for="(licensePlate, idx) in allLicensePlates"
                :key="idx"
                >{{ licensePlate.license_plate }}</option
              >
            </datalist>
          </div>
        </div>
        <div class="col">
          <div>
            <date-picker
              v-model="dateValue"
              lang="en"
              :disabled-date="disableDate"
              confirm
              type="date"
              format="YYYY-MM-DD"
              placeholder="* select date"
              class="w-100"
            ></date-picker>
          </div>
        </div>
        <div class="col">
          <div class="form-group fz14">
            <select v-model="hourValue" class="form-control fz14">
              <option disabled selected>* hour</option>
              <option v-for="(hr, idx) in 24" :key="idx">{{ idx }}</option>
            </select>
          </div>
        </div>
        <div class="col-2">
          <button
            @click="getVideos"
            type="button"
            class="btn btn-info btn-block fz14"
          >
            SEARCH
          </button>
        </div>
      </div>
      <!---->
      <div class="row mb-3">
        <div class="col-12">
          <div
            v-if="showTitle"
            class="d-flex justify-content-between align-items-center"
          >
            <h5 class="mb-0">
              {{ vehicleValue }}
              -
              <span v-if="videoResults.latest_online_time_today">{{
                $t("videoSearch.latestOnlineTime")
              }}</span>
              {{
                videoResults.latest_online_time_today === null
                  ? $cookies.get("i18n_redirected") === "en"
                    ? `offline today`
                    : `今日未上線`
                  : videoResults.latest_online_time_today
              }}
              <span v-if="videoResults.latest_online_time_today !== null"
                >（{{
                  videoResults.is_online_now
                    ? $cookies.get("i18n_redirected") === "en"
                      ? "online"
                      : "目前上線"
                    : $cookies.get("i18n_redirected") === "en"
                    ? "offline"
                    : "目前未上線"
                }}）</span
              >
            </h5>
            <p
              @click="getVideos"
              class="mb-0 px-2 py-1 rounded text-uppercase fz14 btn_video cursor_pointer"
            >
              {{ $t("videoSearch.updates") }}
            </p>
          </div>
        </div>
      </div>
      <!---->
      <div class="row">
        <div v-for="(video, idx) in videoLists" :key="idx" class="col-6 mb-3">
          <div class="d-flex align-items-center px-3 py-2 video_list">
            <div class="mr-4">{{ currentHour }}:{{ video.minute }}</div>
            <div class="mr-auto">
              {{
                video.by_system
                  ? $cookies.get("i18n_redirected") === "en"
                    ? "upload by system"
                    : "系統自動上傳"
                  : ""
              }}
            </div>
            <div class="d-flex">
              <div v-if="video.video_status == 0">
                <p class="mb-0 px-2 py-1 border rounded fz14">
                  {{ $t("videoSearch.loading") }}
                </p>
              </div>
              <div v-if="video.video_status == 4">
                {{ $t("videoSearch.noVideos") }}
              </div>
              <div v-if="video.video_status == 5" class="d-flex">
                <p
                  @click="showVideo(video.video_key)"
                  class="mb-0 px-2 py-1 rounded fz14 cursor_pointer btn_video_watch"
                  data-toggle="modal"
                  data-target=".bd-example-modal-lg"
                >
                  {{ $t("videoSearch.watch") }}
                </p>
                <!-- <p class="mb-0 px-2 py-1 rounded fz14 btn_video cursor_pointer">
                  <a :href="modalVideo" download>下載影片</a>
                </p> -->
              </div>
              <div v-if="video.video_status == 6">
                {{ $t("videoSearch.noService") }}
              </div>
              <div v-if="video.video_status == null" class="d-flex">
                <p
                  v-if="!video.dataBack"
                  @click="requestVideo(idx, $event)"
                  class="mb-0 px-2 py-1 rounded fz14 btn_video cursor_pointer"
                >
                  {{ $t("videoSearch.require") }}
                </p>
                <p v-else class="mb-0 px-2 py-1 border rounded fz14">
                  {{ $t("videoSearch.loading") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!---->
    </div>
    <!-- Modal -->
    <div
      class="modal fade bd-example-modal-lg"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">
              video
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
            <div>
              <video
                :src="modalVideo"
                width="100%"
                height="auto"
                controls
              ></video>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-info btn-sm"
              data-dismiss="modal"
            >
              Close
            </button>
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
  name: "videoSearch",
  layout: "user",
  components: {
    DownloadLoading
  },
  data() {
    return {
      Api,
      loading: false,
      // timeZoneValue: "time zone",
      vehicleValue: "",
      dateValue: "",
      hourValue: "* hour",
      currentHour: "",
      filterDateValue: "",
      allLicensePlates: "",
      //
      videoResults: "",
      videoLists: [],
      showTitle: false,
      modalVideo: ""
    };
  },
  mounted() {
    this.getAllVehicles();
  },
  methods: {
    // disableDate for future
    disableDate(date) {
      return date >= new Date();
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
    // get 60's video events
    async getVideos() {
      // validater
      // if (
      //   this.timeZoneValue === "time zone" ||
      //   this.vehicleValue === "" ||
      //   this.dateValue === "" ||
      //   this.hourValue === "* hour"
      // ) {
      //   this.sweetAlert("請確認輸入是否正確！");
      //   return;
      // }
      if (
        this.vehicleValue === "" ||
        this.dateValue === "" ||
        this.hourValue === "* hour"
      ) {
        this.sweetAlert("請確認輸入是否正確！");
        return;
      }
      // time format
      this.filterDateValue = moment(this.dateValue).format("YYYYMMDD");
      // 預設目前時區為 +8
      // this.timeZoneValue = 8;
      this.currentHour = this.hourValue;
      // ajax
      this.loading = true;
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/raw-video/list?vehicle=${this.vehicleValue}&date=${this.filterDateValue}&hour=${this.hourValue}&timezone=8`
      });
      if (data.success) {
        this.videoResults = data.results;
        this.videoLists = data.results.video_status_array;
        this.videoLists.forEach(item => {
          this.$set(item, "dataBack", false);
        });
        this.showTitle = true;
      }
      this.loading = false;
    },
    async requestVideo(idx, e) {
      // clicked change dataBack = true
      this.videoLists[idx].dataBack = true;
      // ajax post
      const { data } = await this.$axios({
        method: "POST",
        baseURL: this.Api,
        url: "/raw-video",
        data: {
          vehicle: this.vehicleValue,
          video_datetime: this.videoLists[idx].video_datetime,
          timezone: 8
        }
      });
    },
    // modal video
    async showVideo(key) {
      console.log("key", key);
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/raw-video?video_key=${key}`
      });
      if (data.success) {
        this.modalVideo = data.results;
        console.log(data.results);
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
        confirmButtonText: "確定",
        confirmButtonColor: "#177096"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.download_loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(34, 24, 21, 0.75);
  z-index: 99999999;
}

.video_list {
  border: 1px solid rgba(195, 202, 210, 1);
  border-radius: 5px;
}
.btn_video {
  border: 1px solid rgba(27, 146, 169, 1);
  color: rgba(27, 146, 169, 1);
  transition: all 0.4s;
  &:hover {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(27, 146, 169, 1);
  }
  a {
    color: rgba(27, 146, 169, 1);
    text-decoration: none;
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
}
.btn_video_watch {
  border: 1px solid rgba(27, 146, 169, 1);
  background-color: rgba(27, 146, 169, 1);
  color: #fff;
  transition: all 0.4s;
  &:hover {
    border: 1px solid rgba(27, 146, 169, 1);
    background-color: #fff;
    color: rgba(27, 146, 169, 1);
  }
}
.load_video {
  border: 1px solid rgba(27, 146, 169, 0);
  color: rgba(27, 146, 169, 0.5);
}
</style>
