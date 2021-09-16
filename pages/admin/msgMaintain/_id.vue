<template>
  <div class="container py-4">
    <h4>維修申請</h4>
    <hr />
    <h5 class="mb-3">
      <span
        @click="
          $router.back();
          removeTimer();
        "
        class="py-3 cursor_pointer"
      >
        <i class="fas fa-arrow-circle-left mr-2 icons"></i><b>BACK</b>
      </span>
    </h5>
    <ul class="ul_style_none mb-5 pl-0">
      <li class="p-3 mb-3 bg_gray li_span">
        <span class="one"
          ><i class="fas fa-tags mr-1 icons"></i> {{ $route.query.id }} -
          {{ $route.query.time }}</span
        >
        <span class="two">
          {{ $route.query.status == 0 ? "處理中" : "已完成" }}</span
        >
        <span class="three"
          ><i class="fas fa-truck mr-1 icons_gray"></i>
          {{ $route.query.vehicle }}</span
        >
        <span class="four"
          ><i class="fas fa-map-marker-alt mr-1 icons_gray"></i>
          {{ $route.query.station }}</span
        >
        <hr />
        <p>
          <!-- <i class="fas fa-comment-dots icons_gray"></i> -->
          說明：{{ $route.query.content }}
        </p>
        <ul class="ul_style_none pl-0 d-flex mb-3">
          <li
            v-for="(link, index) in $route.query.attachment"
            :key="index"
            class="bg-white border rounded px-3 py-1 mr-2"
          >
            <a :href="link" class="fz14 link_style" download
              >Download File {{ index + 1 }}</a
            >
          </li>
        </ul>
        <!-- omni & client dialog -->
        <div>
          <div class="border rounded bg-white p-3 mb-2 dialog_box">
            <div
              v-for="msg in allClientMsg"
              :key="msg.created_at"
              class="mb-4"
              :class="{ 'text-right': msg.user_id == $store.state.user_id }"
            >
              <p v-if="msg.user_id != $store.state.user_id" class="mb-2">
                <b>{{
                  msg.user_id == $store.state.user_id
                    ? " "
                    : `${msg.user_name} ~`
                }}</b>
              </p>
              <p
                class="mb-0"
                :class="{ 'test-right': msg.user_id == $store.state.user_id }"
              >
                <span class="w-75">
                  <span
                    class="px-3 py-2 rounded text-left"
                    :class="{
                      bg_gray: msg.user_id != $store.state.user_id,
                      border: msg.user_id == $store.state.user_id
                    }"
                    >{{ msg.content }}</span
                  >
                </span>
              </p>
              <p>
                <small class="text_gray">{{ msg.created_at }}</small>
              </p>
            </div>
          </div>
          <!-- input -->
          <div v-if="$route.query.status == 0" class="input-group">
            <input
              v-model.trim="inputMsgClient"
              v-on:keyup.enter="sendClientMsg()"
              type="text"
              class="form-control"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <div class="input-group-append">
              <button
                @click.prevent="sendClientMsg()"
                class="btn btn-outline-info"
                type="button"
                id="button-addon2"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- omni & client dialog -->
      </li>
      <!-- omni & RD dialog -->
      <li class="p-3 mb-3 bg_gray li_span">
        <p><i class="fas fa-hand-point-right mr-2 icons"></i>指派對象</p>
        <div class="mb-3">
          <div
            v-for="(RD, idx) in allRD"
            :key="idx"
            class="form-check form-check-inline"
          >
            <input
              v-if="$route.query.status == 0"
              v-model="RD.is_selected"
              @input="RDcheckedChange(idx)"
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="option1"
            />
            <label class="form-check-label" for="inlineCheckbox1">{{
              RD.user_name
            }}</label>
          </div>
        </div>
        <div>
          <div class="border rounded bg-white p-3 mb-2 dialog_box">
            <div
              v-for="mg in allRDMsg"
              :key="mg.created_at"
              class="mb-4"
              :class="{ 'text-right': mg.user_id == $store.state.user_id }"
            >
              <p v-if="mg.user_id != $store.state.user_id" class="mb-2">
                <b>{{
                  mg.user_id == $store.state.user_id ? " " : `${mg.user_name} ~`
                }}</b>
              </p>
              <p
                class="mb-0"
                :class="{ 'test-right': mg.user_id == $store.state.user_id }"
              >
                <span class="w-75">
                  <span
                    class="px-3 py-2 rounded text-left"
                    :class="{
                      bg_gray: mg.user_id != $store.state.user_id,
                      border: mg.user_id == $store.state.user_id
                    }"
                    >{{ mg.content }}</span
                  >
                </span>
              </p>
              <p>
                <small class="text_gray">{{ mg.created_at }}</small>
              </p>
            </div>
          </div>
          <!-- input -->
          <div v-if="$route.query.status == 0" class="input-group">
            <input
              v-model.trim="inputMsgRD"
              v-on:keyup.enter="sendMsgToRD()"
              type="text"
              class="form-control"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <div class="input-group-append">
              <button
                @click.prevent="sendMsgToRD()"
                class="btn btn-outline-info"
                type="button"
                id="button-addon2"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="$route.query.status == 0" class="text-center">
      <button
        @click.prevent="ticketDone()"
        class="btn btn-outline-info px-5"
        type="button"
      >
        完成
      </button>
    </div>
  </div>
