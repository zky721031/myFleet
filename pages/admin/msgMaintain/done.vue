<template>
  <section>
    <div class="container py-4">
      <h4>維修申請</h4>
      <hr />
      <!--  -->
      <div class="mb-5">
        <!-- tab -->
        <div class="mb-4">
          <ul class="d-flex align-items-center pl-0 mb-0 ul_style_none">
            <li class="mr-3">
              <nuxt-link to="/admin/msgMaintain" class="btn btn-outline-info"
                >處理中</nuxt-link
              >
            </li>
            <li class="mr-auto">
              <nuxt-link to="/admin/msgMaintain/done" class="btn btn-info"
                >已完成</nuxt-link
              >
            </li>
            <li class="mr-2">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span style="font-size:0.9rem">{{ searchKeyShow }}</span>
                  </button>
                  <div class="dropdown-menu">
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="
                        searchKey = 'ticket_id';
                        searchKeyShow = '通報編號';
                      "
                      >通報編號</a
                    >
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="
                        searchKey = 'vehicle';
                        searchKeyShow = '車號';
                      "
                      >車號</a
                    >
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="
                        searchKey = 'station';
                        searchKeyShow = '站所';
                      "
                      >站所</a
                    >
                  </div>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with dropdown button"
                  v-model="searchKeyValue"
                  @change="searchChange()"
                />
              </div>
            </li>
            <li class="mr-2">
              <date-picker
                v-model="searchRangeTime"
                lang="en"
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
                @click.prevent="getSearchData()"
              >
                search
              </button>
            </li>
          </ul>
        </div>
        <!-- 已完成 -->
        <div>
          <ul class="ul_style_none mb-5 pl-0">
            <nuxt-link
              v-for="ticket in allDoneTickets"
              :key="ticket.ticket_id"
              :to="{
                name: 'admin-msgMaintain-id___zh',
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
                  attachment: [...ticket.attachment]
                }
              }"
              class="nuxt_link "
            >
              <li class="p-3 mb-3 rounded bg_gray li_span list_effect">
                <span class="one"
                  ><i class="fas fa-clipboard-check mr-1 icons"></i
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
                  ><i class="fas fa-comment-dots mr-1 icons_gray"></i
                  >{{ `${ticket.content.slice(0, 25)}...` }}</span
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
              v-if="allDoneTicketsPagination.total_tickets > 10"
              aria-label="Page navigation example"
            >
              <ul class="pagination justify-content-center">
                <li
                  class="page-item"
                  :class="{ disabled: !allDoneTicketsPagination.has_pre }"
                >
                  <a
                    @click.prevent="
                      getSearchData(allDoneTicketsPagination.current_page - 1)
                    "
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li
                  v-for="(page, idx) in allDoneTicketsPagination.total_pages"
                  :key="idx"
                  class="page-item"
                  :class="{
                    active: allDoneTicketsPagination.current_page === page
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
                  :class="{ disabled: !allDoneTicketsPagination.has_next }"
                >
                  <a
                    @click.prevent="
                      getSearchData(allDoneTicketsPagination.current_page + 1)
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
              v-if="allDoneTicketsPagination.total_tickets > 10"
              aria-label="Page navigation example"
            >
              <ul class="pagination justify-content-center">
                <li
                  class="page-item"
                  :class="{ disabled: !allDoneTicketsPagination.has_pre }"
                >
                  <a
                    @click.prevent="
                      getAllDoneTickets(
                        allDoneTicketsPagination.current_page - 1
                      )
                    "
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li
                  v-for="(page, idx) in allDoneTicketsPagination.total_pages"
                  :key="idx"
                  class="page-item"
                  :class="{
                    active: allDoneTicketsPagination.current_page === page
                  }"
                >
                  <a
                    @click.prevent="getAllDoneTickets(page)"
                    class="page-link"
                    href="#"
                    >{{ page }}</a
                  >
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: !allDoneTicketsPagination.has_next }"
                >
                  <a
                    @click.prevent="
                      getAllDoneTickets(
                        allDoneTicketsPagination.current_page + 1
                      )
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
      <!-- -->
    </div>
  </section>
</template>

<script>
import Api from "~/static/api.js";
import Swal from "sweetalert2";

export default {
  layout: "admin",
  data() {
    return {
      Api,
      allDoneTickets: [],
      allDoneTicketsPagination: {},
      isSearch: false,
      searchKey: "",
      searchKeyShow: "搜尋項目",
      searchKeyValue: "",
      searchTicketId: "",
      searchVehicle: "",
      searchStation: "",
      searchRangeTime: "",
      searchStartTime: "",
      searchEndTime: ""
    };
  },
  mounted() {
    // 取得 allDoneTickets
    this.getAllDoneTickets();
  },
  methods: {
    // Wed Apr 07 2021 00:00:00 GMT+0800 (台北標準時間) => 20210311_155300
    filterDT() {
      //start
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
      this.searchStartTime = `${startyear}${startmonth}${startdate}`;
      this.searchEndTime = `${endyear}${endmonth}${enddate}`;
    },
    // searchChange
    searchChange() {
      if (this.searchKey == "") {
        this.sweetAlertError("請選擇搜尋項目");
        this.searchKeyValue = "";
        return;
      }
      if (this.searchKeyValue == "") {
        this.searchTicketId = "";
        this.searchVehicle = "";
        this.searchStation = "";
      }
      if (this.searchKey == "ticket_id") {
        this.searchTicketId = this.searchKeyValue;
      }
      if (this.searchKey == "vehicle") {
        this.searchVehicle = this.searchKeyValue.toUpperCase();
      }
      if (this.searchKey == "station") {
        this.searchStation = this.searchKeyValue;
      }
    },
    // get search data
    async getSearchData(page = 1) {
      if (this.searchKeyValue == "" && this.searchRangeTime == "") {
        this.sweetAlertError("請填入搜尋條件或搜尋時間");
        return;
      }
      if (this.searchRangeTime) {
        this.filterDT();
      }
      // 切換為 Search Pagination
      this.isSearch = true;
      // ajax
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/tickets/repair?status=1&relation=received&page=${page}&ticket_id=${this.searchTicketId}&vehicle=${this.searchVehicle}&station=${this.searchStation}&start_dt=${this.searchStartTime}&end_dt=${this.searchEndTime}`
      });
      if (data.success) {
        if (data.results.tickets.length == 0) {
          this.sweetAlertError("目前沒有符合的資料！");
        } else {
          this.allDoneTickets = data.results.tickets;
          this.allDoneTicketsPagination = data.results.pagination;
        }
      } else {
        this.sweetAlertError("系統有錯誤，請再試一次！");
      }
    },
    // 清空搜尋條件值
    removeSearchValue() {
      this.searchKey = "";
      this.searchKeyShow = "搜尋項目";
      this.searchKeyValue = "";
      this.searchTicketId = "";
      this.searchVehicle = "";
      this.searchStation = "";
      this.searchRangeTime = "";
      this.searchStartTime = "";
      this.searchEndTime = "";
    },
    // 取得 allDoneTickets
    async getAllDoneTickets(page = 1) {
      // 清空搜尋條件值
      this.removeSearchValue();
      // 切換為 Default Pagination
      this.isSearch = false;
      // ajax
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/tickets/repair?status=1&relation=received&page=${page}`
      });
      if (data.success) {
        this.allDoneTickets = data.results.tickets;
        this.allDoneTicketsPagination = data.results.pagination;
      } else {
        console.log("系統有錯誤，請再試一次！");
      }
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
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/allRecode.scss";
</style>
