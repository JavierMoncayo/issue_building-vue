<template>
  <md-card class="md-card-pricing" :class="cardClass">
    <span>
      <hr class="tealline" style="border-radius:15px solid #ff9f1c" />
    </span>
    <!--
    <slot name="category"></slot>
    -->

    <md-card-content>
      <div class="md-card-icon icon" :class="iconColor">
        <slot name="icon"></slot>
      </div>
      <slot name="category"></slot>
      <slot name="webicon"></slot>
      <br />
      <slot name="description"></slot>
      <slot name="title"></slot>
      <slot name="webicon2"></slot>

      <slot name="description2"></slot>
      <slot name="title2"></slot>
    </md-card-content>
    <md-card-actions class="text-center global">
      <div class="action">
        <slot name="footer"></slot>
      </div>
    </md-card-actions>
  </md-card>
</template>
<script>
export default {
  name: "pricing-card",
  props: {
    cardClass: {
      type: String,
      default: ""
    },
    iconColor: {
      type: String,
      default: ""
    }
  }
};
</script>
<style>
.md-card-pricing {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.global {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.actions {
  justify-content: flex-end;
  display: flex;
}
hr.tealline {
  border: 12px solid #3c4958;
  border-radius: 5px 5px 0px 0px;
  margin-top: -5px;
}
</style>
