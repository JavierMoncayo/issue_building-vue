<template>
  <div class="full-page" :class="{ 'nav-open': $sidebar.showSidebar }">
    <md-toolbar md-elevation="0" class="md-transparent md-toolbar-absolute">
      <div class="md-toolbar-row md-offset">
        <!-- S_START -->
        <div class="md-toolbar-section-start" @click="$router.push('landing')">
          <img v-bind:src="'./img/' + s_applogo" width="200px" />
        </div>
        <!-- S_END -->
        <div class="md-toolbar-section-end">
          <md-button
            class="md-just-icon md-simple md-round md-toolbar-toggle"
            :class="{ toggled: $sidebar.showSidebar }"
            @click="toggleSidebar"
          >
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </md-button>

          <div
            class="md-collapse"
            :class="{ 'off-canvas-sidebar': responsive }"
          >
            <md-list>
              <md-list-item href="#/pricing" @click="linkClick">
                <md-icon>attach_money</md-icon>
                {{ this.$S_i18n.t("APP_PRICING_NAME") }}
              </md-list-item>
              <md-list-item href="#/register" @click="linkClick">
                <md-icon>person_add</md-icon>
                {{ this.$S_i18n.t("BF_REGISTER_TITLE") }}
              </md-list-item>
              <md-list-item href="#/login" @click="linkClick">
                <md-icon>fingerprint</md-icon>
                {{ this.$S_i18n.t("BF_LOGIN_NAME") }}
              </md-list-item>
            </md-list>
          </div>
        </div>
      </div>
    </md-toolbar>
    <div
      class="wrapper wrapper-full-page"
      @click="toggleSidebarPage"
      style="  height: 100%;"
    >
      <div
        class="page-header header-filter"
        :class="setPageClass"
        filter-color="black"
        :style="setBgImage"
      >
        <div class="container md-offset">
          <zoom-center-transition
            :duration="pageTransitionDuration"
            mode="out-in"
          >
            <router-view></router-view>
          </zoom-center-transition>
        </div>
        <footer class="footer">
          <div class="container md-offset" style="margin-top:100px;">
            <nav>
              <ul>
                <li>
                  <router-link :to="{ path: '/contact' }">
                    {{ this.$S_i18n.t("BF_FOOTER_CONTACT_US") }}
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{ path: '/condiciones-generales-contratacion' }"
                  >
                    {{ this.$S_i18n.t("BF_FOOTER_TERMS_AND_CONDITIONS") }}
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ path: '/politica-de-privacidad' }">
                    {{ this.$S_i18n.t("BF_FOOTER_NOTICE_PRIVACY") }}
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ path: '/politica-de-cookies' }">
                    {{ this.$S_i18n.t("BF_FOOTER_NOTICE_COOKIES") }}
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ path: '/aviso-legal' }">
                    {{ this.$S_i18n.t("BF_FOOTER_NOTICE_LEGAL") }}
                  </router-link>
                </li>
              </ul>
            </nav>
            <div class="copyright text-center">
              &copy; {{ new Date().getFullYear() }}
              <a :href="this.link_suments" target="_blank" style="color:#e7ba3d;">
                {{ this.$S_i18n.t("BF_FOOTER_COPYRIGHT") }} </a
              >,
              <md-icon class="text-warning">lock</md-icon>
              {{ this.$S_i18n.t("BF_FOOTER_COPYRIGHT_SLOGAN") }}
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { ZoomCenterTransition } from "vue2-transitions";

export default {
  components: {
    ZoomCenterTransition
  },
  props: {
    backgroundColor: {
      type: String,
      default: "black"
    }
  },
  inject: {
    autoClose: {
      default: true
    }
  },
  data() {
    return {
      s_applogo: process.env.VUE_APP_BF_MAIN_LOGO,
      VUE_APP_BF_EXT_SUMENTS: process.env.VUE_APP_BF_EXT_SUMENTS,
      responsive: false,
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 300,
      year: new Date().getFullYear(),
      link_suments: process.env.VUE_APP_BF_EXT_SUMENTS
    };
  },
  computed: {
    setBgImage() {
      var images = {
        Pricing: process.env.VUE_APP_APP_PRICING_BACKGROUND_IMAGE,
        Login: process.env.VUE_APP_BF_LOGIN_BACKGROUND_IMAGE,
        Register: process.env.VUE_APP_BF_REGISTER_BACKGROUND_IMAGE,
        Landing: process.env.VUE_APP_BF_LANDING_BACKGROUND_IMAGE,
        Reset: process.env.VUE_APP_BF_RESET_BACKGROUND_IMAGE,
        passwordReestablish:
          process.env.VUE_APP_BF_PASSWORDREESTABLISH_BACKGROUND_IMAGE,
        Contact: process.env.VUE_APP_BF_CONTACTUS_BACKGROUND_IMAGE,
        bf_registerConfirmation: process.env.VUE_APP_BF_REGISTER_BACKGROUND_IMAGE,
           bf_legal_legal: process.env.VUE_APP_BF_LEGAL_BACKGROUND_IMAGE,
        bf_legal_cookies: process.env.VUE_APP_BF_LEGAL_BACKGROUND_IMAGE,
        bf_legal_terms_conditions:process.env.VUE_APP_BF_LEGAL_BACKGROUND_IMAGE,
        bf_legal_privacy: process.env.VUE_APP_BF_LEGAL_BACKGROUND_IMAGE
      };
      return {
        backgroundImage: `url(${images[this.$route.name]})`
      };
    },
    setPageClass() {
      return `${this.$route.name}-page`.toLowerCase();
    }
  },
  methods: {
    toggleSidebarPage() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    linkClick() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleNavbar() {
      document.body.classList.toggle("nav-open");
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      document.body.classList.remove("nav-open");
      this.showMenu = false;
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  },
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    this.closeMenu();
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  beforeRouteUpdate(to, from, next) {
    // Close the mobile menu first then transition to next page
    if (this.showMenu) {
      this.closeMenu();
      setTimeout(() => {
        next();
      }, this.menuTransitionDuration);
    } else {
      next();
    }
  }
};
</script>
<style lang="scss" scoped>
$scaleSize: 0.1;
$zoomOutStart: 0.7;
$zoomOutEnd: 0.46;
@keyframes zoomIn8 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  100% {
    opacity: 1;
  }
}
.wrapper-full-page .zoomIn {
  animation-name: zoomIn8;
}
@keyframes zoomOut8 {
  from {
    opacity: 1;
    transform: scale3d($zoomOutStart, $zoomOutStart, $zoomOutStart);
  }
  to {
    opacity: 0;
    transform: scale3d($zoomOutEnd, $zoomOutEnd, $zoomOutEnd);
  }
}
.wrapper-full-page .zoomOut {
  animation-name: zoomOut8;
}
</style>
