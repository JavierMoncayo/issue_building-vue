<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <register-card>
        <h2 class="title text-center" slot="title">
          {{ this.$S_i18n.t("BF_REGISTER_TITLE") }}
        </h2>
        <div
          class="md-layout-item md-size-50 md-medium-size-50 md-small-size-100 ml-auto"
          slot="content-left"
        >
          <div
            class="info info-horizontal"
            v-for="item in contentLeft"
            :key="item.title"
          >
            <div :class="`icon ${item.colorIcon}`">
              <md-icon>{{ item.icon }}</md-icon>
            </div>
            <div class="description">
              <h4 class="info-title">{{ item.title }}</h4>
              <p class="description">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="md-layout-item md-size-50 md-medium-size-50 md-small-size-100 mr-auto"
          slot="content-right"
        >
          <md-field class="md-form-group">
            <md-icon>face</md-icon>
            <label>{{ this.$S_i18n.t("BF_REGISTER_FORM_FIRST_NAME") }}</label>
            <md-input v-model="name" type="text"></md-input>
          </md-field>

          <md-field class="md-form-group">
            <md-icon>email</md-icon>
            <label>{{ this.$S_i18n.t("BF_REGISTER_FORM_EMAIL") }}</label>
            <md-input v-model="email" type="email"></md-input>
          </md-field>

          <md-field class="md-form-group">
            <md-icon>lock_outline</md-icon>
            <label>{{ this.$S_i18n.t("BF_REGISTER_FORM_PASSWORD") }}</label>
            <md-input v-model="password1" type="password"></md-input>
          </md-field>

          <md-field class="md-form-group">
            <md-icon>lock_outline</md-icon>
            <label>{{
              this.$S_i18n.t("BF_REGISTER_FORM_PASSWORD_CONFIRMATION")
            }}</label>
            <md-input v-model="password2" type="password"></md-input>
          </md-field>

          <!-- conset -->

          <div class="md-layout-item md-size-100">
            <p class="description">
              {{ this.$S_i18n.t("BF_LANDING_FORM_CONSENT_LEGAL_TITLE") }}
            </p>
            <p class="description">
              {{ this.$S_i18n.t("BF_REGISTER_FORM_CONSENT_LEGAL_SUBTITLE_1") }}
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

              {{ this.$S_i18n.t("BF_REGISTER_FORM_CONSENT_LEGAL_SUBTITLE_2") }}
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
            <md-checkbox id="chk_terms_conditions" v-model="chk_terms">
              <label>
                {{ this.$S_i18n.t("BF_REGISTER_FORM_ACCEPT")
                }}<b
                  ><u
                    ><a
                      onmouseover="this.style.cursor='pointer'"
                      class="text-success"
                      onclick="window.open('process.env.VUE_APP_EXT_SUMENTS_NOTICE_TERMS_AND_CONDITIONS (quitar comillas y añadir v-)')"
                      ng-click="$event.stopPropagation()"
                      >{{
                        this.$S_i18n.t("BF_REGISTER_FORM_ACCEPT_LINK_TITLE")
                      }}</a
                    ></u
                  ></b
                >
                {{ this.$S_i18n.t("BF_REGISTER_FORM_ACCEPT_2") }}
              </label>
            </md-checkbox>
          </div>

          <div class="md-layout-item md-size-100">
            <md-checkbox v-model="chk_consent">
              {{ this.$S_i18n.t("BF_REGISTER_FORM_CONSENT") }}
            </md-checkbox>
          </div>

          <!--errors-->
          <div class="md-layout-item md-size-100" v-if="error_seen_register">
            <p class="description text-left text-danger">
              <b>
                {{ this.$S_i18n.t("BF_REGISTER_ERROR") }}
              </b>
            </p>
          </div>
          <div class="md-layout-item md-size-100 " v-if="invalid_email_visible">
            <p class="description text-center text-danger">
              <b>
                {{ this.$S_i18n.t("BF_REGISTER_FORM_INVALID_EMAIL") }}
              </b>
            </p>
          </div>
          <div
            class="md-layout-item md-size-100 "
            v-if="chk_term_mandatory_visible"
          >
            <p class="description text-center text-danger">
              <b>
                {{
                  this.$S_i18n.t("BF_REGISTER_FORM_TERMS_AND_CONDITIONS_ACCEPT")
                }}</b
              >
            </p>
          </div>
          <div
            class="md-layout-item md-size-100"
            v-if="chk_pass_not_match_visible"
          >
            <p class="description text-center text-danger">
              <b>
                {{ this.$S_i18n.t("BF_REGISTER_ERROR_MATCH_PASSW") }}
              </b>
            </p>
          </div>
          <div
            class="md-layout-item md-size-100"
            v-if="mail_already_register_visible"
          >
            <p class="description text-center text-danger">
              <b>
                {{
                  this.$S_i18n.t("BF_REGISTER_FORM_ERROR_MAIL_ALREADY_REGISTER")
                }}
              </b>
            </p>
          </div>
          <div class="md-layout-item md-size-100" v-if="name_empty_visible">
            <p class="description text-center text-danger">
              <b>
                {{ this.$S_i18n.t("BF_REGISTER_FORM_ERROR_NAME_EMPTY") }}
              </b>
            </p>
          </div>
          <div class="md-layout-item md-size-100" v-if="password_empty_visible">
            <p class="description text-center text-danger">
              <b>
                {{ this.$S_i18n.t("BF_REGISTER_FORM_ERROR_PASSWORD_EMPTY") }}
              </b>
            </p>
          </div>

          <!----- action buttons ------->
          <div class="button-container">
            <md-button
              class="md-warning md-round mt-4"
              slot="footer"
              @click="signin()"
            >
              {{ this.$S_i18n.t("BF_REGISTER_FORM_SUBMIT") }}
            </md-button>
            <p id="subfooter" slot="subfooter" class="option text-center mt-4">
              -
              <b
                ><a href="#/login" class="text-success">{{
                  this.$S_i18n.t("BF_LOGIN_FORM_TITLE")
                }}</a></b
              >
            </p>
          </div>
        </div>
      </register-card>
    </div>
  </div>
