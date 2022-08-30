<template>
  <div class="columns">
    <div class="md-layout">
      <!-- PRICING CARD 1 -->
      <div
        class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-100 md-size-33"
      >
        <pricing-card icon-color="icon-primary">
          <h2 slot="category" class="category text-primary">
            {{ this.$S_i18n.t("BF_PRICING_CARD_1_TITLE") }}
          </h2>

          <md-icon slot="icon">
            {{ this.$S_i18n.t("BF_PRICING_CARD_1_ICON") }}
          </md-icon>

          <h3 slot="title" class="title-pricing text-warning">
            <md-button
              slot="footer"
              id="button"
              class="md-success md-round"
              @click="checkout(id_web_basic)"
            >
              {{ this.$S_i18n.t("BF_PRICING_CARD_1_PRICE_WEB") }}
            </md-button>
          </h3>

          <div
            slot="title"
            class="md-layout-item md-size-100"
            v-if="this.typeCheckout == 'stripe'"
          >
            <p class="description text-center text-gray underline">
              {{ this.$S_i18n.t("BF_PRICING_TRANSFER_PAYMENT_DESCRIPTION") }}
              <b>
                <a
                  @click="showSwal('web-basic')"
                  class="text-success"
                  style="margin-top:-15px; text-decoration:underline;"
                >
                  {{
                    this.$S_i18n.t(
                      "BF_PRICING_TRANSFER_PAYMENT_LINK_DESCRIPTION"
                    )
                  }}
                </a>
              </b>
            </p>
          </div>

          <br />
          <p slot="description text-primary" class="card-description">
            <md-icon class="text-warning">
              check
            </md-icon>
            {{ this.$S_i18n.t("BF_PRICING_CARD_1_BODY_1") }}
          </p>
          <p slot="description" class="card-description">
            <md-icon class="text-warning">
              check
            </md-icon>
            {{ this.$S_i18n.t("BF_PRICING_CARD_1_BODY_2") }}
          </p>
          <p slot="description" class="card-description">
            <md-icon class="text-warning">
              check
            </md-icon>
            {{ this.$S_i18n.t("BF_PRICING_CARD_1_BODY_3") }}
          </p>
          <p slot="description" class="card-description">
            <md-icon class="text-warning">
              check
            </md-icon>
            {{ this.$S_i18n.t("BF_PRICING_CARD_1_BODY_4") }}
          </p>
        </pricing-card>
      </div>
      <!-- PRICING CARD 2 -->
      <div
        class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-100 md-size-33"
      >
        <pricing-card icon-color="icon-primary">
          <h2 slot="category" class="category text-primary">
            {{ this.$S_i18n.t("BF_PRICING_CARD_2_TITLE") }}
          </h2>
          <md-icon slot="icon">
            {{ this.$S_i18n.t("BF_PRICING_CARD_2_ICON") }}
          </md-icon>

          <h3 slot="title" class="title-pricing text-warning">
            <md-button
              slot="footer"
              id="button"
              class="md-success md-round"
              @click="checkout(id_web_pro)"
            >
              {{ this.$S_i18n.t("BF_PRICING_CARD_2_PRICE_WEB") }}
            </md-button>
          </h3>
          <div
            slot="title"
            class="md-layout-item md-size-100"
            v-if="this.typeCheckout == 'stripe'"
          >
            <p class="description text-center text-gray underline">
              {{ this.$S_i18n.t("BF_PRICING_TRANSFER_PAYMENT_DESCRIPTION") }}
              <b>
                <a
                  @click="showSwal('web-pro')"
                  class="text-success"
                  style="margin-top:-15px; text-decoration:underline;"
                >
                  {{
                    this.$S_i18n.t(
                      "BF_PRICING_TRANSFER_PAYMENT_LINK_DESCRIPTION"
                    )
                  }}
                </a>
              </b>
            </p>
          </div>
          <p slot="description" class="card-description">
            <md-icon class="text-warning">
              check
            </md-icon>
            {{ this.$S_i18n.t("BF_PRICING_CARD_2_BODY_1") }}
          </p>
          <p slot="description" class="card-description">
            <md-icon class="text-warning">
              check
            </md-icon>
            {{ this.$S_i18n.t("BF_PRICING_CARD_2_BODY_2") }}
          </p>
          <p slot="description" class="card-description">
            <md-icon class="text-warning">
              check
            </md-icon>
            {{ this.$S_i18n.t("BF_PRICING_CARD_2_BODY_3") }}
          </p>
          <p slot="description" class="card-description">
            <md-icon class="text-warning">
              check
            </md-icon>
            {{ this.$S_i18n.t("BF_PRICING_CARD_2_BODY_4") }}
          </p>
          <p slot="description" class="card-description">
            <md-icon class="text-warning">
              check
            </md-icon>
            {{ this.$S_i18n.t("BF_PRICING_CARD_2_BODY_5") }}
          </p>
        </pricing-card>
      </div>
      <!-- PRICING CARD 3 -->
      <div
        class="md-layout-item md-medium-size-50 md-small-size-100 md-xsmall-size-100 md-size-33"
      >
        <pricing-card icon-color="icon-primary">
          <h2 slot="category" class="category text-primary">
            {{ this.$S_i18n.t("BF_PRICING_CARD_4_TITLE") }}
          </h2>
          <md-icon slot="icon">
            {{ this.$S_i18n.t("BF_PRICING_CARD_4_ICON") }}
          </md-icon>

          <h4 slot="description" class="title-pricing text-warning">
            {{ this.$S_i18n.t("BF_PRICING_CARD_4_PRICE") }}
          </h4>
          <p slot="description" class="card-description">
            {{ this.$S_i18n.t("BF_PRICING_CARD_4_BODY") }}
          </p>
          <md-button
            slot="footer"
            id="button"
            class="md-success md-round button"
            @click="$router.push('contact')"
          >
            {{ this.$S_i18n.t("BF_PRICING_CARD_4_BUTTON") }}
          </md-button>
        </pricing-card>
      </div>
    </div>
  </div>
