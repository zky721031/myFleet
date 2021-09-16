<template>
  <div class="container py-4">
    <h4>原始影像調閱申請</h4>
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
        <span class="mr-2"
          ><i class="fas fa-calendar-alt mr-1 icons_gray"></i
          >{{ $route.query.start_dt }}~{{ $route.query.end_dt }}</span
        >
        <hr />
        <p>
          <!-- <i class="fas fa-comment-dots icons_gray"></i> -->
          說明：{{ $route.query.content }}
        </p>
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
                  msg.user_id == $store.state.user_id ? " " : `${msg.user_name}`
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
        </div>
        <!-- omni & client dialog -->
      </li>
      <!-- omni & RD dialog -->
      <li class="p-3 mb-3 bg_gray li_span">
        <p><i class="fas fa-hand-point-right mr-2 icons"></i>指派對象</p>
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
                  mg.user_id == $store.state.user_id ? " " : `${mg.user_name}`
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
  </div>
</template>

<script>
export default {
  layout: "rd",
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
      inputMsgRD: "",
      allClientMsg: [],
      allRDMsg: [],
      timer: {}
    };
  },
  mounted() {
    // console.log(this.$route.query.id);
    // 初始化  setInterval
    window.clearInterval(this.timer);
    // 獲取所有客戶端的留言記錄
    this.getAllClientMsg();
    // 獲取所有RD端的留言記錄
    this.getAllRDMsg();
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
        baseURL: "http://18.178.54.255:5001",
        url: `/tickets/${this.$route.params.id}/messages/client-am`
      });
      if (data.success) {
        this.allClientMsg = data.results;
      } else {
        return;
      }
    },
    // 獲取所有RD端的留言記錄
    async getAllRDMsg() {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: "http://18.178.54.255:5001",
        url: `/tickets/${this.$route.params.id}/messages/am-rd`
      });
      if (data.success) {
        this.allRDMsg = data.results;
      } else {
        alert("您的權限已被取消，系統將回到上一頁！");
        this.$router.back();
      }
    },
    // 送出留言 onmi -> rd
    async sendMsgToRD() {
      const { data } = await this.$axios({
        method: "POST",
        baseURL: "http://18.178.54.255:5001",
        url: `/tickets/${this.$route.params.id}/messages/am-rd`,
        data: {
          content: this.inputMsgRD
        }
      });
      if (data.success) {
        this.inputMsgRD = "";
        this.getAllRDMsg();
      } else {
        return;
      }
    },
    // 將狀態變已讀
    async changeStatus() {
      const { data } = await this.$axios({
        method: "POST",
        baseURL: "http://18.178.54.255:5001",
        url: `/tickets/${this.$route.query.id}/read`
      });
    },
    //結束計時器
    removeTimer() {
      window.clearInterval(this.timer);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/allRecode.scss";
</style>
