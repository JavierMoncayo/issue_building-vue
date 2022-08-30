export default class BF_TOOLS {
  constructor() {}

  operationalInfo_Set(info) {
    for (var key in info) {
      if (info[key] != null) {
        if (typeof info[key] === typeof "string") {
          localStorage.setItem("op_" + key, info[key]);
        } else {
          for (var i = 0; i < info[key].length; i++) {
            if (info[key][i] != null) {
              localStorage.setItem(
                "op_" + info[key][i].name,
                info[key][i].value
              );
            }
          }
        }
      }
    }
  }

  operationalInfo_Clear() {
    let keys = Object.keys(localStorage);
    if (keys.length == 0) {
      return;
    } else {
      let i = keys.length;
      while (i--) {
        if (keys[i].includes("op_")) {
          localStorage.removeItem(keys[i]);
        }
      }
    }
  }

  operationalInfo_Get() {
    var keys = Object.keys(localStorage);
    var i = keys.length;
    var form_key = "";
    //  var tmp = Object;
    var tmp = {
      type: Object,
      writable: true
    };
    while (i--) {
      // Si la variable empieza por "OP_" entonces....
      if (keys[i].includes("op_")) {
        // QUITALE el prefijo "op_"
        form_key = keys[i].replace("op_", "");
        // GUARDALO en la variable temporal, y coge el valor del localstorage

        tmp[form_key] = localStorage.getItem(keys[i]);
      }
    }
    return tmp;
  }
}
