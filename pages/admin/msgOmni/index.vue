<template>
  <section>
    <div class="container py-4">
      <h4>Omni 通報</h4>
      <hr />
      <!--  -->
      <div class="mb-5">
        <!-- tab -->
        <div class="mb-4">
          <ul class="d-flex align-items-center pl-0 mb-0 ul_style_none ">
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
            <li>
              <div class="form-group mb-0 position-relative">
                <input type="text" class="form-control" placeholder="search" />
                <i
                  class="fas fa-search position-absolute p-2 icons cursor_pointer search"
                ></i>
              </div>
            </li>
          </ul>
        </div>
        <!-- 處理中 -->
        <div v-if="status">
          <ul class="ul_style_none mb-0 pl-0">
            <li class="p-3 bg_gray">
              <span><i class="fas fa-tags icons"></i>REP001 - 2020-02-28</span>
              <span class="px-3">處理中</span>
              <span class="px-3"
                ><i class="fas fa-truck icons_gray"></i>001-JWT</span
              >
              <span class="px-3"
                ><i class="fas fa-map-pin icons_gray"></i>營業所</span
              >
              <span class="px-3"
                ><i class="fas fa-clock icons_gray"></i>2020-02-27 15:15:15 -
                2020-02-28 15:15:15</span
              >
              <span class="px-3"
                ><i class="fas fa-bookmark icons_gray"></i>備註</span
              >
              <span
                @click="show = !show"
                class="float-right px-2 cursor_pointer"
                ><i class="fas fa-ellipsis-h"></i
              ></span>
              <hr v-if="show" class="" />
              <div v-if="show">
                <div>
                  <!-- assign -->
                  <h6 class="mb-3">
                    <i class="fas fa-user-friends icons"></i>指派
                  </h6>
                  <div class="row">
                    <div class="col-4">
                      <div class="form-group">
                        <select class="form-control">
                          <option value selected disabled>指派對象</option>
                          <option>RD</option>
                          <option>工讀生</option>
                          <option>工班</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <textarea
                      class="form-control mb-3"
                      rows="3"
                      placeholder="備註"
                    ></textarea>
                    <button
                      @click.prevent="msgSend"
                      class="btn btn-outline-info"
                    >
                      送出
                    </button>
                  </div>
                  <br />
                  <!-- task -->
                  <div
                    v-for="(i, idx) in items"
                    :key="idx"
                    class="bg-white mb-3"
                  >
                    <div class="d-flex align-items-center mb-0 px-3 py-2">
                      <div
                        class="d-flex justify-content-center align-items-center mr-3 mug_shot"
                      >
                        <img
                          class="img-fluid"
                          src="@/assets/imgs/omni.svg"
                          alt=""
                        />
                      </div>
                      <p class="mb-0">
                        response ~
                        <small class="text_gray">（2020-02-28）</small>
                      </p>
                    </div>
                    <div class="d-flex align-items-center mb-0 px-3 py-2">
                      <div
                        class="d-flex justify-content-center align-items-center mr-3 mug_shot"
                      >
                        <i class="fas fa-user"></i>
                      </div>
                      <p class="mb-0">
                        require <small class="text_gray">（2020-02-28）</small>
                      </p>
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- message -->
                <h6 class="mb-3"><i class="fas fa-comments icons"></i>提問</h6>
                <div>
                  <textarea
                    class="form-control mb-3"
                    rows="3"
                    placeholder="備註"
                  ></textarea>
                  <button @click.prevent="msgSend" class="btn btn-outline-info">
                    送出
                  </button>
                </div>
                <br />
                <div v-for="(i, idx) in items" :key="idx" class="bg-white mb-3">
                  <div class="d-flex align-items-center mb-0 px-3 py-2">
                    <div
                      class="d-flex justify-content-center align-items-center mr-3 mug_shot"
                    >
                      <img
                        class="img-fluid"
                        src="@/assets/imgs/omni.svg"
                        alt=""
                      />
                    </div>
                    <p class="mb-0">
                      response ~
                      <small class="text_gray">（2020-02-28）</small>
                    </p>
                  </div>
                  <div class="d-flex align-items-center mb-0 px-3 py-2">
                    <div
                      class="d-flex justify-content-center align-items-center mr-3 mug_shot"
                    >
                      <i class="fas fa-user"></i>
                    </div>
                    <p class="mb-0">
                      require <small class="text_gray">（2020-02-28）</small>
                    </p>
                  </div>
                </div>
                <!---->
              </div>
            </li>
          </ul>
        </div>
        <!-- 已完成 -->
        <div v-else>
          <ul class="ul_style_none mb-0 pl-0">
            <li class="p-3 bg_gray">
              <span><i class="fas fa-tags icons"></i>REP001 - 2020-02-28</span>
              <span class="px-3">已完成</span>
              <span class="px-3"
                ><i class="fas fa-truck icons_gray"></i>001-JWT</span
              >
              <span class="px-3"
                ><i class="fas fa-map-pin icons_gray"></i>營業所</span
              >
              <span class="px-3"
                ><i class="fas fa-bookmark icons_gray"></i>備註</span
              >
              <span
                @click="show = !show"
                class="float-right px-2 cursor_pointer"
                ><i class="fas fa-ellipsis-h"></i
              ></span>
              <hr v-if="show" class="" />
              <div v-if="show">
                <div>
                  <!-- assign -->
                  <h6 class="mb-3">
                    <i class="fas fa-user-friends icons"></i>指派
                  </h6>
                  <!-- task -->
                  <div
                    v-for="(i, idx) in items"
                    :key="idx"
                    class="bg-white mb-3"
                  >
                    <div class="d-flex align-items-center mb-0 px-3 py-2">
                      <div
                        class="d-flex justify-content-center align-items-center mr-3 mug_shot"
                      >
                        <img
                          class="img-fluid"
                          src="@/assets/imgs/omni.svg"
                          alt=""
                        />
                      </div>
                      <p class="mb-0">
                        response ~
                        <small class="text_gray">（2020-02-28）</small>
                      </p>
                    </div>
                    <div class="d-flex align-items-center mb-0 px-3 py-2">
                      <div
                        class="d-flex justify-content-center align-items-center mr-3 mug_shot"
                      >
                        <i class="fas fa-user"></i>
                      </div>
                      <p class="mb-0">
                        require <small class="text_gray">（2020-02-28）</small>
                      </p>
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- message -->
                <h6 class="mb-3"><i class="fas fa-comments icons"></i>提問</h6>
                <div v-for="(i, idx) in items" :key="idx" class="bg-white mb-3">
                  <div class="d-flex align-items-center mb-0 px-3 py-2">
                    <div
                      class="d-flex justify-content-center align-items-center mr-3 mug_shot"
                    >
                      <img
                        class="img-fluid"
                        src="@/assets/imgs/omni.svg"
                        alt=""
                      />
                    </div>
                    <p class="mb-0">
                      response ~
                      <small class="text_gray">（2020-02-28）</small>
                    </p>
                  </div>
                  <div class="d-flex align-items-center mb-0 px-3 py-2">
                    <div
                      class="d-flex justify-content-center align-items-center mr-3 mug_shot"
                    >
                      <i class="fas fa-user"></i>
                    </div>
                    <p class="mb-0">
                      require <small class="text_gray">（2020-02-28）</small>
                    </p>
                  </div>
                </div>
                <!---->
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- Pagination -->
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      status: true,
      isActived: 1,
      show: true,
      items: [
        { msg: "", msgShow: true },
        { msg: "", msgShow: true },
        { msg: "", msgShow: true }
      ]
    };
  },
  methods: {
    msgSend() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/allRecode.scss";
</style>
