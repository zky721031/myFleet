<template>
  <section>
    <div class="container py-4">
      <h4>軟體更新通報</h4>
      <hr />
      <!--  -->
      <div class="mb-5">
        <!-- tab -->
        <div class="mb-4">
          <ul class="d-flex align-items-center pl-0 mb-0 ul_style_none">
            <li class="mr-3">
              <nuxt-link to="/software" class="btn btn-info">處理中</nuxt-link>
            </li>
            <li class="mr-auto">
              <nuxt-link to="/software/done" class="btn btn-outline-info"
                >已完成</nuxt-link
              >
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
                name: 'software-id___zh',
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
                <span
                  ><i class="fas fa-comment-dots mr-1 icons_gray"></i>
                  {{ `${ticket.content.slice(0, 40)}...` }}</span
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
      </div>
    </div>
  </section>
</template>

<script>
import Api from "~/static/api.js";

export default {
  layout: "user",
  data() {
    return {
      Api,
      allTickets: [],
      allTicketsPagination: {}
    };
  },
  mounted() {
    // 取得 allTickets
    this.getAllTickets();
  },
  methods: {
    // 獲取 allTickets
    async getAllTickets(page = 1) {
      const { data } = await this.$axios({
        method: "GET",
        baseURL: this.Api,
        url: `/tickets/software-update?status=0&relation=received&page=${page}`
      });
      if (data.success) {
        this.allTickets = data.results.tickets;
        this.allTicketsPagination = data.results.pagination;
      } else {
        console.log("系統有錯誤，請再試一次！");
      }
    },
    // 將狀態變已讀
    async changeStatus(id) {
      const { data } = await this.$axios({
        method: "POST",
        baseURL: this.Api,
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
