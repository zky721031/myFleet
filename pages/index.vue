<template>
  <section class="login">
    <div class="row">
      <div class="col-8 p-0">
        <div class="left_side">
          <div class="description text-center text-white">
            <img src="" alt="" />
            <h1>
              <b>Welcome!</b>
            </h1>
            <h3>
              A new way of managing your fleets - total control with AI and
              video.
            </h3>
          </div>
        </div>
      </div>
      <div class="col-4 p-0">
        <div class="right_side">
          <div class="login_area text-center">
            <img
              class="logo img-fluid mb-4"
              src="@/assets/imgs/logo.png"
              alt=""
            />
            <h4 class="text-center mb-4">
              Login to your Account
            </h4>
            <form class="mb-5">
              <div class="form-group">
                <input
                  v-model.trim="account"
                  type="text"
                  class="form-control"
                  placeholder="Account"
                />
              </div>
              <div class="form-group mb-4">
                <input
                  v-model.trim="password"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <div class="text-left fz14 mb-3">
                <p v-if="statementCN">
                  本網站之影像紀錄調閱僅限於所長及相關被授權人員。此外，除非得到車管處或法務室之書面或電子郵件同意函外，所有調閱僅供觀看，嚴禁任何複製、翻拍、重製及任何形式的洩漏與分享，違反者將觸犯個人資料保護法、著作權法與刑法並需承擔相關之民事與刑事責任。
                </p>
                <p v-else>
                  The access of video data on this website is limited to
                  authorized personnel only. Any copy, reproduction, or any form
                  of disclosure or dissemination of the videos is strictly
                  prohibited unless a written consent is provided. Any violation
                  will be subject to fine or criminal responsibility of related
                  laws including Personal Data Protection Law, Copyright Law,
                  etc.
                </p>
              </div>
              <div class="form-group form-check text-left mb-4">
                <input
                  v-model="checkStatement"
                  type="checkbox"
                  class="form-check-input"
                  id="statement"
                />
                <div class="d-flex justify-content-between">
                  <label
                    class="form-check-label text-left fz14"
                    for="statement"
                    >{{ statementCN ? "同意" : "agree" }}</label
                  >
                  <p class="mb-0 cursor_pointer fz14">
                    <i class="fab fa-readme mr-1"></i>
                    <span
                      v-if="!statementCN"
                      @click="changeLang(true)"
                      class="mr-3"
                      >閱讀中文聲明</span
                    ><span v-else @click="changeLang(false)"
                      >Read english statement</span
                    >
                  </p>
                </div>
              </div>
              <button
                @click.prevent="loginPost"
                type="submit"
                class="rounded mb-1 omni_btn"
              >
                LOGIN
              </button>
              <p class="mb-0 text-left">
                <small v-if="showErrorMsg" class="text_red text-left"
                  >{{
                    statementCN
                      ? "請確認您的帳戶或密碼！"
                      : "Please checked your account or password!"
                  }}
                </small>
              </p>
              <p class="mb-0 text-left">
                <small v-if="showCheckMsg" class="text_red text-left"
                  >{{
                    statementCN
                      ? "請同意本網站聲明！"
                      : "You must agree to the statement to login."
                  }}
                </small>
              </p>
            </form>
            <!-- <div class="d-flex justify-content-between py-3">
              <a class="rounded omni_btn" href="#">使用東捷帳號登入</a>
            </div> -->
          </div>
          <p class="text-center statement">
            <small>Copyright © 2020 OmniEyes. All rights reserved.</small>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// 1、登入時，將 token 同步存入 vuex && cookie
// 2、刷新後，使用 nuxtServerInit hook 取出 cookies token，同步存入 vuex
// 3、axios 攔截器讀取 vuex token
import Api from "~/static/api.js";

export default {
  name: "login",
  layout: "login",
  data() {
    return {
      Api,
      account: "",
      password: "",
      showErrorMsg: false,
      showCheckMsg: false,
      checkStatement: "",
      statementCN: true
    };
  },
  methods: {
    changeLang(i) {
      this.statementCN = i;
      this.showErrorMsg = false;
      this.showCheckMsg = false;
    },
    // Axios POST - LOGIN
    async loginPost() {
      this.showErrorMsg = false;
      this.showCheckMsg = false;
      if (this.account === "" || this.password === "") {
        // show msg
        this.showErrorMsg = true;
        return;
      }
      if (this.checkStatement === "" || this.checkStatement === false) {
        // show msg
        this.showCheckMsg = true;
        return;
      }
      const { data } = await this.$axios({
        method: "POST",
        baseURL: this.Api,
        url: "/user/myfleet-login",
        data: {
          account: this.account,
          password: this.password
        }
      });
      if (data.success === true) {
        // 1、若 role_id:2（client 行控） 跳轉頁面到 /repair
        if (data.results.role_id === 2 || data.results.role_id === 3) {
          this.$router.replace("/pastSearchMap");
          // user can't use navigation item
          this.$cookies.set(
            "event_search",
            data.results.permission.event_search
          );
          this.$cookies.set("raw_video", data.results.permission.raw_video);
          this.$cookies.set(
            "realtime_monitor",
            data.results.permission.realtime_monitor
          );
          this.$cookies.set("ticket", data.results.permission.ticket);
        }
        // 2、若 role_id:4（AM） 跳轉頁面到 /admin/msgMaintain
        if (data.results.role_id === 4) {
          // this.$router.push({ name: "msgMaintain" });
          this.$router.replace("/admin/msgMaintain");
          // user can't use navigation item
          this.$cookies.set(
            "event_search",
            data.results.permission.event_search
          );
          this.$cookies.set("raw_video", data.results.permission.raw_video);
          this.$cookies.set(
            "realtime_monitor",
            data.results.permission.realtime_monitor
          );
          this.$cookies.set("ticket", data.results.permission.ticket);
        }
        // 3、若role_id:5（RD） 跳轉頁面到 /RD/rdRepair
        if (data.results.role_id === 5) {
          this.$router.replace("/RD/rdRepair");
        }
        // 4、set cookies
        this.$cookies.set("authToken", data.results.token);
        this.$cookies.set("client_id", data.results.role_id);
        this.$cookies.set("client_name", data.results.user_name);
        this.$cookies.set("user_id", data.results.user_id);
        // 5、set vuex
        this.$store.dispatch("storeToken", data.results.token);
        this.$store.dispatch("storeClientID", data.results.role_id);
        this.$store.dispatch("storeClientName", data.results.user_name);
        this.$store.dispatch("storeUserID", data.results.user_id);
        // 6、清空資料
        this.account = "";
        this.password = "";
      } else {
        this.showErrorMsg = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/login.scss";
</style>
