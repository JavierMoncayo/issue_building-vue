<template>
  <md-card class="md-card-login" :class="{ 'md-card-hidden': cardHidden }">
    <!--S_START-->
    <h2>
      <b> <slot name="title"></slot></b>
    </h2>
    <!--S_END-->
    <md-card-content>
      <slot name="description"></slot>
      <slot name="inputs"></slot>
    </md-card-content>

    <md-card-actions>
      <slot name="footer"></slot>
    </md-card-actions>
    <md-card-actions>
      <slot name="subfooter"></slot>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "reset-card",
  props: {
    headerColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      cardHidden: true
    };
  },
  beforeMount() {
    setTimeout(this.showCard, 400);
  },
  methods: {
    showCard: function() {
      this.cardHidden = false;
    },
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    }
  }
};
</script>

<style lang="css"></style>
