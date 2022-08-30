<template>
  <div class="md-layout">
    <br />
    <br />
    <!-- bind a tap event -->
    <div class="md-layout-item md-size-100">
      <span v-touch:tap="touchHandler">Tap Me</span>
    </div>
    <br />
    <br />
    <!-- tap is the default event, you can omit it -->
    <div class="md-layout-item md-size-100">
      <span v-touch="touchHandler">Touch Me</span>
    </div>
    <br />
    <br />
    <!-- bind the swipe event, no matter direction -->
    <div class="md-layout-item md-size-100">
      <span v-touch:swipe="swipeHandler">Swipe Here</span>
    </div>
    <br />
    <br />
    <!-- only when swipe left can trigger the callback -->
    <div class="md-layout-item md-size-100">
      <span v-touch:swipe.left="swipeLeftHandler">Swipe Left Here</span>
    </div>
    <br />
    <br />
    <!-- only when swipe right can trigger the callback -->
    <div class="md-layout-item md-size-100">
      <span v-touch:swipe.left="swipeRightHandler">Swipe Right Here</span>
    </div>
    <br />
    <br />
    <!-- bind a long tap event -->
    <div class="md-layout-item md-size-100">
      <span v-touch:longtap="longtapHandler">Long Tap Event</span>
    </div>
    <br />
    <br />
    <!-- bind a start and end event -->
    <div class="md-layout-item md-size-100">
      <span v-touch:start="startHandler" v-touch:end="endHandler"
        >Down,start/Up,end Event</span
      >
    </div>
    <br />
    <br />
    <!-- bind a move and moving event -->
    <div class="md-layout-item md-size-100">
      <span v-touch:moved="movedHandler"
        >Triggered once when starting to move and tapTolerance is exceeded</span
      >
    </div>
    <br />
    <br />
    <div class="md-layout-item md-size-100">
      <span v-touch:moving="movingHandler">Continuously triggering Event</span>
    </div>
    <br />
    <br />
    <!-- touch and hold -->
    <div class="md-layout-item md-size-100">
      <span v-touch:touchhold="touchHoldHandler"
        >Touch and hold on the screen for a while</span
      >
    </div>
    <br />
    <br />
    <!-- you can even mix multiple events -->
    <div class="md-layout-item md-size-100">
      <span
        v-touch:tap="tapHandler"
        v-touch:longtap="longtapHandler"
        v-touch:swipe.left="swipeLeftHandler"
        v-touch:start="startHandler"
        v-touch:end="endHandler"
        v-touch:swipe.right="swipeRightHandler"
        >Mix Multiple Events</span
      >
    </div>
    <br />
    <br />
    <!-- using different options for specified element -->
    <div class="md-layout-item md-size-100">
      <span
        v-touch:tap="tapHandler"
        v-touch-options="{
          touchClass: 'active',
          swipeTolerance: 80,
          touchHoldTolerance: 300
        }"
        >Different options</span
      >
    </div>
    <br />
    <br />
    <!-- customize touch effects by CSS class -->
    <div class="md-layout-item md-size-100">
      <span v-touch:tap="tapHandler" v-touch-class="active"
        >Customize touch class</span
      >
    </div>
    <br />
    <br />
    <!-- or -->
    <div class="md-layout-item md-size-100">
      <span v-touch:tap="tapHandler" v-touch-options="{ touchClass: 'active' }"
        >Customize touch class</span
      >
    </div>
    <br />
  </div>
</template>
<script>
export default {
  components: {},
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
    },
    touchHandler() {
      console.log("TOUCH");
    },
    swipeHandler() {
      console.log("SWIPE");
    },
    longtapHandler() {
      console.log("LONG TAP");
    },
    startHandler() {
      console.log("START HANDLER");
    },
    endHandler() {
      console.log("END HANDLER");
    },
    movedHandler() {
      console.log("MOVED HANDLER");
    },
    movingHandler() {
      console.log("MOVING HANDLER");
    },
    touchHoldHandler() {
      console.log("TOUCH HOLD HANDLER");
    },
    swipeLeftHandler() {
      console.log("SWIPE LEFT HANDLER");
    },
    swipeRightHandler() {
      console.log("SWIPE RIGHT HANDLER");
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

h4 {
  margin-top: -20px;
}

#form {
  margin-top: 50px;
}
#button {
  margin-top: -20px;
}
</style>
