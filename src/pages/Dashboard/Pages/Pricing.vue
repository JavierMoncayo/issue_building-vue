<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item md-size-50 mx-auto text-center">
        <h2 class="title">
          {{ this.$S_i18n.t("APP_PRICING_TITLE") }}
        </h2>
        <h5 class="description">
          {{ this.$S_i18n.t("APP_PRICING_SUBTITLE") }}
        </h5>
      </div>
    </div>
    <PricingComponent> </PricingComponent>
  </div>
</template>
<script>
import { PricingComponent } from "@/components";
export default {
  components: {
    PricingComponent
  }
};
</script>
<style scoped>
.text-center {
  text-align: center;
}
</style>
