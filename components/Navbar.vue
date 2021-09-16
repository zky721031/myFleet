<template>
  <section class="">
    <div class="nav_border text-uppercase">
      <div class="menu d-flex justify-content-between align-items-center px-3">
        <img
          class="mr-3 omni_logo"
          src="@/assets/imgs/Navbar/omnieyes-logo.svg"
          alt=""
        />
        <ul class="d-flex align-items-center p-0 m-0 mr-auto ul_style_none">
          <li
            v-if="$cookies.get('realtime_monitor')"
            class="p-3"
            @click="isActived = 1"
          >
            <nuxt-link
              :class="{ atv: isActived === 1 }"
              :to="localePath('/immediateSearchMap')"
              ><strong>{{ $t("header.realtimeMonitor") }}</strong></nuxt-link
            >
          </li>
          <li
            v-if="$cookies.get('event_search')"
            class="p-3"
            @click="isActived = 2"
          >
            <nuxt-link
              :class="{ atv: isActived === 2 }"
              :to="localePath('/pastSearchMap')"
              ><strong>{{ $t("header.eventSearch") }}</strong></nuxt-link
            >
          </li>
          <li
            v-if="$cookies.get('raw_video')"
            class="p-3"
            @click="isActived = 3"
          >
            <nuxt-link
              :class="{ atv: isActived === 3 }"
              :to="localePath('/videoSearch')"
              ><strong>{{ $t("header.rawVideo") }}</strong></nuxt-link
            >
          </li>
          <!-- <li class="p-3" @click="isActived = 3">
            <a
              :class="{ atv: isActived === 3 }"
              class="dropdown-toggle"
              id="data"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="#"
              >資料報表</a
            >
            <div
              class="dropdown-menu"
              aria-labelledby="data"
              style="z-index:9999999"
            >
              <nuxt-link class="dropdown-item" to="/violateTable"
                >違規事件</nuxt-link
              >
              <nuxt-link class="dropdown-item" to="/">拔電源事件</nuxt-link>
              <nuxt-link class="dropdown-item" to="/">鏡頭遮蔽</nuxt-link>
              <nuxt-link class="dropdown-item" to="/">優良駕駛</nuxt-link>
              <nuxt-link class="dropdown-item" to="/">誤判事件</nuxt-link>
            </div>
          </li> -->
          <li v-if="$cookies.get('ticket')" class="p-3" @click="isActived = 4">
            <a
              :class="{ atv: isActived === 4 }"
              class="dropdown-toggle"
              id="circular"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="#"
              ><strong>事件通報</strong></a
            >
            <div
              class="dropdown-menu"
              aria-labelledby="circular"
              style="z-index:9999999"
            >
              <nuxt-link class="dropdown-item" :to="localePath('/repair')"
                >維修申請</nuxt-link
              >
              <nuxt-link class="dropdown-item" :to="localePath('/install')"
                >新裝機申請</nuxt-link
              >
              <nuxt-link class="dropdown-item" :to="localePath('/scrapped')"
                >報廢申請</nuxt-link
              >
              <nuxt-link class="dropdown-item" :to="localePath('/dataChange')"
                >車籍資料異動</nuxt-link
              >
              <nuxt-link class="dropdown-item" :to="localePath('/videoRead')"
                >原始影像調閱</nuxt-link
              >
            </div>
          </li>
          <!-- <li class="p-3" @click="isActived = 5">
            <nuxt-link :class="{ atv: isActived === 5 }" to="/cardata"
              >車籍資料</nuxt-link
            >
          </li> -->
          <li v-if="$cookies.get('ticket')" class="p-3" @click="isActived = 6">
            <a
              :class="{ atv: isActived === 6 }"
              class="dropdown-toggle"
              id="circular"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="#"
              ><i
                v-if="allNewMsg"
                class="fas fa-bell mr-2"
                :class="{ icons_orange: allNewMsg > 0 }"
              ></i
              ><strong>通報記錄</strong>
            </a>
            <div
              class="dropdown-menu"
              aria-labelledby="circular"
              style="z-index:9999999"
            >
              <nuxt-link class="dropdown-item" :to="localePath('/repairRecode')"
                >維修申請記錄
                <small v-if="newMsg[1]" class="new_msg">{{
                  newMsg[1]
                }}</small></nuxt-link
              >
              <nuxt-link
                class="dropdown-item"
                :to="localePath('/installRecode')"
                >新裝機申請記錄
                <small v-if="newMsg[2]" class="new_msg">{{
                  newMsg[2]
                }}</small></nuxt-link
              >
              <nuxt-link
                class="dropdown-item"
                :to="localePath('/scrappedRecode')"
                >報廢申請記錄
                <small v-if="newMsg[3]" class="new_msg">{{
                  newMsg[3]
                }}</small></nuxt-link
              >
              <nuxt-link
                class="dropdown-item"
                :to="localePath('/datachangeRecode')"
                >車籍資料異動記錄
                <small v-if="newMsg[4]" class="new_msg">{{
                  newMsg[4]
                }}</small></nuxt-link
              >
              <nuxt-link
                class="dropdown-item"
                :to="localePath('/videoReadRecode')"
                >原始影像調閱記錄
                <small v-if="newMsg[5]" class="new_msg">{{
                  newMsg[5]
                }}</small></nuxt-link
              >
            </div>
          </li>
        </ul>
        <ul class="d-flex align-items-center p-0 m-0 ul_style_none">
          <li
            v-if="$cookies.get('ticket')"
            class="p-3 mr-3"
            @click="isActived = 7"
          >
            <a
              :class="{ atv: isActived === 7 }"
              class="dropdown-toggle"
              id="office"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="#"
              ><i
                class="fas fa-bell mr-2 icons"
                :class="{ icons_orange: allNewMsgAM > 0 }"
              ></i
              ><strong>訊息</strong></a
            >
            <div
              class="dropdown-menu"
              aria-labelledby="office"
              style="z-index:9999999"
            >
              <nuxt-link class="dropdown-item" :to="localePath('/powerError')"
                >拔電源通報
                <small v-if="newMsgAM[6]" class="new_msg">{{
                  newMsgAM[6]
                }}</small></nuxt-link
              >
              <nuxt-link class="dropdown-item" :to="localePath('/viewError')"
                >鏡頭遮蔽通報
                <small v-if="newMsgAM[7]" class="new_msg">{{
                  newMsgAM[7]
                }}</small></nuxt-link
              >
              <nuxt-link class="dropdown-item" :to="localePath('/software')"
                >軟體更新通報
                <small v-if="newMsgAM[8]" class="new_msg">{{
                  newMsgAM[8]
                }}</small></nuxt-link
              >
              <nuxt-link class="dropdown-item" :to="localePath('/hardware')"
                >硬體檢查通報
                <small v-if="newMsgAM[9]" class="new_msg">{{
                  newMsgAM[9]
                }}</small></nuxt-link
              >
              <nuxt-link class="dropdown-item" :to="localePath('/omniNotice')"
                >其它通報
                <small v-if="newMsgAM[10]" class="new_msg">{{
                  newMsgAM[10]
                }}</small></nuxt-link
              >
            </div>
          </li>
          <li class="p-3" @click="isActived = 8">
            <a
              :class="{ atv: isActived === 8 }"
              class="dropdown-toggle"
              id="office"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="#"
              ><i class="fas fa-globe mr-2"></i><strong>LANGUAGE</strong></a
            >
            <div
              class="dropdown-menu"
              aria-labelledby="office"
              style="z-index:9999"
            >
              <nuxt-link
                v-if="$i18n.locale !== 'zh'"
                :to="switchLocalePath('zh')"
                class="dropdown-item"
                >中文</nuxt-link
              ><nuxt-link
                v-if="$i18n.locale !== 'en'"
                :to="switchLocalePath('en')"
                class="dropdown-item"
                >English</nuxt-link
              >
            </div>
          </li>
          <li class="p-3" @click="isActived = 9">
            <a
              :class="{ atv: isActived === 9 }"
              class="dropdown-toggle"
              id="office"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="#"
              ><strong>{{ $store.state.client_name }}</strong></a
            >
            <div
              class="dropdown-menu"
              aria-labelledby="office"
              style="z-index:9999"
            >
              <a @click.prevent="signOut" class="dropdown-item" href="#"
                >Logout</a
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Api from "~/static/api.js";

