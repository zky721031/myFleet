<template>
  <section>
    <div class="container py-4">
      <div class="d-flex justify-content-between">
        <h4 class="mb-0">違規事件報表</h4>
        <p class="mb-0 text_green cursor_pointer">
          <i class="fas fa-cloud-download-alt icons"></i>Download
        </p>
      </div>
      <hr />
      <!-- filter -->
      <div class="mb-3">
        <div class="row">
          <div class="col-3">
            <div>
              <input type="text" class="form-control" placeholder="站所" />
            </div>
          </div>
          <div class="col-3">
            <div>
              <input type="text" class="form-control" placeholder="車牌" />
            </div>
          </div>
          <div class="col-3">
            <div>
              <input
                type="text"
                id="picker"
                class="form-control"
                placeholder="請選擇時間"
              />
            </div>
          </div>
          <div class="col-3">
            <div>
              <button class="btn btn-outline-info ">搜尋</button>
            </div>
          </div>
        </div>
      </div>
      <!-- table -->
      <div class="table-responsive border mb-5">
        <table class="table table-striped table-bordered">
          <thead class="thead-dark">
            <tr class="text-center">
              <th scope="col">車輛</th>
              <th scope="col">違反禁止進入</th>
              <th scope="col">公車格違停</th>
              <th scope="col">闖紅燈</th>
              <th scope="col">怠速</th>
              <th scope="col">違規右轉</th>
              <th scope="col">未停車再開</th>
              <th scope="col">人行道停車</th>
              <th scope="col">紅線違停</th>
              <th scope="col">逆向停車</th>
              <th scope="col">黃網線停車</th>
              <th scope="col">斑馬線停車</th>
              <th scope="col">總違規次數</th>
              <th scope="col">評分</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="(item, idx) in 10" :key="idx">
              <th scope="row">00{{ idx + 1 }}-JWT</th>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- pagination -->
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  layout: "user",
  mounted() {
    // 初始化 daterangepicker
    $("#picker").daterangepicker({
      timePicker: true,
      startDate: moment().startOf("hour"),
      endDate: moment()
        .startOf("hour")
        .add(32, "hour"),
      local: {
        format: "M/DD hh:mm A"
      }
    });
    // 清空 daterangepicker 值
    $("#picker").val("");
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/table.scss";
</style>
