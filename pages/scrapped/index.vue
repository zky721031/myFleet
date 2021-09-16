<template>
  <section>
    <div class="container py-4">
      <h4>報廢申請</h4>
      <hr />
      <!--  -->
      <div class="p-3 mb-5 bg_gray">
        <h6 class="mb-3"><i class="fas fa-tags mr-2 icons"></i>建立資料</h6>
        <div class="row">
          <div class="col-4">
            <div class="form-group">
              <input
                v-model.trim="vehicleInput"
                list="cookies"
                placeholder="* 請輸入車號"
                class="form-control"
              />
              <datalist id="cookies">
                <option v-for="(vehicle, idx) in allVehicles" :key="idx">{{
                  vehicle.license_plate
                }}</option>
              </datalist>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <textarea
                v-model.trim="content"
                class="form-control"
                rows="3"
                placeholder="備註"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-12">
            <no-ssr>
              <label
                for="UPLOAD-ID"
                class="mr-4 border rounded px-3 py-2 bg-white text_green_light cursor_pointer mb-2"
              >
                附加檔案<span class="fz12"
                  >（總檔案大小須小於10MB）</span
                ></label
              >
              <input
                @change="uploadFile"
                type="file"
                class="d-none"
                id="UPLOAD-ID"
                multiple
                ref="upload"
                accept="image/*"
              />
              <div v-if="fileLists.length">
                <span
                  v-for="(item, idx) in fileLists"
                  :key="idx"
                  class="px-2 py-1 border rounded bg-white mr-2 mb-2 d-inline-block relative fz12"
                  ><i
                    class="fas fa-times mr-2 absolute cursor_pointer"
                    @click="deleteFile(idx)"
                  ></i
                  >{{ item.name }}（{{
                    (item.size / 1024 / 1024).toFixed(2)
                  }}MB）</span
                >
              </div>
            </no-ssr>
          </div>
        </div>
        <div class="">
          <button
            @click="temporary"
            type="button"
            class="btn btn-outline-info mb-3"
          >
            暫存
          </button>
          <p>
            <small
              ><i class="fas fa-campground mr-2 icons"></i
              >您建立的資料暫存在下方，建立完成後，請記得點選下方「<span
                class="text_green"
                ><b>送出資料</b></span
              >」按鈕。</small
            >
          </p>
        </div>
      </div>
      <!--  -->
      <div class="p-3 mb-5">
        <h6><i class="fas fa-tags mr-2 icons"></i>暫存資料</h6>
        <hr />
        <ul v-for="(i, idx) in dataLists" :key="idx" class="pl-0 ul_style_none">
          <li class="p-3 mb-3 rounded bg_gray li_temp_span list_effect">
            <span class="one"
              ><i class="fas fa-circle mr-1 icons fz10"></i>{{ idx + 1 }}</span
            >
            <span class="two"
              ><i class="fas fa-truck mr-1 icons_gray"></i>{{ i.vehicle }}</span
            >
            <span class="three"
              ><i class="fas fa-map-marker-alt mr-1 icons_gray"></i
              >{{ i.station_name }}</span
            >
            <span
              ><i class="fas fa-comment-dots mr-1 icons_gray"></i
              >{{ `${i.content.slice(0, 25)}...` }}</span
            >
            <span v-if="i.attachment.length" class="px-3">
              <i class="fas fa-cloud-upload-alt mr-1 icons_gray"></i>
              附加
              {{ i.attachment.length }} 張圖片
            </span>
            <span
              @click="removeList(idx)"
              class="float-right px-2 cursor_pointer"
              ><i class="fas fa-trash icons"></i
            ></span>
          </li>
        </ul>
      </div>
      <!--  -->
      <div class="text-center">
        <button
          @click="sendDataLists()"
          type="button"
          class="btn btn-info mb-3"
        >
          送出資料
        </button>
        <p>
          <small
            >請點擊上方按鈕送出資料，您可以在「<span class="text_green"
              >通報記錄</span
            >」檢視事件通報處理進度。</small
          >
        </p>
      </div>
      <!--  -->
    </div>
  </section>
</template>

<script>
import Api from "~/static/api.js";
import Swal from "sweetalert2";