</template>

<script>
import Api from "~/static/api.js";
import Swal from "sweetalert2";

export default {
  layout: "admin",
  beforeRouteLeave(to, from, next) {
    // removeTimer
    this.removeTimer();
    // 將狀態變已讀
    this.changeStatus();
    // 放行
    next();
  },
  data() {
    return {
      Api,
      inputMsgClient: "",
      inputMsgRD: "",
      allClientMsg: [],
      allRDMsg: [],
      allRD: [],
      timer: {}
    };
  },
  mounted() {
    // 初始化  setInterval
    window.clearInterval(this.timer);
    // 獲取所有客戶端的留言記錄
    this.getAllClientMsg();
    // 獲取所有RD端的留言記錄
    this.getAllRDMsg();
    // 獲取所有RD
    this.getAllRD();
    // 每隔3秒再獲取所有新訊息
    this.timer = window.setInterval(() => {
      this.getAllClientMsg();
      this.getAllRDMsg();
    }, 3000);
  },
  methods: {
    // 獲取所有客戶端的留言記錄 $route.params.id
    async getAllClientMsg() {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/tickets/${this.$route.params.id}/messages/client-am`
      });
      if (data.success) {
        this.allClientMsg = data.results;
      } else {
        console.log("系統有錯誤，請再試一次！");
      }
    },
    // 送出留言 omni -> client
    async sendClientMsg() {
      const { data } = await this.$axios({
        method: "POST",
        baseURL: this.Api,
        url: `/tickets/${this.$route.params.id}/messages/client-am`,
        data: {
          content: this.inputMsgClient
        }
      });
      if (data.success) {
        this.inputMsgClient = "";
        this.getAllClientMsg();
      } else {
        console.log("系統有錯誤，請再試一次！");
      }
    },
    // 獲取所有RD
    async getAllRD() {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/tickets/${this.$route.params.id}/message-group/users/rd`
      });
      if (data.success) {
        this.allRD = data.results;
      } else {
        console.log("系統有錯誤，請再試一次！");
      }
    },
    // 指派給RD
    async RDcheckedChange(idx) {
      // 先處理 user 的資料格式，再賦值給 data
      let tempRD = this.allRD[idx].user_id;
      const user = {};
      user[tempRD] = !this.allRD[idx].is_selected;
      //
      const { data } = await this.$axios({
        method: "POST",
        baseURL: this.Api,
        url: `/tickets/${this.$route.params.id}/message-group/users/rd`,
        data: {
          user: user
        }
      });
      if (data.success == false) {
        console.log("系統有錯誤，請再試一次！");
      }
    },
    // 獲取所有RD端的留言記錄
    async getAllRDMsg() {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/tickets/${this.$route.params.id}/messages/am-rd`
      });
      if (data.success) {
        this.allRDMsg = data.results;
      } else {
        console.log("系統有錯誤，請再試一次！");
      }
    },
    // 送出留言 onmi -> rd
    async sendMsgToRD() {
      const { data } = await this.$axios({
        method: "POST",
        baseURL: this.Api,
        url: `/tickets/${this.$route.params.id}/messages/am-rd`,
        data: {
          content: this.inputMsgRD
        }
      });
      if (data.success) {
        this.inputMsgRD = "";
        this.getAllRDMsg();
      } else {
        console.log("系統有錯誤，請再試一次！");
      }
    },
    // 確認ticket是否要完成
    ticketDone() {
      Swal.fire({
        title: "Are you sure?",
        text: "確定完成此 ticket？",
        type: "warning",
        confirmButtonColor: "#177096",
        confirmButtonText: "確定",
        showCloseButton: true
      }).then(result => {
        if (result.value) {
          this.sendTicketDone();
        }
      });
    },
    // ajax ticket 完成
    async sendTicketDone() {
      const { data } = await this.$axios({
        method: "POST",
        baseURL: this.Api,
        url: `/tickets/${this.$route.params.id}/response`
      });
      if (data.success) {
        this.sweetAlertSuccess("ticket 已完成，請至「已完成」查看！");
        this.$router.back();
      } else {
        this.sweetAlertError("系統有錯誤，請再試一次！");
      }
    },
    // 將狀態變已讀
    async changeStatus() {
      const { data } = await this.$axios({
        method: "POST",
        baseURL: this.Api,
        url: `/tickets/${this.$route.query.id}/read`
      });
    },
    //結束計時器
    removeTimer() {
      window.clearInterval(this.timer);
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
    sweetAlertWarning(info, back) {
      Swal.fire({
        title: "Are you sure?",
        text: info,
        type: "warning",
        confirmButtonColor: "#177096",
        confirmButtonText: "確定",
        showCloseButton: true
      }).then(result => {
        if (result.value) {
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