export default {
  name: "userNavbar",
  data() {
    return {
      Api,
      isActived: 0,
      newMsg: "",
      newMsgAM: "",
      timeoutID: {}
    };
  },
  mounted() {
    // 初始化  setInterval
    window.clearInterval(this.timeoutID);
    // 獲取所有新訊息
    this.getNewMsg();
    this.getNewMsgAM();
    // 每隔10秒再獲取所有新訊息
    this.timeoutID = window.setInterval(() => {
      this.getNewMsg();
      this.getNewMsgAM();
    }, 3000);
  },
  methods: {
    signOut() {
      // 1、導回登入頁
      // this.$router.push({ name: "index" });
      this.$router.push("/");
      // 2、清空 store.state.authToken
      this.$store.dispatch("logout");
      // 3、清空 cookie
      this.$cookies.remove("authToken");
      // 4、停止計時器
      window.clearInterval(this.timeoutID);
      // 5、清空 cookie for navigation
      this.$cookies.remove("event_search");
      this.$cookies.remove("raw_video");
      this.$cookies.remove("realtime_monitor");
      this.$cookies.remove("ticket");
    },
    //
    async getNewMsg() {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: "/tickets/count/unread/client-to-am"
      });
      this.newMsg = data.results;
    },
    // AM to Client
    async getNewMsgAM() {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: "/tickets/count/unread/am-to-client"
      });
      if (data.success) {
        this.newMsgAM = data.results;
      } else {
        return;
      }
    }
  },
  computed: {
    allNewMsg() {
      let temp = 0;
      for (let i = 1; i <= 5; i++) {
        temp += this.newMsg[i];
      }
      return temp;
    },
    allNewMsgAM() {
      let temp = 0;
      for (let i = 6; i <= 7; i++) {
        temp += this.newMsgAM[i];
      }
      return temp;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "./Navbar.scss";
</style>
