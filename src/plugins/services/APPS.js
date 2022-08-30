import BF_APP_COMMON from "./BF_APP_COMMON";
export default class APPS extends BF_APP_COMMON {
  constructor(router) {
    super(router);
  }

  MY_FIRST_APP_SERVICE() {
    return this._call_service("/MY_FIRST_EXAMPLE");
  }

  MY_SECOND_APP_SERVICE() {
    return this._call_service("/MY_FIRST_EXAMPLE");
  }

 
}
