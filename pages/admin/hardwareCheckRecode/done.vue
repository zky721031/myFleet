<template>
  <section>
    <div class="container py-4">
      <h4>硬體檢查通報記錄</h4>
      <hr />
      <!--  -->
      <div class="mb-5">
        <!-- tab -->
        <div class="mb-4">
          <ul class="d-flex align-items-center pl-0 mb-0 ul_style_none">
            <li class="mr-3">
              <nuxt-link
                to="/admin/hardwareCheckRecode"
                class="btn btn-outline-info"
                >處理中</nuxt-link
              >
            </li>
            <li class="mr-auto">
              <nuxt-link
                to="/admin/hardwareCheckRecode/done"
                class="btn btn-info"
                >已完成</nuxt-link
              >
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
                name: 'admin-hardwareCheckRecode-id___zh',
                params: {
                  id: ticket.ticket_id
                },
                query: {
                  id: ticket.ticket_id,
                  time: ticket.created_at,
                  status: ticket.status,
                  content: ticket.content,
                  attachment: [...ticket.attachment]
                }
              }"
              class="nuxt_link"
            >
              <li class="p-3 mb-3 rounded bg_gray li_span list_effect">
                <span class="one"
                  ><i class="fas fa-clipboard-check mr-1 icons"></i>
                  {{ ticket.ticket_id }} - {{ ticket.created_at }}</span
                >
                <span class="two">{{
                  ticket.status === 0 ? "處理中" : "已完成"
                }}</span>

                <span
                  ><i class="fas fa-comment-dots mr-1 icons_gray"></i
                  >{{ `${ticket.content.slice(0, 35)}...` }}</span
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
      <!--  -->
    </div>
  </section>
</template>

<script>
import Api from "~/static/api.js";

export default {
  layout: "admin",
  data() {
    return {
      Api,
      allDoneTickets: [],
      allDoneTicketsPagination: {}
    };
  },
  mounted() {
    // 取得 allDoneTickets
    this.getAllDoneTickets();
  },
  methods: {
    // 獲取 allDoneTickets
    async getAllDoneTickets(page = 1) {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/tickets/hardware-check?status=1&relation=send&page=${page}`
      });
      if (data.success) {
        this.allDoneTickets = data.results.tickets;
        this.allDoneTicketsPagination = data.results.pagination;
      } else {
        this.sweetAlertError("系統有錯誤，請再試一次！");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/allRecode.scss";
</style>
