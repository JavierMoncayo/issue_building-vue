<template>
  <div v-if="recorded" class="md-layout text-center">
    <div
      class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
    >
      <span class="material-icons md-48 text-success">
        task_alt
      </span>
      <h2 slot="title" class="title">
        <b>
          {{ this.$S_i18n.t("BF_PAYMENT_SUCCESS_TITLE") }}
        </b>
      </h2>
      <p slot="description" class="description text-center">
        {{ this.$S_i18n.t("BF_PAYMENT_SUCCESS_SUBTITLE") }}
      </p>
      <div class="action">
        <md-button
          class="md-round md-success mt-4"
          @click="RequestToMySitesPage()"
        >
          <md-icon>
            arrow_back_ios
          </md-icon>
          {{ this.$S_i18n.t("BF_PAYMENT_SUCCESS_BUTTON") }}
        </md-button>
      </div>
    </div>
  </div>
  <div v-else class="md-layout text-center">
    <div
      class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
    >
      <span class="material-icons md-48 text-success">
        hourglass_top
      </span>
      <h2 slot="title" class="title text-success">
        {{ this.$S_i18n.t("BF_PAYMENT_PROCESSING_TITLE") }}
      </h2>

      <p>
        {{ this.$S_i18n.t("BF_PAYMENT_PROCESSING_SUBTITLE") }}
      </p>
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
      recorded: false
    };
  },
  beforeMount() {
    this.recorded = false;
  },
  mounted() {
    var data = this.$route.query.t.split("-");
    this.$BF_Services.data = {
      token: data[2],
      id_plan: data[1],
      id_rup: data[0]
    };
    this.$BF_Services.suscribe_plan().then(response => {
      this.recorded = true;
    });
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
