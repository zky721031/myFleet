<template>
  <section>
    <div class="container py-4">
      <h4>維修申請記錄</h4>
      <hr />
      <!--  -->
      <div class="mb-5">
        <!-- tab -->
        <div class="mb-4">
          <ul class="d-flex align-items-center pl-0 mb-0 ul_style_none">
            <li class="mr-3" @click="getAllTickets()">
              <nuxt-link to="/repairRecode" class="btn btn-info"
                >處理中</nuxt-link
              >
            </li>
            <li class="mr-auto">
              <nuxt-link to="/repairRecode/done" class="btn btn-outline-info"
                >已完成</nuxt-link
              >
            </li>
            <li class="mr-2">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle fz14"
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
                      @click="selectedValue = 'ticketId'"
                      >通報編號</a
                    >
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="selectedValue = 'licensePlate'"
                      >車號</a
                    >
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="selectedValue = 'stations'"
                      >站所</a
                    >
                  </div>
                </div>
                <template v-if="selectedValue === 'ticketId'">
                  <input
                    v-model.trim="inputValue"
                    type="text"
                    class="form-control fz14"
                    placeholder="* 請輸入通報編號"
                  />
                </template>
                <template v-if="selectedValue === 'licensePlate'">
                  <input
                    v-model.trim="inputValue"
                    list="cookies"
                    class="form-control rounded-right fz14"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing"
                    placeholder="* 請輸入車牌"
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
                    class="form-control rounded-right fz14"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing"
                    placeholder="* 請輸入站所"
                  />
                  <datalist id="cookies">
                    <option v-for="(station, idx) in allStations" :key="idx">{{
                      station.station_name
                    }}</option>
                  </datalist>
                </template>
              </div>
            </li>
            <li class="mr-2">
              <date-picker
                v-model="searchRangeTime"
                lang="en"
                :disabled-date="disableDate"
                range
                confirm
                type="date"
                format="YYYY-MM-DD"
                placeholder="請選擇時間"
              ></date-picker>
            </li>
            <li>
              <button
                type="submit"
                class="btn btn-outline-info"
                @click.prevent="handleSearchData()"
              >
                search
              </button>
            </li>
          </ul>
        </div>
        <!-- 處理中 -->
        <div>
          <ul class="ul_style_none mb-5 pl-0">
            <nuxt-link
              v-for="ticket in allTickets"
              :key="ticket.ticket_id"
              :to="{
                name: 'repairRecode-id___zh',
                params: {
                  id: ticket.ticket_id
                },
                query: {
                  id: ticket.ticket_id,
                  time: ticket.created_at,
                  status: ticket.status,
                  vehicle: ticket.vehicle,
                  station: ticket.station,
                  content: ticket.content,
                  attachment: [...ticket.attachment],
                  searchStatus: isSearch,
                  defaultPage,
                  searchPage
                }
              }"
              class="nuxt_link"
            >
              <li
                @click="changeStatus(ticket.ticket_id)"
                class="p-3 mb-3 rounded bg_gray li_span list_effect"
              >
                <span class="one"
                  ><i
                    class="fas fa-tags mr-1 icons"
                    :class="{ icons_orange: ticket.is_unread }"
                  ></i
                  >{{ ticket.ticket_id }} - {{ ticket.created_at }}</span
                >
                <span class="two">{{
                  ticket.status === 0 ? "處理中" : "已完成"
                }}</span>
                <span class="three"
                  ><i class="fas fa-truck mr-1 icons_gray"></i
                  >{{ ticket.vehicle }}</span
                >
                <span class="four"
                  ><i class="fas fa-map-marker-alt mr-1 icons_gray"></i
                  >{{ ticket.station }}</span
                >
                <span
                  ><i class="fas fa-comment-dots mr-1 icons_gray"></i>
                  {{ `${ticket.content.slice(0, 25)}...` }}</span
                >
                <span class="float-right px-2"
                  ><i class="fas fa-ellipsis-h"></i
                ></span>
              </li>
            </nuxt-link>
          </ul>
          <!-- Search Pagination -->
          <div v-if="isSearch">
            <nav
              v-if="allTicketsPagination.total_tickets > 10"
              aria-label="Page navigation example"
            >
              <ul class="pagination justify-content-center">
                <li
                  class="page-item"
                  :class="{ disabled: !allTicketsPagination.has_pre }"
                >
                  <a
                    @click.prevent="
                      getSearchData(allTicketsPagination.current_page - 1)
                    "
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li
                  v-for="(page, idx) in allTicketsPagination.total_pages"
                  :key="idx"
                  class="page-item"
                  :class="{
                    active: allTicketsPagination.current_page === page
                  }"
                >
                  <a
                    @click.prevent="getSearchData(page)"
                    class="page-link"
                    href="#"
                    >{{ page }}</a
                  >
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: !allTicketsPagination.has_next }"
                >
                  <a
                    @click.prevent="
                      getSearchData(allTicketsPagination.current_page + 1)
                    "
                    class="page-link"
                    href="#"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <!-- Default Pagination -->
          <div v-else>
            <nav
              v-if="allTicketsPagination.total_tickets > 10"
              aria-label="Page navigation example"
            >
              <ul class="pagination justify-content-center">
                <li
                  class="page-item"
                  :class="{ disabled: !allTicketsPagination.has_pre }"
                >
                  <a
                    @click.prevent="
                      getAllTickets(allTicketsPagination.current_page - 1)
                    "
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li
                  v-for="(page, idx) in allTicketsPagination.total_pages"
                  :key="idx"
                  class="page-item"
                  :class="{
                    active: allTicketsPagination.current_page === page
                  }"
                >
                  <a
                    @click.prevent="getAllTickets(page)"
                    class="page-link"
                    href="#"
                    >{{ page }}</a
                  >
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: !allTicketsPagination.has_next }"
                >
                  <a
                    @click.prevent="
                      getAllTickets(allTicketsPagination.current_page + 1)
                    "
                    class="page-link"
                    href="#"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <!---->
        </div>
      </div>
      <!--  -->
    </div>
  </section>
