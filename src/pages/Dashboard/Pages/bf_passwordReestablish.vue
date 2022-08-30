<template>
  <div class="md-layout text-center">
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <login-card>
        <h3 slot="title" class="title">
          <b>
            {{ this.$S_i18n.t("BF_PASS_RESET_TITLE") }}
          </b>
        </h3>

        <md-field class="md-form-group" slot="inputs">
          <md-icon>
            lock_outline
          </md-icon>
          <label>
            {{ this.$S_i18n.t("BF_PASS_RESET_INPUT") }}
          </label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>

        <md-button
          slot="footer"
          class="md-round md-success md-lg align-center"
          @click="passwordSave()"
        >
          {{ this.$S_i18n.t("BF_PASS_RESET_BUTTON") }}
        </md-button>

        <div class="md-layout" slot="subfooter">
          <div class="md-layout-item md-size-100" v-if="error_pass_empty">
            <p class="description text-center text-danger">
              {{ this.$S_i18n.t("BF_PASS_RESET_ERROR_EMPTY_PASS") }}
            </p>
          </div>
          <div class="md-layout-item md-size-100" v-if="error_pass">
            <p class="description text-center text-danger">
              {{ this.$S_i18n.t("BF_PASS_RESET_ERROR_GENERIC") }}
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
      error_pass_empty: false,
      error_pass: false,
      password: null,
      login_img: process.env.VUE_APP_BF_LANDING_IMG_INFO
    };
  },
  methods: {
    passwordSave() {
      this.error_pass_empty = false;
      this.error_pass = false;

      if (this.password.lenght == 0) {
        this.error_pass_empty = true;
      }

      this.$BF_Services.data = {
        password: this.password
      };
      this.$BF_Services
        .password_save()
        .then(() => this.$router.push("/login"))
        .catch(() => {
          this.error_pass = true;
          this.password.lenght = "";
        });
    }
  }
};
</script>

<style lang="scss"></style>
