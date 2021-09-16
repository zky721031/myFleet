<template>
  <section class="">
    <div class="nav_border">
      <div class="menu d-flex justify-content-between align-items-center px-3">
        <img
          class="mr-3 omni_logo"
          src="@/assets/imgs/Navbar/omnieyes-logo.svg"
          alt=""
        />
        <ul class="d-flex align-items-center p-0 m-0 mr-auto ul_style_none">
          <!-- <li class="p-3" @click="isActived = 1">
            <router-link :class="{ atv: isActived === 1 }" to="/prompt"
              >即時查詢</router-link
            >
          </li> -->
          <!-- <li class="p-3" @click="isActived = 2">
            <router-link :class="{ atv: isActived === 2 }" to="/past"
              >歷史查詢</router-link
            >
          </li> -->
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
              <router-link class="dropdown-item" to="/admin/violateTable"
                >違規事件</router-link
              >
              <router-link class="dropdown-item" to="/admin/violateTable"
                >拔電源事件</router-link
              >
              <router-link class="dropdown-item" to="/admin/violateTable"
                >鏡頭遮蔽</router-link
              >
              <router-link class="dropdown-item" to="/admin/violateTable"
                >優良駕駛</router-link
              >
              <router-link class="dropdown-item" to="/admin/violateTable"
                >誤判事件</router-link
              >
            </div>
          </li> -->
          <!-- <li class="p-3" @click="isActived = 4">
            <a
              :class="{ atv: isActived === 4 }"
              class="dropdown-toggle"
              id="circular"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="#"
              >事件通報</a
            >
            <div
              class="dropdown-menu"
              aria-labelledby="circular"
              style="z-index:9999999"
            >
              <router-link class="dropdown-item" to="/admin/removePower"
                >拔電源通報</router-link
              >
              <router-link class="dropdown-item" to="/admin/shadeView"
                >鏡頭遮蔽通報</router-link
              >
              <router-link class="dropdown-item" to="/admin/omniNotice"
                >omni通報</router-link
              >
            </div>
          </li> -->
          <!-- <li class="p-3" @click="isActived = 5">
            <router-link :class="{ atv: isActived === 5 }" to="/cardata"
              >車籍資料</router-link
            >
          </li> -->
          <!-- <li class="p-3" @click="isActived = 6">
            <a
              :class="{ atv: isActived === 6 }"
              class="dropdown-toggle"
              id="circular"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="#"
              >通報記錄</a
            >
            <div
              class="dropdown-menu"
              aria-labelledby="circular"
              style="z-index:9999999"
            >
              <router-link class="dropdown-item" to="/admin/removePowerRecode"
                >拔電源通報記錄</router-link
              >
              <router-link class="dropdown-item" to="/admin/shadeViewRecode"
                >鏡頭遮蔽通報記錄</router-link
              >
              <router-link class="dropdown-item" to="/admin/omniNoticeRecode"
                >omni通報記錄</router-link
              >
            </div>
          </li> -->
        </ul>
        <ul class="d-flex align-items-center p-0 m-0 ul_style_none">
          <li class="p-3 mr-3" @click="isActived = 7">
            <a
              :class="{ atv: isActived === 7 }"
              class="dropdown-toggle"
              id="office"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="#"
              ><i
                class="fas fa-bell mr-2"
                :class="{ icons_orange: allNewMsg > 0 }"
              ></i
              >訊息</a
            >
            <div
              class="dropdown-menu"
              aria-labelledby="office"
              style="z-index:9999999"
            >
              <nuxt-link class="dropdown-item" to="/RD/rdRepair"
                >維修申請
                <small v-if="newMsg[1]" class="new_msg">{{
                  newMsg[1]
                }}</small></nuxt-link
              >
              <nuxt-link class="dropdown-item" to="/RD/rdInstall"
                >新裝機申請
                <small v-if="newMsg[2]" class="new_msg ">{{
                  newMsg[2]
                }}</small></nuxt-link
              >
              <nuxt-link class="dropdown-item" to="/RD/rdScrapped"
                >報廢申請
                <small v-if="newMsg[3]" class="new_msg">{{
                  newMsg[3]
                }}</small></nuxt-link
              >
              <nuxt-link class="dropdown-item" to="/RD/rdDataChange"
                >車籍資料異動
                <small v-if="newMsg[4]" class="new_msg">{{
                  newMsg[4]
                }}</small></nuxt-link
              >
              <nuxt-link class="dropdown-item" to="/RD/rdVideoRead"
                >原始影像調閱
                <small v-if="newMsg[5]" class="new_msg">{{
                  newMsg[5]
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
              >{{ $store.state.client_name }}</a
            >
            <div
              class="dropdown-menu"
              aria-labelledby="office"
              style="z-index:9999999"
            >
              <!-- <router-link class="dropdown-item" to="/message"
              >事件訊息</router-link
            > -->
              <!-- <router-link class="dropdown-item" to="/">修改密碼</router-link> -->
              <a @click.prevent="signOut" class="dropdown-item" href="#"
                >登出</a
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
  data() {
    return {
      Api,
      isActived: 0,
      newMsg: "",
      timeoutID: {}
    };
  },
  mounted() {
    // 初始化  setInterval
    window.clearInterval(this.timeoutID);
    // 獲取所有新訊息
    this.getNewMsg();
    // 每隔3分鐘再獲取所有新訊息
    this.timeoutID = window.setInterval(() => this.getNewMsg(), 3000);
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
    },
    //
    async getNewMsg() {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: "/tickets/count/unread/client-to-am"
      });
      this.newMsg = data.results;
    }
  },
  computed: {
    allNewMsg() {
      let temp = 0;
      for (let i = 1; i <= 5; i++) {
        temp += this.newMsg[i];
      }
      // console.log(temp);
      return temp;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "./Navbar.scss";
</style>