</template>
<script>
import { RegisterCard } from "@/components";
export default {
  components: {
    RegisterCard
  },
  methods: {
    signin() {
      this.chk_term_mandatory_visible = false;
      this.chk_pass_not_match_visible = false;
      this.error_seen_register = false;
      this.invalid_email_visible = false;
      this.mail_already_register_visible = false;
      this.name_empty_visible = false;
      this.password_empty_visible = false;

      if (this.name == "") {
        this.name_empty_visible = true;
        return;
      }

      if (this.validateEmail() == false) {
        this.invalid_email_visible = true;
        return;
      }

      if (this.password1 == "") {
        this.password_empty_visible = true;
        return;
      }
      if (this.password1 != this.password2) {
        this.chk_pass_not_match_visible = true;
        return;
      }

      if (!this.chk_terms) {
        this.chk_term_mandatory_visible = true;
        return;
      }

      this.$BF_Services.data = {
        name: this.name,
        email: this.email,
        password: this.password1,
        language: this.$S_i18n.locale,
        company: "",
        phone: ""
      };

      this.$BF_Services.register()
        .then(() => {
          this.$router.push("/registerconfirmation");
        })
        .catch(error => {
          var code = error.code;
          if (code == "406") {
            this.mail_already_register_visible = true;
          }
        });
    },

    validateEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      name_empty_visible: false,
      password_empty_visible: false,
      mail_already_register_visible: false,
      invalid_email_visible: false,
      link_cgc: process.env.VUE_APP_LINK_TERMS_CONDITIONS,
      link_privacy: process.env.VUE_APP_LINK_PRIVACY,
      link_cookies: process.env.VUE_APP_LINK_COOKIES,
      link_legal: process.env.VUE_APP_LINK_LEGAL,
      contact_email: process.env.VUE_APP_CONTACT_EMAIL,
      chk_terms: false,
      chk_consent: false,
      chk_term_mandatory_visible: false,
      chk_pass_not_match_visible: false,
      error_seen_register: false,
      name: "",
      email: "",
      password1: "",
      password2: "",
      contentLeft: [
        {
          colorIcon: "icon-success",
          icon: "timeline",
          title: this.$S_i18n.t("BF_REGISTER_LEFT_1_TITLE"),
          description: this.$S_i18n.t("BF_REGISTER_LEFT_1_BODY")
        },

        {
          colorIcon: "icon-danger",
          icon: "code",
          title: this.$S_i18n.t("BF_REGISTER_LEFT_2_TITLE"),
          description: this.$S_i18n.t("BF_REGISTER_LEFT_2_BODY")
        },

        {
          colorIcon: "icon-info",
          icon: "group",
          title: this.$S_i18n.t("BF_REGISTER_LEFT_3_TITLE"),
          description: this.$S_i18n.t("BF_REGISTER_LEFT_3_BODY")
        }
      ]
    };
  }
};
</script>
<style>
.subfooter {
  font-size: 3px;
}
.option {
  margin-left: 5px;
}
</style>