</template>

<script>
import Api from "~/static/api.js";
import Swal from "sweetalert2";

export default {
  layout: "user",
  beforeRouteLeave(to, from, next) {
    this.$cookies.set("isSearch", false);
    this.$cookies.set("defaultPage", 1);
    this.$cookies.set("searchPage", 1);
    // 放行
    next();
  },
  data() {
    return {
      Api,
      allTickets: [],
      allTicketsPagination: {},
      // true => show search pagination, false => show default pagination
      isSearch: false,
      defaultPage: 1,
      searchPage: 1,
      // input
      selectedValue: "ticketId",
      inputValue: "",
      searchTicketId: "",
      searchVehicle: "",
      searchStation: "",
      // filter datetime
      searchRangeTime: "",
      start_dt: "",
      end_dt: "",
      // all LicensePlates
      allLicensePlates: [],
      // all stations
      allStations: []
    };
  },
  mounted() {
    // get all vehicles
    this.getAllVehicles();
    // get all stations
    this.getAllStations();
    // get search tickets or all tickets
    this.isSearch = this.$cookies.get("isSearch");
    this.defaultPage = this.$cookies.get("defaultPage");
    this.searchPage = this.$cookies.get("searchPage");
    if (this.isSearch) {
      // get search tickets
      this.getSearchData(this.searchPage);
    } else {
      // get all tickets
      this.getAllTickets(this.defaultPage);
    }
  },
  methods: {
    // disableDate for future
    disableDate(date) {
      return date >= new Date();
    },
    // get cookies to default
    getCookies() {
      this.searchTicketId = this.$cookies.get("SEARCH_TICKET_ID")
        ? this.$cookies.get("SEARCH_TICKET_ID")
        : "";
      this.searchVehicle = this.$cookies.get("SEARCH_VEHICLE")
        ? this.$cookies.get("SEARCH_VEHICLE")
        : "";
      this.searchStation = this.$cookies.get("SEARCH_STATION")
        ? this.$cookies.get("SEARCH_STATION")
        : "";
      this.start_dt = this.$cookies.get("SEARCH_START_DT")
        ? this.$cookies.get("SEARCH_START_DT")
        : "";
      this.end_dt = this.$cookies.get("SEARCH_END_DT")
        ? this.$cookies.get("SEARCH_END_DT")
        : "";
    },
    // remove cookies to default
    removeCookies() {
      this.$cookies.remove("SEARCH_TICKET_ID");
      this.$cookies.remove("SEARCH_VEHICLE");
      this.$cookies.remove("SEARCH_STATION");
      this.$cookies.remove("SEARCH_START_DT");
      this.$cookies.remove("SEARCH_END_DT");
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
    // get allTickets default
    async getAllTickets(page = 1) {
      // remove cookies to default
      this.removeCookies();
      // 清空搜尋條件值
      this.removeSearchValue();
      // change to Default Pagination
      this.isSearch = false;
      this.defaultPage = page;
      // store default pagination to cookies
      this.$cookies.set("isSearch", this.isSearch);
      this.$cookies.set("defaultPage", this.defaultPage);
      // ajax
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/tickets/repair?status=0&relation=send&page=${page}`
      });
      if (data.success) {
        this.allTickets = data.results.tickets;
        this.allTicketsPagination = data.results.pagination;
      } else {
        if (this.defaultPage < 1) return;
        this.getAllTickets(this.defaultPage - 1);
      }
    },
    // handle search data
    async handleSearchData(page = 1) {
      // selectedValue、inputValue、searchRangeTime 沒值
      if (this.inputValue === "" && this.searchRangeTime === "") {
        this.sweetAlertError("請填入搜尋條件及搜尋時間");
        return;
      }
      // remove cookies to default
      this.removeCookies();
      // 取得輸入值
      if (this.selectedValue === "ticketId") {
        this.searchTicketId = this.inputValue;
        this.$cookies.set("SEARCH_TICKET_ID", this.searchTicketId);
      }
      if (this.selectedValue === "licensePlate") {
        this.searchVehicle = this.inputValue;
        this.$cookies.set("SEARCH_VEHICLE", this.searchVehicle);
      }
      if (this.selectedValue === "stations") {
        this.searchStation = this.inputValue;
        this.$cookies.set("SEARCH_STATION", this.searchStation);
      }
      // 取得 start_dt、end_dt
      if (this.searchRangeTime !== "") {
        this.filterDT();
        this.$cookies.set("SEARCH_START_DT", this.start_dt);
        this.$cookies.set("SEARCH_END_DT", this.end_dt);
      }
      // change to Search Pagination
      this.isSearch = true;
      this.searchPage = page;
      // store search pagination to cookies
      this.$cookies.set("isSearch", this.isSearch);
      this.$cookies.set("searchPage", this.searchPage);
      // ajax
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/tickets/repair?status=0&relation=send&page=${page}&ticket_id=${this.searchTicketId}&vehicle=${this.searchVehicle}&station=${this.searchStation}&start_dt=${this.start_dt}&end_dt=${this.end_dt}`
      });
      if (data.success) {
        if (data.results.tickets.length == 0) {
          this.sweetAlertError("目前沒有符合的資料！");
        } else {
          this.allTickets = data.results.tickets;
          this.allTicketsPagination = data.results.pagination;
        }
      } else {
        this.sweetAlertError("系統有錯誤，請再試一次！");
      }
    },
    // get search data
    async getSearchData(page = 1) {
      // get searchTicketId、searchVehicle、searchStation by cookies
      this.getCookies();
      // change to Search Pagination
      this.isSearch = true;
      this.searchPage = page;
      // store search pagination to cookies
      this.$cookies.set("isSearch", this.isSearch);
      this.$cookies.set("searchPage", this.searchPage);
      // ajax
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/tickets/repair?status=0&relation=send&page=${page}&ticket_id=${this.searchTicketId}&vehicle=${this.searchVehicle}&station=${this.searchStation}&start_dt=${this.start_dt}&end_dt=${this.end_dt}`
      });
      if (data.success) {
        if (data.results.tickets.length == 0) {
          this.sweetAlertError("目前沒有符合的資料！");
        } else {
          this.allTickets = data.results.tickets;
          this.allTicketsPagination = data.results.pagination;
        }
      } else {
        if (this.searchPage < 1) return;
        this.getSearchData(this.searchPage - 1);
      }
    },
    // Wed Apr 07 2021 00:00:00 GMT+0800 (台北標準時間) => 20210311_155300
    filterDT() {
      //start
      if (this.searchRangeTime[0] === null) return;
      let startdate = this.searchRangeTime[0].toString().substring(8, 10);
      let startmonthString = this.searchRangeTime[0].toString().substring(4, 7);
      let startyear = this.searchRangeTime[0].toString().substring(11, 15);
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
      let enddate = this.searchRangeTime[1].toString().substring(8, 10);
      let endmonthString = this.searchRangeTime[1].toString().substring(4, 7);
      let endyear = this.searchRangeTime[1].toString().substring(11, 15);
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
      this.start_dt = `${startyear}${startmonth}${startdate}`;
      this.end_dt = `${endyear}${endmonth}${enddate}`;
    },
    // 清空搜尋條件值
    removeSearchValue() {
      this.selectedValue = "ticketId";
      this.searchTicketId = "";
      this.searchVehicle = "";
      this.searchStation = "";
      this.searchRangeTime = "";
      this.start_dt = "";
      this.end_dt = "";
    },
    // 將狀態變已讀
    async changeStatus(id) {
      const { data } = await this.$axios({
        method: "POST",
        baseURL: this.Api,
        url: `/tickets/${id}/read`
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
    }
  },
  computed: {
    // 重新計算 input datalist
    searchKey() {
      if (this.selectedValue === "ticketId") {
        this.inputValue = "";
        return "通報編號";
      }
      if (this.selectedValue === "licensePlate") {
        this.inputValue = "";
        return "車號";
      }
      if (this.selectedValue === "stations") {
        this.inputValue = "";
        return "站所";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/allRecode.scss";
</style>
