import S_axios from "./S_axios";

export default class BF_APP_COMMON {
  constructor(router) {
    this.axios_int = new S_axios();

    this.data = Object;
    this.router = router;
    
  }

  _call_service(service_name) {
    if (this.axios_int.check_timeout()) {
      return this.axios_int.post(service_name, this.data);
    } else {
      this.router.push("/login");
    }
  }


}
