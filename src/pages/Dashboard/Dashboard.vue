<template>
  <div class="md-layout">
    <loading
      style="position:absolute; top: 30%;
  left: 50%;"
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
      :color="loaderColor"
      :loader="loaderType"
      :background-color="backgroundColor"
      :z-index="9999"
    ></loading>
    <div class="md-layout-item">
      <div class="md-layout">
        <div>
          <md-button
            class="md-primary md-round float-left"
            @click="$router.push('/pages/add-domain')"
            ><md-icon>add</md-icon>
            {{ this.$S_i18n.t("APP_ADD_SITE_BUTTON_LABEL") }}
          </md-button>
        </div>
        <md-card v-if="!this.isLoading">
          <md-card-header class="md-card-header-icon md-card-header-green">
            <h3 class="title">
              {{ this.$S_i18n.t("APP_DASHBOARD_TABLE_TITLE") }}
            </h3>
          </md-card-header>

          <div v-if="!ctrl_data_ready"></div>
          <div v-else>
            <md-card-content>
              <md-table
                :value="queriedData"
                :md-sort.sync="currentSort"
                :md-sort-order.sync="currentSortOrder"
                :md-sort-fn="customSort"
                class="paginated-table table-striped table-hover"
              >
                <md-table-toolbar>
                  <md-field>
                    <label for="pages">{{
                      this.$S_i18n.t("BF_TABLE_PAGINATION_LABEL")
                    }}</label>
                    <md-select v-model="pagination.perPage" name="pages">
                      <md-option
                        v-for="item in pagination.perPageOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                      >
                        {{ item }}
                      </md-option>
                    </md-select>
                  </md-field>
                  <md-field>
                    <md-input
                      type="search"
                      class="mb-3"
                      clearable
                      style="width: 200px"
                      :placeholder="this.$S_i18n.t('BF_TABLE_SEARCH_LABEL')"
                      v-model="searchQuery"
                    >
                    </md-input>
                  </md-field>
                </md-table-toolbar>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell
                    :md-label="table_col_names[0]"
                    md-sort-by="domain"
                    >{{ item.domain }}</md-table-cell
                  >
                  <md-table-cell
                    :md-label="table_col_names[2]"
                    style=" border: 0;
                    margin-left: 50px;
                    margin-right: 20px;"
                  >
                    <md-button
                      class="md-just-icon md-primary md-round table-button"
                      @click="handleItem(item)"
                    >
                      <md-icon>source</md-icon>
                    </md-button>
                  </md-table-cell>
                  <md-table-cell
                    :md-label="table_col_names[0]"
                    md-sort-by="name"
                    >{{ item.name }}</md-table-cell
                  >
                  <md-table-cell
                    :md-label="table_col_names[1]"
                    md-sort-by="date_end"
                    >{{ item.date_end }}</md-table-cell
                  >
                </md-table-row>
              </md-table>
            </md-card-content>
          </div>
          <md-card-actions md-alignment="space-between">
            <div class="">
              <p class="card-category">
                {{ this.$S_i18n.t("BF_TABLE_PAGINATION_SHOWING_LABEL") }}
                {{ from + 1 }}
                {{ this.$S_i18n.t("BF_TABLE_PAGINATION_TO_LABEL") }} {{ to }}
                {{ this.$S_i18n.t("BF_TABLE_PAGINATION_OF_LABEL") }} {{ total }}
                {{ this.$S_i18n.t("BF_TABLE_PAGINATION_ENTRIES_LABEL") }}
              </p>
            </div>
            <pagination
              class="pagination-no-border pagination-success"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="total"
            >
            </pagination>
          </md-card-actions>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import { Pagination } from "@/components";
//import users from "./users";
import users from "/src/pages/Dashboard/Pages/users.js";
import Fuse from "fuse.js";
import Swal from "sweetalert2";

export default {
  components: {
    Pagination,
    Loading
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    }
  },
  data() {
    return {
      ctrl_data_ready: false,
      mcData: {},
      currentSort: "domain",
      currentSortOrder: "asc",
      table_col_names: [
        this.$S_i18n.t("APP_DASHBOARD_TABLE_COL0"),
        this.$S_i18n.t("APP_DASHBOARD_TABLE_COL1"),
        this.$S_i18n.t("APP_DASHBOARD_TABLE_COL2")
      ],
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },

      searchQuery: "",
      propsToSearch: ["domain", "date_end", "name"],
      tableData: {},
      searchedData: [],
      fuseSearch: null,
      isReady: false,
      isLoading: true,
      fullPage: true,
      loaderColor: "#673ab7",
      loaderType: "dots",
      backgroundColor: "#00000",
      index: 9999
    };
  },
  methods: {
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },

    handleItem(item) {
      this.$BF_TOOLS.operationalInfo_Set(item);
      this.$router.push("/pages/add-domain");
    }
  },

  mounted() {
    this.$BF_TOOLS.operationalInfo_Clear();
    this.$BF_Services.domain_get_all().then(response => {
      //console.log(response);
      //this.tableData = response.data.payload;
      this.tableData = response;
      this.ctrl_data_ready = true;
    });

    this.isLoading = false;
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      let temp = [];
      if (value !== "") {
        this.fuseSearch = new Fuse(this.tableData, {
          keys: ["domain", "date_end", "name"],
          threshold: 0.3
        });
        result = this.fuseSearch.search(this.searchQuery);
        for (var i = 0; i < result.length; i++) {
          temp[i] = result[i].item;
        }
      }
      this.searchedData = temp;
    }
  }
};
</script>

<style lang="css" scoped>
.md-card .md-card-actions {
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}
.md-card-header {
  margin-top: 10px;
}
.float-right {
  float: right;
}
.overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.table-button {
  margin-right: 30px;
}
</style>
