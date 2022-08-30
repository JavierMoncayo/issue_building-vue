<template>
  <div class="md-layout text-center">
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <reset-card header-color="green">
        <h3 slot="title" class="title">
          {{ this.$S_i18n.t("BF_RESET_FORM_TITLE") }}
        </h3>

        <p slot="description" class="description text-center">
          {{ this.$S_i18n.t("BF_RESET_FORM_SUBTITLE") }}
        </p>

        <md-field class="md-form-group" slot="inputs">
          <md-icon>email</md-icon>
          <label>{{ this.$S_i18n.t("BF_LOGIN_FORM_EMAIL") }}</label>
          <md-input v-model="email" type="email"></md-input>
        </md-field>

        <md-button
          slot="footer"
          class="md-round md-success align-center"
          @click="reset()"
        >
          {{ this.$S_i18n.t("BF_RESET_FORM_SUBMIT") }}
        </md-button>

        <div class="md-layout" slot="subfooter">
          <div
            class="md-layout-item md-size-100 text-success"
            v-if="email_sent"
          >
            <p>
              {{ this.$S_i18n.t("BF_RESET_FORM_CONFIRMATION_SUBTITLE") }}
            </p>
          </div>
          <div class="md-layout-item md-size-100 " v-if="error_empty_email">
            <p class="description text-center text-danger">
              <b>
                {{ this.$S_i18n.t("BF_RESET_EMAIL_ERROR") }}
              </b>
            </p>
          </div>
          <div class="md-layout-item md-size-100 " v-if="error_submit">
            <b>
              <p class="description text-center text-danger">
                {{ this.$S_i18n.t("BF_RESET_SUBMIT_ERROR") }}
              </p>
            </b>
          </div>
          <div class="md-layout-item md-size-100 " v-if="invalid_email_visible">
            <p class="description text-center text-danger">
              <b>
                {{ this.$S_i18n.t("BF_REGISTER_FORM_INVALID_EMAIL") }}
              </b>
            </p>
          </div>
          <div class="md-layout-item md-size-100 " v-if="somehing_went_wrong">
            <p class="description text-center text-danger">
              <b>
                ¡Ups! Algo ha ido mal. Inténtalo más tarde.
              </b>
            </p>
          </div>

          <div class="md-layout-item md-size-100">
            <u>
              <a href="#/login">
                {{ this.$S_i18n.t("BF_RESET_LOGIN_LABEL") }}
              </a></u
            >
          </div>
          <br />
          <br />
        </div>
      </reset-card>
    </div>
  </div>
</template>

<script>
import { ResetCard } from "@/components";

export default {
  components: {
    ResetCard
  },
  data() {
    return {
      email: "",
      email_sent: false,
      error_submit: false,
      error_empty_email: false,
      invalid_email_visible: false,
      somehing_went_wrong: false
    };
  },
  methods: {
    reset() {
      this.error_submit = false;
      this.error_empty_email = false;
      this.invalid_email_visible = false;
      this.somehing_went_wrong = false;

      if (this.email == "") {
        this.error_empty_email = true;
        return;
      }

      if (this.validateEmail() == false) {
        this.invalid_email_visible = true;
        return;
      }

      this.$BF_Services.data = { email: this.email };

      this.$BF_Services
        .resetPassword()
        .then(response => {
          this.email_sent = true;
        })
        .catch(error => {
          var code = error.code;
          console.log("error", error.response);
          if (code == "400") {
            this.error_submit = true;
          } else {
            this.somehing_went_wrong = true;
          }
          this.email_sent = false;
          this.email = "";
        });
    },
    validateEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style></style>
