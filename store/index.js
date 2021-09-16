export const state = () => ({
  authToken: "",
  client_id: "",
  client_name: "",
  user_id: "",
  isLoading: false,
  locales: ["en", "zh"],
  locale: "zh"
});

export const getters = {};

export const mutations = {
  // store user authToken to vuex
  STORE_TOKEN(state, payload) {
    state.authToken = payload;
  },

  // store client_name to vuex
  STORE_CLIENT_NAME(state, payload) {
    state.client_name = payload;
  },

  // store client_id to vuex
  STORE_CLIENT_ID(state, payload) {
    state.client_id = payload;
  },

  // store user_id to vuex
  STORE_USER_ID(state, payload) {
    state.user_id = payload;
  },

  // 清空 store.state.authToken
  LOG_OUT(state, payload) {
    state.authToken = " ";
  },

  // 頁面重整時，更新 authToken
  UPDATE_AUTHTOKEN(state, payload) {
    state.authToken = payload;
  },

  // 頁面重整時，更新 client_id
  UPDATE_CLIENT_ID(state, payload) {
    state.client_id = payload;
  },

  // 頁面重整時，更新 client_name
  UPDATE_CLIENT_NAME(state, payload) {
    state.client_name = payload;
  },

  // 頁面重整時，更新 user_id
  UPDATE_USER_ID(state, payload) {
    state.user_id = payload;
  },

  // set isLoading
  CHANGE_ISLOADING(state, payload) {
    state.isLoading = payload;
  },

  // i18n
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale;
    }
  }

};

export const actions = {
  // 頁面重整時，執行 nuxtServerInit() hook
  // context 解構 => app 解構 => $cookies
  nuxtServerInit(store, {
    app: {
      $cookies
    }
  }) {
    // 初始化 token 並存至 store 中
    // console.log('nuxtServerInit')
    // let authToken = $cookies.get('authToken') ? $cookies.get('authToken') : {authToken:''}
    let authToken = $cookies.get("authToken");
    store.commit("UPDATE_AUTHTOKEN", authToken);

    let client_id = $cookies.get("client_id");
    store.commit("UPDATE_CLIENT_ID", client_id);

    let client_name = $cookies.get("client_name");
    store.commit("UPDATE_CLIENT_NAME", client_name);

    let user_id = $cookies.get("user_id");
    store.commit("UPDATE_USER_ID", user_id);
  },

  // store user authToken to vuex
  storeToken({
    commit,
    state
  }, payload) {
    commit("STORE_TOKEN", payload);
  },
  // store client_name to vuex
  storeClientName({
    commit,
    state
  }, payload) {
    commit("STORE_CLIENT_NAME", payload);
  },
  // store client_id to vuex
  storeClientID({
    commit,
    state
  }, payload) {
    commit("STORE_CLIENT_ID", payload);
  },
  // store user_id to vuex
  storeUserID({
    commit,
    state
  }, payload) {
    commit("STORE_USER_ID", payload);
  },
  // set isLoading
  changeIsLoading({
    commit,
    state
  }, payload) {
    commit("CHANGE_ISLOADING", payload);
  },

  // 發出清空 store.state.authToken commit
  logout({
    commit,
    state
  }, payload) {
    commit("LOG_OUT", {});
  }
};
