<template>
  <md-card class="md-card-profile">
    <md-card-content> </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: process.env.VUE_APP_BF_USER_AVATAR_DEFAULT
    },
    buttonColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      plan: "profesional"
    };
  },
  methods: {
    getColorButton: function(buttonColor) {
      return "md-" + buttonColor + "";
    }
  }
};
</script>
<style></style>
