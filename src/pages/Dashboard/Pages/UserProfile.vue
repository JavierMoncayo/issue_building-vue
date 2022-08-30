<template>

  <div class="content">

    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form header-color="primary"> </edit-profile-form>
      </div>
    
    </div>
  </div>
</template>

<script>
import { EditProfileForm } from "@/components";
export default {
  components: {
    EditProfileForm,
  
  },
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute("src", "https://js.stripe.com/v3/");
    plugin.async = true;
    document.head.appendChild(plugin);
  },
  methods: {
    stripe_checkout(bf_price) {
      var stripe = Stripe(process.env.VUE_APP_BF_STRIPE_PUBLISHABLE_KEY);

      stripe
        .redirectToCheckout({
          lineItems: [{ price: bf_price, quantity: 1 }],
          mode: process.env.VUE_APP_BF_STRIPE_MODE,
          customerEmail: localStorage.getItem("BF_email"),
          successUrl: process.env.VUE_APP_BF_STRIPE_PRICE_PRODUCT_URL_SUCCESS,
          cancelUrl: process.env.VUE_APP_BF_STRIPE_PRICE_PRODUCT_URL_CANCEL
        })
        .then(function(result) {
          if (result.error) {
            var displayError = document.getElementById("error-message");
            displayError.textContent = result.error.message;
          } else {
            this.$BF_Services.data = {
              token: localStorage.getItem("token"),
              product_id: bf_price
            };
            this.$BF_Services.updateUserPayment().then();
          }
        });
    },
    checkout_card_1() {
      this.stripe_checkout(process.env.VUE_APP_BF_STRIPE_PRICE_PRODUCT_CARD1);
    },
    checkout_card_2() {
      this.stripe_checkout(process.env.VUE_APP_BF_STRIPE_PRICE_PRODUCT_CARD2);
    },
    checkout_card_3() {
      this.stripe_checkout(process.env.VUE_APP_BF_STRIPE_PRICE_PRODUCT_CARD3);
    }
  }
};
</script>
<style lang="scss">
.text-right {
  display: flex;
}
</style>
