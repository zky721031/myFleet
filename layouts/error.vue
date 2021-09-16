<template>
  <div>
    <h1 v-if="error.statusCode">{{ error.message }}</h1>
    <h1 v-else>應用發生異常</h1>
    <button @click="$router.replace('/index')">回首頁</button>
    <nuxt />
  </div>
</template>

<script>
export default {
  // 接收錯誤訊息 error:{statusCode,message}
  props: ["error"]
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  text-align: center;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
