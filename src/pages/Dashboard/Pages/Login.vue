<template>
  <div class="md-layout text-center">
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <login-card>
        <h2 slot="title" class="title">
          {{ this.$S_i18n.t("BF_LOGIN_FORM_TITLE") }}
        </h2>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>email</md-icon>
          <label>{{ this.$S_i18n.t("BF_LOGIN_FORM_EMAIL") }}</label>
          <md-input v-model="email" type="email"></md-input>
        </md-field>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>
            lock_outline
          </md-icon>
          <label>
            {{ this.$S_i18n.t("BF_LOGIN_FORM_PASSWORD") }}
          </label>
          <md-input
            v-model="password"
            type="password"
            @keyup.enter="login()"
          ></md-input>
        </md-field>

        <md-button
          slot="footer"
          class="md-round md-success md-lg align-center"
          @click="login()"
        >
          {{ this.$S_i18n.t("BF_LOGIN_FORM_SUBMIT") }}
        </md-button>

        <div class="md-layout" slot="subfooter">
          <div class="md-layout-item md-size-100" v-if="error_seen_login">
            <p class="description text-center text-danger">
              <b>
                {{ this.$S_i18n.t("BF_LOGIN_ERROR") }}
              </b>
            </p>
          </div>
          <div class="md-layout-item md-size-100">
            <a
              href="#/reset"
              class="text-success"
              style="text-decoration:underline;color:#e7ba3d;"
            >
              {{ this.$S_i18n.t("BF_LOGIN_RESET_LINK") }}
            </a>
          </div>
          <div class="md-layout-item md-size-100">
            <p class="description text-center underline">
              {{ this.$S_i18n.t("BF_LOGIN_REGISTER_LABEL") }}
              <b>
                <a
                  href="#/register"
                  class="text-success"
                  style="margin-top:-15px; text-decoration:underline;"
                >
                  {{ this.$S_i18n.t("BF_LOGIN_REGISTER_LINK") }}
                </a>
              </b>
            </p>
          </div>
        </div>
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components";

export default {
  components: {
    LoginCard
    // BfCookieCard
  },
  data() {
    return {
      error_seen_login: false,
      email: null,
      password: null,
      login_img: process.env.VUE_APP_BF_LANDING_IMG_INFO
    };
  },
  beforeMount() {
    if (localStorage.getItem("BF_name") != null) {
      this.$BF_Services.logout();
    }
  },
  
  methods: {
    login() {
      this.error_seen_login = false; // Set error to false during communication

      this.$BF_Services.data = {
        user: this.email,
        pass: this.password
      };

      this.$BF_Services
        .login()
        .then(() => this.$router.push("/dashboard"))
        .catch(() => {
          this.error_seen_login = true;
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>

<style lang="scss">
h2 {
  margin-bottom: -20px;
}
</style>
