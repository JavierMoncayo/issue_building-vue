<template>
  <form>
    <md-card>
      <md-card-header>
        <h4 class="title">
          <b> {{ this.$S_i18n.t("BF_USER_PROFILE_TITLE") }} </b
          ><small>
            {{ this.$S_i18n.t("BF_USER_PROFILE_SUBTITLE") }}
          </small>
        </h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>
                {{ this.$S_i18n.t("BF_USER_PROFILE_FORM_COMPANY") }}
              </label>
              <md-input
                v-model="company"
                @keyup.enter="update_info()"
              ></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>
                {{ this.$S_i18n.t("BF_USER_PROFILE_FORM_NAME_USER") }}
              </label>
              <md-input
                v-model="username"
                type="text"
                @keyup.enter="update_info()"
              ></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>
                {{ this.$S_i18n.t("BF_USER_PROFILE_FORM_EMAIL") }}
              </label>
              <md-input v-model="emailadress" type="email" disabled></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>
                {{ this.$S_i18n.t("BF_USER_PROFILE_FORM_PHONE") }}
              </label>
              <md-input
                v-model="phone"
                type="text"
                @keyup.enter="update_info()"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>
                {{ this.$S_i18n.t("BF_USER_PROFILE_MEMBER_SINCE") }}
              </label>
              <md-input v-model="member_since" type="text" disabled></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label> {{ this.$S_i18n.t("BF_USER_PROFILE_LANGUAGE") }}</label>
              <md-select
                v-model="language"
                name="language"
                id="language"
                disabled
              >
                <md-option value="spanish">Español</md-option>
                <md-option value="english">Inglés</md-option>
              </md-select>
            </md-field>
          </div>

          <div class="md-layout-item md-size-40 " v-if="error_general">
            <p class="description text-center text-danger">
              {{ this.$S_i18n.t("BF_USER_PROFILE_SUBMIT_ERROR") }}
            </p>
          </div>
          <div class="md-layout-item md-size-60">
            <div class="action">
              <md-button
                class="md-round md-success mt-4"
                @click="update_info()"
              >
                {{ this.$S_i18n.t("BF_USER_PROFILE_FORM_SUBMIT") }}
              </md-button>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import Swal from "sweetalert2";
export default {
  name: "edit-profile-form",
  props: {
    headerColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      username: "",
      company: "",
      phone: "",
      emailadress: "",
      member_since: "",
      language: "",
      address: "",
      city: "",
      error_general: false
    };
  },

  mounted: function() {
    this.update_fields();
  },

  methods: {
    showSwal(type) {
      if (type === "auto-close") {
        Swal.fire({
          title: "✅",
          text: this.$S_i18n.t("APP_SAVE_NOTIFICATION_MESSAGE"),
          timer: 2000,
          showConfirmButton: false
        });
      }
    },

    update_info() {
      this.$BF_Services.data = {
        company: this.company,
        name: this.username,
        email: this.emailadress,
        address: this.address,
        city: this.city,
        language: this.lang,
        phone: this.phone
      };
      this.$BF_Services
        .updateUserProfile()
        .then(() => this.update_fields())
        .catch(() => {});

      this.$BF_Services
        .updateUserProfile()
        .then(() => this.update_fields())
        .catch(() => {});
        console.log("BF_SERVICES", this.$$BF_Services)
      this.$BF_TOOLS.operationalInfo_Set(this.$BF_Services.data);
      this.showSwal("auto-close");
      return;
    },

    update_fields() {
      this.username = localStorage.getItem("BF_name");
      this.emailadress = localStorage.getItem("BF_email");
      this.company = localStorage.getItem("BF_company");
      this.address = localStorage.getItem("BF_address");
      this.city = localStorage.getItem("BF_city");
      this.phone = localStorage.getItem("BF_phone");
      this.member_since = localStorage.getItem("BF_date_created");
      this.language = localStorage.getItem("BF_language");
    },
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    }
  }
};
</script>
<style lang="scss">
.text-right {
  display: flex;
}
</style>
