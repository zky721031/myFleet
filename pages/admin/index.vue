<template>
  <section class="login">
    <div class="row">
      <div class="col-8 p-0">
        <div class="left_side">
          <div class="description text-center text-white">
            <img src="" alt="" />
            <h1>
              <b>Welcome!11</b>
            </h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
      <div class="col-4 p-0">
        <div class="right_side">
          <div class="login_area text-center">
            <img
              class="logo img-fluid mb-5"
              src="@/assets/imgs/logo.png"
              alt=""
            />
            <h3 class="text-center mb-5"><b>Admin</b></h3>
            <form class="mb-5">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Account" />
                <!-- <small id="emailHelp" class="form-text text-muted"
                  >We'll never share your email with anyone else.</small
                > -->
              </div>
              <div class="form-group mb-5">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                />
                <small id="passwordHelp" class="form-text text-muted"
                  >We'll never share your account or password with anyone
                  else.</small
                >
              </div>
              <button type="submit" class="rounded omni_btn">登入</button>
            </form>
          </div>
          <p class="text-center">
            <small>Copyright © 2020 omnieyes. All rights reserved.</small>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "login"
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
@import "@/assets/scss/login.scss";
</style>