export default {
  name: "scrapped",
  layout: "user",
  data() {
    return {
      Api,
      allVehicles: "",
      vehicleInput: "",
      content: "",
      dataLists: [],
      imgBs64: "",
      fileName: "",
      fileLength: "",
      fileSize: "",
      fileArray: [],
      fileLists: []
    };
  },
  mounted() {
    // 獲取所有車牌號碼 vehicles
    this.getAllVehicles();
  },
  methods: {
    // 獲取所有車牌號碼 vehicles
    async getAllVehicles() {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: "/vehicles"
      });
      if (data.success) {
        this.allVehicles = data.results;
      } else {
        console.log("取不到所有車牌！");
      }
    },
    // 暫存 tickets
    temporary() {
      if (!this.vehicleInput) {
        this.sweetAlertError("請確認您的資料是否有缺少？");
        return;
      }
      if (this.fileSize > 10) {
        this.sweetAlertError("您上傳檔案大小須小於10MB！");
        return;
      }
      // 用 allVehicles 過濾出符合條件的站所名稱
      let stationTemp = this.allVehicles.find(item => {
        return item.license_plate == this.vehicleInput;
      });
      // 添加到 dataLists
      this.dataLists.push({
        vehicle: this.vehicleInput,
        station_name: stationTemp.station_name,
        content: this.content ? `${this.content}` : "無備註",
        attachment: this.fileArray
      });
      // 清空所有 input
      this.vehicleInput = "";
      this.content = "";
      this.fileArray = [];
      this.fileLists = [];
    },
    removeList(idx) {
      this.sweetAlertWarning("您確定要刪除此筆資料？", "資料已刪除", idx);
    },
    // POST Tickets
    async sendDataLists() {
      if (this.dataLists.length == 0) {
        this.sweetAlertError("沒有資料可送出，請建立資料");
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      // open isLoading status
      this.$store.dispatch("changeIsLoading", true);
      // ajax send
      const { data } = await this.$axios({
        method: "POST",
        baseURL: this.Api,
        url: "/tickets/scrap",
        data: {
          tickets: this.dataLists
        }
      });
      if (data.success) {
        // close isLoading status
        this.$store.dispatch("changeIsLoading", false);
        this.sweetAlertSuccess("資料已送出！");
      } else {
        // close isLoading status
        this.$store.dispatch("changeIsLoading", false);
        this.sweetAlertError("資料傳送失敗，請重試！");
      }
      this.dataLists = [];
    },
    // upload file
    uploadFile() {
      // 取得上傳檔案DOM，將類陣列轉為陣列
      const uploadFile = [...this.$refs?.upload?.files];
      this.fileLists.push(...uploadFile);
      let _self = this;
      for (let i = 0; i < uploadFile.length; i++) {
        // 取得 base64 string
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadFile[i]);
        fileReader.onload = function(FileLoadEvent) {
          let strIndex = FileLoadEvent.target.result.indexOf(",", 0);
          _self.fileArray.push({
            file_name: uploadFile[i].name,
            base64_data: FileLoadEvent.target.result.slice(++strIndex, -1)
          });
        };
      }
      this.countAllFileSize();
    },
    // 刪除上傳圖片
    deleteFile(i) {
      this.fileArray.splice(i, 1);
      this.fileLists.splice(i, 1);
      this.countAllFileSize();
    },
    // 計算上傳檔案大小
    countAllFileSize() {
      let total = 0;
      for (let i = 0; i < this.fileLists.length; i++) {
        total += this.fileLists[i].size * 1;
      }
      this.fileSize = total / 1024 / 1024;
    },
    // sweetalert success
    sweetAlertSuccess(info) {
      Swal.fire({
        title: "Success",
        text: info,
        type: "success",
        showCloseButton: true,
        focusConfirm: true,
        confirmButtonText: "確定",
        confirmButtonColor: "#177096"
      });
    },
    // sweetalert error
    sweetAlertError(info) {
      Swal.fire({
        title: "oops...",
        text: info,
        type: "error",
        showCloseButton: true,
        focusConfirm: true,
        confirmButtonText: "確定",
        confirmButtonColor: "#177096"
      });
    },
    // sweetalert warning
    sweetAlertWarning(info, back, idx) {
      Swal.fire({
        title: "Are you sure?",
        text: info,
        type: "warning",
        confirmButtonColor: "#177096",
        confirmButtonText: "確定",
        showCloseButton: true
      }).then(result => {
        if (result.value) {
          this.dataLists.splice(idx, 1);
          Swal.fire({
            title: "Deleted!",
            text: back,
            type: "success",
            confirmButtonColor: "#177096"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/allRecode.scss";
</style>
