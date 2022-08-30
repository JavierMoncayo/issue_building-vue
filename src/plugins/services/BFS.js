import BF_APP_COMMON from "./BF_APP_COMMON";
import md5 from "md5";
require("md5");

export default class BFS extends BF_APP_COMMON {
  constructor(router) {
    super(router);
  }

  login() {
    var token = this._token_calculator(this.data.user, this.data.pass);
    return this.axios_int.post("/Blogin", { token: token }).then(() => {
      localStorage.setItem("token", token);
    });
  }

  logout() {
    this._call_service("/Blogout");
    localStorage.clear();
  }

  register() {
    return this._call_service("/BuserRegister");
  }

  getUserProfile() {
    return this._call_service("/PGetDetailsUser");
  }

  getUserPlans() {
    return this._call_service("/BgetUserPlans");
  }

  updateUserProfile() {
    return this._call_service("/BuserUpdate");
  }

  updateUserPayment() {
    return this._call_service("/BsuscribePlan");
  }

  resetPassword() {
    return this._call_service("/BpasswordReminder");
  }

  landingContact() {
    return this._call_service("/Bland");
  }

  getPlansAll() {
    return this._call_service("/BgetPlanList");
  }

  check_timeout() {
    return this.axios_int.check_timeout();
  }

  _token_calculator(email, pass) {
    return md5(email + pass);
  }
  
  async domain_get_all() {
    return await this._call_service("/BgetUserPlans")
      .then(response => {
        return response.data.payload;
      })
      .catch(() => { });
  }

  async domain_form() {
    if (localStorage.getItem("op_id_rup") === null) {
      return await this.#domain_insert();
    } else {
      return await this.#domain_update();
    }
  }

  async #domain_insert() {
    return await this._call_service("/BdomainInsert")
      .then(response => {
        localStorage.setItem("op_id_rup", response.data.payload.id_rup);
      })
      .catch(() => { });
  }

  async #domain_update() {
    this.data["id_rup"] = localStorage.getItem("op_id_rup");
    return await this._call_service("/BdomainUpdate");
  }
}
