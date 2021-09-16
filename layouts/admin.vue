<template>
  <div>
    <div v-if="$store.state.isLoading" class="loading-box" ref="mask">
      <div class="box">
        <PropagateLoader :color="LoaderColor" class="loader" />
        <h5 class="loading-text">資料上傳中, 請稍候…</h5>
      </div>
    </div>
    <NavbarAdmin />
    <nuxt />
  </div>
</template>

<script>
import NavbarAdmin from "~/components/NavbarAdmin.vue";
import { PropagateLoader } from "@saeris/vue-spinners";

export default {
  name: "admin",
  components: {
    NavbarAdmin,
    PropagateLoader
  },
  data() {
    return {
      // loading: false,
      LoaderColor: "#fff"
    };
  },
  methods: {
    LOADING(i) {
      this.loading = true;
      console.log(i);
    }
  }
};
</script>

<style scoped>
.loading-box {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 999999;
  width: 100%;
  height: 100%;
  background-color: rgba(35, 24, 21, 0.4);
  backdrop-filter: blur(0.2rem);
}
.loader {
  position: absolute;
  top: 380px;
  left: 50%;
}
.loading-text {
  position: absolute;
  top: 340px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
}
</style>