</template>

<!-- Load Stripe.js on your website. -->

<script>
import Swal from "sweetalert2";
import $ from "jquery";
import { PricingCard } from "@/components";
export default {
  components: {
    PricingCard
  },
  data() {
    return {
      typeCheckout: "",
      path_name: this.$router.currentRoute.fullPath,
      id_web_basic: process.env.VUE_APP_PLANS_WEB_BASIC,
      id_web_pro: process.env.VUE_APP_PLANS_WEB_PRO,
      id_ecommerce_basic: process.env.VUE_APP_PLANS_ECOMMERCE_BASIC,
      id_ecommerce_pro: process.env.VUE_APP_PLANS_ECOMMERCE_PRO,
      stripe_url_success:
        process.env.VUE_APP_BF_STRIPE_PRICE_PRODUCT_URL_SUCCESS,
      stripe_url_fail: process.env.VUE_APP_BF_STRIPE_PRICE_PRODUCT_URL_CANCEL,
      host: window.location.href.split("/")
    };
  },
  beforeMount() {
    if (this.path_name.includes("pages")) {
      this.typeCheckout = "stripe";
    } else this.typeCheckout = "login";
    //console.log("CHECKOUTYPOE", this.typeCheckout);
    const plugin = document.createElement("script");
    plugin.setAttribute("src", "https://js.stripe.com/v3/");
    plugin.async = true;
    document.head.appendChild(plugin);
  },
  mounted() {},
  methods: {
    showSwal(type) {
      Swal.fire({
        title: `Referencia: ` + type,
        html: `<p> Mandanos un email con el justificante y el sitio web que quieres actualizar a: </p>
                <p><a href="mailto:hola@cometwise.com">hola@cometwise.com</a></p>
                <p>IBAN: BE81 9670 1142 2724,</p>
                <p>*Esta opción puede tardar 2 o 3 días.</p>
                <p>Puedes comprobar todos nuestros datos <a href="./static/account_ownership_proof_eur.pdf" target="_blank">aquí</a></p>`,

        buttonsStyling: false,
        confirmButtonClass: "md-button md-success"
      });
    },
    checkout(bf_price) {
      if (this.typeCheckout == "stripe") {
        //console.log("stripe");
        this.stripe_checkout(bf_price);
      } else {
        //console.log("login");
        this.$router.push("login");
      }
    },
    stripe_checkout(bf_price) {
      var token = localStorage.getItem("token");
      var id_rup = localStorage.getItem("op_id_rup");
      var stripe = Stripe(process.env.VUE_APP_BF_STRIPE_PUBLISHABLE_KEY);
      stripe
        .redirectToCheckout({
          lineItems: [{ price: bf_price, quantity: 1 }],
          mode: process.env.VUE_APP_BF_STRIPE_MODE,
          customerEmail: localStorage.getItem("BF_email"),
          // token = 32 bytes; bf_price = 30 bytes; id_rup = ? bytes
          successUrl:
            "https://" +
            window.location.hostname +
            "/#/PaymentSuccess?t=" +
            id_rup +
            "-" +
            bf_price +
            "-" +
            token,
          cancelUrl:
            "https://" +
            window.location.hostname +
            "/#/PaymentFail?t=" +
            id_rup +
            "-" +
            bf_price +
            "-" +
            token
        })
        .then(function(result) {
          if (result.error) {
            var displayError = document.getElementById("error-message");
            displayError.textContent = result.error.message;
          } else {
          }
        });
    }
  }
};
</script>
<style lang="scss">
.text-right {
  display: flex;
}
.card {
  height: 100%;
}
.pricing-card {
  height: 100%;
}
.md-layout-item {
  // height: 100%;
  display: flex;
  flex-direction: column;
}
.cart-footer {
  margin-top: auto;
}
.columns {
  /* PRICING CARDS SAME HEIGHT */
  display: flex;
  align-items: stretch;
}
#button {
  margin-bottom: 30px;
}
</style>
