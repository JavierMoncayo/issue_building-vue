<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-60 md-small-size-100 md-xsmall-size-100 md-size-60"
    >
      <br />
      <br />
      <img v-bind:src="'./img/' + landing_img" width="1000px" />
    </div>
    <div
      class="md-layout-item md-medium-size-40 md-small-size-100 md-xsmall-size-100 md-size-40"
    >
      <h1 class="title">{{ this.$S_i18n.t("BF_LANDING_BRIEF_TITLE") }}</h1>
      <h4 class="brand-primary">
        {{ this.$S_i18n.t("BF_LANDING_BRIEF_BODY") }}
      </h4>
      <br />
      <div>
      <md-button class="md-success md-round" id="button" @click="$router.push('register')">
        {{ this.$S_i18n.t("BF_LANDING_BRIEF_BUTTON_LABEL") }}
      </md-button>
      </div>
    </div>
    <!-- BF PRICING CARDS -->
    <div
      class="md-layout-item md-small-size-100 md-size-100 mx-auto text-center"
    >
      <h3 class="title">
        {{ this.$S_i18n.t("APP_PRICING_TITLE") }}
      </h3>
      <h5 class="description">
        {{ this.$S_i18n.t("APP_PRICING_SUBTITLE") }}
      </h5>
      <PricingComponent> </PricingComponent>
    </div>

    <!-- CONTACT FORM -->
    <div class="md-layout-item md-size-100 mx-auto text-center" id="form">
      <h3 class="title">
        {{ this.$S_i18n.t("BF_LANDING_FORM_TITLE") }}
      </h3>
      <h5 class="description">
        {{ this.$S_i18n.t("BF_LANDING_FORM_SUBTITLE") }}
      </h5>
    </div>

    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <contact-form header-color="green"> </contact-form>
      </div>
    </div>
  </div>
</template>
<script>
import { PricingComponent } from "@/components";
import { ContactForm } from "@/components";

export default {
  components: {
    PricingComponent,
    ContactForm
  },
  methods: {
    submitForm() {
      if (!this.chk_terms) {
        this.chk_term_mandatory_visible = true;
        return;
      }

      this.$BF_Services.data = {
        firstname: this.firstname,
        email: this.email,
        company: this.company
      };

      this.$BF_Services.register().then(
        response => {},
        error => {
          this.error_seen_register = true;
        }
      );
    }
  },
  data() {
    return {
      landing_img: process.env.VUE_APP_BF_LANDING_IMG_INFO
    };
  }
};
</script>
<style scoped>
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
#info {
  margin-top: 70px;
}
.title {
  margin-top: 80px;
}
h4{
  margin-top: -20px;
}

#form {
  margin-top: 50px;
}
#button {
  margin-top: -20px;
}
</style>
