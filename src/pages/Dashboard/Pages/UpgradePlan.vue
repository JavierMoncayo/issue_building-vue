<template>
  <div class="columns">
    <div class="md-layout">
      <div
        class="md-layout-item md-small-size-100 md-size-100 mx-auto text-center"
      >
        <PricingComponent> </PricingComponent>
      </div>
    </div>
  </div>
</template>

<!-- Load Stripe.js on your website. -->

<script>
import Swal from "sweetalert2";
import $ from "jquery";
import { PricingComponent } from "@/components";
export default {
  components: {
    PricingComponent
  },
  data() {
    return {
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
.h3 {
  /* PRICING CARDS SAME HEIGHT */
  margin-bottom: -30px;
}
.a,
a {
  color: green;
  text-decoration: underline;
}
</style>
