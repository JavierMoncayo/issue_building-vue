<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-80">
      <md-card>
        <md-card-content>
          <div class="md-layout">
            <div
              class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
              <h4 class="title">
                <b> {{ this.$S_i18n.t("APP_MY_SITE_TITLE") }}</b>
              </h4>
              <br />
            </div>
            <!-- DOMAIN FORM AND BUTTONS-->
            <div
              class="md-layout-item md-small-size-100  md-medium-size-100 md-size-50"
            >
              <md-field>
                <label>
                  {{ this.$S_i18n.t("APP_ADD_SITE_FORM_DOMAIN") }}
                </label>
                <md-input
                  v-model="domainData.domain"
                  @keyup.enter="save_info()"
                ></md-input>
              </md-field>
              <div>
                <md-button
                  class="md-round md-success md-round float-left "
                  @click="save_info()"
                >
                  Guardar
                </md-button>
                &nbsp;&nbsp;
                <md-button
                  class="md-round md-warning md-round float-left"
                  @click="$router.push('/pages/upgrade')"
                >
                  <md-icon>star_rate</md-icon>Actualiza tu plan
                </md-button>
              </div>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
import md5 from "md5";
import Swal from "sweetalert2";
export default {
  components: {},
  data() {
    return {
      fileRecords: [],
      config: {
        form: {},
        isReady: false
      },
      domainData: {
        domain: "www.example.com"
      },
      uploadUrl: process.env.VUE_APP_APP_URL_UPLOAD,
      uploadHeaders: {},
      fileRecordsForUpload: [] // maintain an upload queue
    };
  },

  async mounted() {
    if (localStorage.getItem("op_id_rup") != null) {
      this.$APP_Services.data = {
        id_domain: localStorage.getItem("op_id_rup")
      };
    }
    this.domainData = this.$BF_TOOLS.operationalInfo_Get();
    this.isReady = true;
    return;
  },

  beforeMount() {
    if (localStorage.getItem("op_id_rup") != null) {
      this.config.disable = false;
      this.domainData.tokenMeta = md5(
        localStorage.getItem("op_id_rup") + localStorage.getItem("op_domain")
      );
      this.domainData.domain = localStorage.getItem("op_domain");
    } else {
    }
  },

  methods: {
    onCopy: function(e) {
      alert("Texto copiado al portapapeles");
    },
    onError: function(e) {
      alert("No se pudo copiar el texto al portapapeles");
    },

    copy_info() {
      this.showSwal("auto-close");
    },

    showSwal(type) {
      if (type === "auto-close") {
        Swal.fire({
          title: "✅",
          text: this.$S_i18n.t("APP_SAVE_NOTIFICATION_MESSAGE"),
          timer: 2000,
          showConfirmButton: false
        });
      }
    },

    save_info() {
      this.$BF_Services.data = {
        domain: this.domain
      };
      this.$BF_Services.data = this.domainData;
      this.$BF_Services.domain_form();
      this.$BF_TOOLS.operationalInfo_Set(this.$BF_Services.data);
      this.showSwal("auto-close");
    }
  }
};
</script>

<style scoped>
.md-field label {
  margin-top: 0px;
  margin-bottom: 15px;
}
</style>
