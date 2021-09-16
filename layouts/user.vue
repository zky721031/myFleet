<template>
  <div>
    <div v-if="$store.state.isLoading" class="loading-box" ref="mask">
      <div class="box">
        <PropagateLoader :color="LoaderColor" class="loader" />
        <h5 class="loading-text">資料上傳中, 請稍候…</h5>
      </div>
    </div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
import { PropagateLoader } from "@saeris/vue-spinners";

export default {
  name: "user",
  components: {
    Navbar,
    PropagateLoader
  },
  data() {
    return {
      // loading: false,
      LoaderColor: "#fff",
      valueByPass: ""
    };
  },
  mounted() {
    // let bodyHight = document.body.scrollHeight;
    // this.$refs.mask.style.height = `${bodyHight + 100}px`;
  },
  methods: {
    childByValue(childValue) {
      // childValue就是子组件传过来的值
      this.valueByPass = childValue;
      console.log(this.valueByPass);
      console.log("pass");
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
