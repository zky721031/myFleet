<template>
  <section>
    <div class="container py-4">
      <h4>車籍資料異動申請</h4>
      <hr />
      <!--  -->
      <div class="mb-5">
        <!-- tab -->
        <div class="mb-4">
          <ul class="d-flex align-items-center pl-0 mb-0 ul_style_none">
            <li
              @click="
                isActived = 1;
                status = true;
              "
              class="text-center btn_tab mr-4"
              :class="{ isActived: isActived === 1 }"
            >
              處理中
            </li>
            <li
              @click="
                isActived = 2;
                status = false;
              "
              class="text-center btn_tab mr-auto"
              :class="{ isActived: isActived === 2 }"
            >
              已完成
            </li>
            <!-- <li>
              <div class="form-group mb-0 position-relative">
                <input type="text" class="form-control" placeholder="search" />
                <i
                  class="fas fa-search position-absolute p-2 icons cursor_pointer search"
                ></i>
              </div>
            </li> -->
          </ul>
        </div>
        <!-- 處理中 -->
        <div v-if="status">
          <ul class="ul_style_none mb-5 pl-0">
            <nuxt-link
              v-for="ticket in allTickets"
              :key="ticket.ticket_id"
              :to="{
                name: 'RD-rdDataChange-id',
                params: {
                  id: ticket.ticket_id
                },
                query: {
                  id: ticket.ticket_id,
                  time: ticket.created_at,
                  status: ticket.status,
                  vehicle: ticket.vehicle,
                  station: ticket.station,
                  content: ticket.content
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
          <!-- Pagination -->
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
                :class="{ active: allTicketsPagination.current_page === page }"
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
        <!-- 已完成 -->
        <div v-else>
          <ul class="ul_style_none mb-5 pl-0">
            <nuxt-link
              v-for="done in allDoneTickets"
              :key="done.ticket_id"
              :to="{
                name: 'RD-rdDataChange-id',
                params: {
                  id: done.ticket_id
                },
                query: {
                  id: done.ticket_id,
                  time: done.created_at,
                  status: done.status,
                  vehicle: done.vehicle,
                  station: done.station,
                  content: done.content
                }
              }"
              class="nuxt_link"
            >
              <li class="p-3 mb-3 rounded bg_gray li_span list_effect">
                <span class="one"
                  ><i class="fas fa-clipboard-check mr-1 icons"></i
                  >{{ done.ticket_id }} - {{ done.created_at }}</span
                >
                <span class="two">{{
                  done.status === 0 ? "處理中" : "已完成"
                }}</span>
                <span class="three"
                  ><i class="fas fa-truck mr-1 icons_gray"></i
                  >{{ done.vehicle }}</span
                >
                <span class="four"
                  ><i class="fas fa-map-marker-alt mr-1 icons_gray"></i
                  >{{ done.station }}</span
                >
                <span
                  ><i class="fas fa-comment-dots mr-1 icons_gray"></i
                  >{{ `${done.content.slice(0, 25)}...` }}</span
                >
                <span class="float-right px-2"
                  ><i class="fas fa-ellipsis-h"></i
                ></span>
              </li>
            </nuxt-link>
          </ul>
          <!-- Pagination -->
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
                    getAllDoneTickets(allDoneTicketsPagination.current_page - 1)
                  "
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                v-for="(page, i) in allDoneTicketsPagination.total_pages"
                :key="i"
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
                    getAllDoneTickets(allTicketsPagination.current_page + 1)
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
      </div>
      <!---->
    </div>
  </section>
</template>

<script>
export default {
  layout: "rd",
  data() {
    return {
      allTickets: [],
      allTicketsPagination: {},
      allDoneTickets: [],
      allDoneTicketsPagination: {},
      status: true,
      isActived: 1
    };
  },
  mounted() {
    // 取得 allTickets
    this.getAllTickets();
    // 取得 allDoneTickets
    this.getAllDoneTickets();
  },
  methods: {
    // 獲取 allTickets
    async getAllTickets(page = 1) {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: "http://18.178.54.255:5001",
        url: `/tickets/vehicle-change?status=0&relation=received&page=${page}`
      });
      if (data.success) {
        this.allTickets = data.results.tickets;
        this.allTicketsPagination = data.results.pagination;
      }
    },
    // 取得 allDoneTickets
    async getAllDoneTickets(page = 1) {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: "http://18.178.54.255:5001",
        url: `/tickets/vehicle-change?status=1&relation=received&page=${page}`
      });
      if (data.success) {
        this.allDoneTickets = data.results.tickets;
        this.allDoneTicketsPagination = data.results.pagination;
      }
    },
    // 將狀態變已讀
    async changeStatus(id) {
      const { data } = await this.$axios({
        method: "POST",
        baseURL: "http://18.178.54.255:5001",
        url: `/tickets/${id}/read`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/allRecode.scss";
</style>
