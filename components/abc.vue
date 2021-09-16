<template>
  <div>
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
  </div>
</template>

<script>
import Api from "~/static/api.js";

export default {
  name: "search-tickets",
  data() {
    return {
      Api,
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
  },
  methods: {
    // disableDate for future
    disableDate(date) {
      return date >= new Date();
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
    handleSearchData() {
      console.log("handleSearchData");
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
