<template>
  <form>
    <md-card>
      <md-card-content>
        <div class="md-layout" v-if="!this.form_sent">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>
                {{ this.$S_i18n.t("BF_USER_PROFILE_FORM_NAME_FIRST") }}
              </label>
              <md-input v-model="name" type="text" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>
                {{ this.$S_i18n.t("BF_USER_PROFILE_FORM_EMAIL") }}
              </label>
              <md-input v-model="email" type="email" required></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>
                {{ this.$S_i18n.t("BF_USER_PROFILE_FORM_COMPANY") }}
              </label>
              <md-input v-model="company" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>
                {{ this.$S_i18n.t("BF_USER_PROFILE_FORM_WEB") }}
              </label>
              <md-input v-model="domain" type="text" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>
                {{ this.$S_i18n.t("BF_CONTACT_US_FORM_ISSUE") }}
              </label>
              <md-input v-model="issue" type="text" required></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label> {{ this.$S_i18n.t("BF_CONTACT_US_FORM_MESSAGE") }}</label>
              <md-textarea v-model="message" type="text" required></md-textarea>
            </md-field>
          </div>

          <!--- LEGAL AND CHECKBOXES -->

         
          <div class="md-layout-item md-size-100">
            <p class="description">
              {{ this.$S_i18n.t("BF_LANDING_FORM_CONSENT_LEGAL_TITLE") }}
            </p>
            <p class="description">
              {{ this.$S_i18n.t("BF_LANDING_FORM_CONSENT_LEGAL_SUBTITLE_1") }}
              <b
                ><u
                  ><a
                    v-bind:href="'mailto:' + this.contact_email"
                    target="_blank"
                    onmouseover="this.style.cursor='pointer'"
                    class="text-success"
                  >
                    {{ this.contact_email }}
                  </a></u
                ></b
              >

              {{ this.$S_i18n.t("BF_LANDING_FORM_CONSENT_LEGAL_SUBTITLE_2") }}
              <b>
                <u
                  ><a
                    v-bind:href="link_privacy"
                    target="_blank"
                    onmouseover="this.style.cursor='pointer'"
                    class="text-success"
                  >
                    {{
                      this.$S_i18n.t("BF_LANDING_FORM_CONSENT_LEGAL_WEB_LINK")
                    }}
                  </a></u
                >
              </b>
            </p>
          </div>
          <div class="md-layout-item md-size-100">
            <p>
              <md-checkbox v-model="chk_terms" style="height: 100%;">
                {{ this.$S_i18n.t("BF_LANDING_FORM_CONSENT_LEGAL") }}
              </md-checkbox>
            </p>
          </div>
          <div class="md-layout-item md-size-100">
            <p>
              <md-checkbox v-model="chk_consent">
                {{ this.$S_i18n.t("BF_LANDING_FORM_CONSENT_COMMERCIAL") }}
              </md-checkbox>
            </p>
          </div>

          <!--errors-->

          <div class="md-layout-item md-size-100" v-if="error_missing_values">
            <p class="description text-left text-danger">
              <b> {{ this.$S_i18n.t("BF_LANDING_FORM_MISSING_VALUES") }}</b>
            </p>
          </div>
          <div class="md-layout-item md-size-100 " v-if="invalid_email_visible">
            <p class="description text-left text-danger">
              <b>
                {{ this.$S_i18n.t("BF_REGISTER_FORM_INVALID_EMAIL") }}
              </b>
            </p>
          </div>
          <div class="md-layout-item md-size-100" v-if="error_chk_terms">
            <p class="description text-left text-danger">
              <b>
                {{
                  this.$S_i18n.t("BF_REGISTER_FORM_TERMS_AND_CONDITIONS_ACCEPT")
                }}
              </b>
            </p>
          </div>
          <div class="md-layout-item md-size-100 " v-if="error_contact_form">
            <p class="description text-left text-danger">
              <b>
                {{ this.$S_i18n.t("BF_LANDING_FORM_SUBMIT_ERROR") }}
              </b>
            </p>
          </div>

          <!--- ACTION BUTTON --->

          <div class="md-layout-item md-size-100 text-right">
            <div class="action">
              <md-button class="md-round md-success mt-4" @click="send()">
                {{ this.$S_i18n.t("BF_LANDING_FORM_SUBMIT") }}
              </md-button>
            </div>
          </div>
        </div>

        <!-------------------------------->

        <!-- CONFIMATION FORM SENT -->
        <div class="formsent" v-if="this.form_sent">
          <div class="md-layout text-center text-success">
            <i class="fas fa-check fa-7x"></i>
          </div>
          <h2 class="text-center"><b>Gracias</b></h2>
          <h4 class="text-center">
            Tu solicitud se ha enviado con éxito y pronto nos pondremos en
            contacto contigo.
          </h4>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "contact-us-form",
  props: {
    headerColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      form_sent: false,
      legal_url: process.env.VUE_APP_LINK_TERMS_CONDITIONS,
      chk_terms: false,
      chk_consent: false,
      company: "",
      email: "",
      name: "",
      domain: "",
      message: "",
      issue: "",
      error_chk_terms: false,
      error_contact_form: false,
      error_missing_values: false,
      invalid_email_visible: false
    };
  },
  methods: {
    send() {
      this.error_missing_values = false;
      this.invalid_email_visible = false;
      this.error_contact_form = false;
      this.error_chk_terms = false;

      if (
        this.name == "" ||
        this.email == "" ||
        this.company == "" ||
        this.domain == "" ||
        this.issue == "" ||
        this.message == ""
      ) {
        this.error_missing_values = true;
        return;
      }

      if (this.validateEmail() == false) {
        this.invalid_email_visible = true;
        return;
      }

      if (!this.chk_terms) {
        this.error_chk_terms = true;
        return;
      }

      this.$BF_Services.data = {
        name: this.name,
        email: this.email,
        company: this.company,
        domain: this.domain,
        issue: this.issue,
        comment: this.message,
        consent_marketing: this.chk_consent
      };

      this.$BF_Services
        .landingContact()
        .then(() => {
          this.form_sent = true;
        })
        .catch(() => (this.error_contact_form = true));
    },

    validateEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        return true;
      } else {
        return false;
      }
    },

    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    }
  }
};
</script>
<style>
.formsent {
  margin-top: 40px;
  margin-bottom: 60px;
}
i {
  margin-bottom: -25px;
}
</style>
