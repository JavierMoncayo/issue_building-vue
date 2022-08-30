<template>
  <div class="md-layout text-center">
    <div
      class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
    >
      <span class="material-icons md-48 text-danger">
        error
      </span>
      <h2 slot="title" class="title">
        <b>
          {{ this.$S_i18n.t("BF_PAYMENT_FAIL_TITLE") }}
        </b>
      </h2>
      <p slot="description" class="description text-center">
        {{ this.$S_i18n.t("BF_PAYMENT_FAIL_SUBTITLE") }}
      </p>
      <p>{{ error_reference }}</p>
      <p>{{ error_datetime }}</p>
      <div class="action">
        <md-button
          class="md-round md-success mt-4"
          @click="RequestToMySitesPage()"
        >
          <md-icon>
            arrow_back_ios
          </md-icon>
          {{ this.$S_i18n.t("BF_PAYMENT_FAIL_BUTTON") }}
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      email: "",
      email_sent: false,
      error_submit: false,
      error_empty_email: false,
      error_reference: "",
      error_datetime: ""
    };
  },
  beforeMount() {
    var currentdate = new Date();
    this.error_datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    this.error_reference = this.$route.query.t;
  },

  methods: {
    reset() {
      this.error_submit = false;
      this.error_empty_email = false;

      if (this.email == "") {
        this.error_empty_email = true;
        return;
      }

      this.$BF_Services.data = { email: this.email };

      this.$BF_Services.password_reset();

      this.email_sent = true;
    },
    RequestToMySitesPage() {
      this.$router.push("/dashboard/my-sites");
    }
  }
};
</script>
