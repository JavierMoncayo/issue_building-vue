<template>
  <footer class="footer">
    <div class="container">
      <nav>
        <ul>
          <li>
            <a href="#/contact">
              {{ this.$S_i18n.t("BF_FOOTER_CONTACT_US") }}
            </a>
          </li>
          <li>
            <router-link :to="{ path: '/condiciones-generales-contratacion' }">
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
        <a :href="this.link_suments" target="_blank" >
          {{ this.$S_i18n.t("BF_FOOTER_COPYRIGHT") }} </a
        >,
        <md-icon class="text-warning">lock</md-icon>

        {{ this.$S_i18n.t("BF_FOOTER_COPYRIGHT_SLOGAN") }}
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      link_terms_conditions: process.env.VUE_APP_LINK_TERMS_CONDITIONS,
      link_privacy: process.env.VUE_APP_LINK_PRIVACY,
      link_cookies: process.env.VUE_APP_LINK_COOKIES,
      link_suments: process.env.VUE_APP_BF_EXT_SUMENTS
    };
  },
  components: {},
  beforeMount() {
    if (process.env.VUE_APP_BF_SECURITY_LOGIN == "enable") {
      if (localStorage.getItem("token") == null) {
        this.$router.push("/login");
      }
    }
  },
  beforeDestroy() {
    this.$BF_TOOLS.operationalInfo_Clear()
  },
  methods: {
    ClearOperationalInfo() {
      var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

      while (i--) {
        localStorage.removeItem(keys[i]);
      }

      return values;
    }
  }
};
</script>
<style scoped>
.a,
a {
  color: #e7ba3d;
}
</style>
